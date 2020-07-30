import { showResidents } from './service.js'

const PLANET_HEADERS = ['name', 'diameter', 'climate', 'terrain', 'surface_water', 'population'];
const ICONS_CLASS = ['fa-globe-americas', 'fa-circle-notch', 'fa-envira', 'fa-mountain',
                  'fa-water', 'fa-users'];

export default function planetDetailsCell(planet) {
    const planetCell = createElementWithClass('div', 'planet');

    for (let [index, header] of PLANET_HEADERS.entries()) {
        const singleCell = styleSinglePlanetCell(index, header, planet);
        const planetValue = singleCell['value'];
        const planetDescription = header === 'name' ? '' : singleCell['description'];

        planetCell.appendChild(planetValue);
        if (planetDescription !== '') { planetCell.appendChild(planetDescription) };
    }
    const residentBtn = createResidentsBtn(planet);
    handleResidentsBtnEvent(residentBtn, planet);
    planetCell.appendChild(residentBtn);
    return planetCell;
}

function styleSinglePlanetCell(index, header, planet) {
    let planetValue;
    let planetDescription = '';

    switch (header) {
        case 'name':
            planetValue = createPlanetValue(index, planet);
            break;
        default:
            planetValue = createPlanetValue(index, planet);
            planetDescription = createPlanetDescription(index);
            break;
    }
    return {'value': planetValue, 'description': planetDescription}
}

function createPlanetDescription(index) {
    let planetDescription = createElementWithClass('p', 'description');
    planetDescription.textContent = PLANET_HEADERS[index].replace('_', ' ');
    planetDescription.style.textTransform = 'capitalize';
    return planetDescription;
}

function createPlanetValue(index, planet) {
    const value = createElementWithClass('p', 'planet-value');
    let icon = `<i class='fas ${ICONS_CLASS[index]}'></i>`;
    switch (index) {
        case 1:
            value.textContent = Number(planet[PLANET_HEADERS[index]])/1000 + ' km';
            break;
        case 2:
            icon = `<i class='fab ${ICONS_CLASS[index]}'></i>`;
            value.textContent = planet[PLANET_HEADERS[index]];
            break;
        case 4:
            value.textContent = planet[PLANET_HEADERS[index]] + ' %';
            break;
        case 5:
            value.textContent = planet[PLANET_HEADERS[index]] === 'unknown' ? 'Unknown' :
                Number(planet[PLANET_HEADERS[index]]).toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            break;
        default:
            value.textContent = planet[PLANET_HEADERS[index]];
            break;
    }
    value.style.textTransform = 'capitalize';
    value.insertAdjacentHTML('afterbegin', icon);

    return value;
}

function createResidentsBtn(planet) {
    const residentBtn = createElementWithClass('a', 'residents');
    const numberOfResidents = planet['residents'].length;
    const icon = `<i class='fas fa-clipboard-list'></i>`;

    residentBtn.setAttribute('href', '#');
    residentBtn.setAttribute('id', 'residents');
    residentBtn.textContent = numberOfResidents === 0 ? 'No Residents' : `See ${numberOfResidents} residents`;
    if (numberOfResidents === 0) {residentBtn.style.pointerEvents = 'none';}
    residentBtn.insertAdjacentHTML('afterbegin', icon);

    return residentBtn;
}

function handleResidentsBtnEvent(button, planet) {
    const modal = document.getElementById("myModal");
    const span = document.querySelector('.close');

    button.addEventListener('click', () => {
        showResidents(planet);
        modal.style.display = "block";
    });
    span.onclick = function() {
        modal.style.display = "none";
    }
}

export function createElementWithClass(elementName, className) {
    const element = document.createElement(elementName);
    element.classList.add(className);

    return element;
}



