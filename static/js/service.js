import planetDetailCell from './container_generator.js'
import {createResidentCell} from './resident_generator.js'

const BASE_URL = 'https://swapi.dev/api/planets/?page=';
const RESIDENTS_HEADERS = ['name', 'height', 'mass', 'skin_color', 'hair_color', 'eye_color', 'birth_year', 'gender'];
const ICONS_RESIDENT = ['fas fa-user', 'fas fa-ruler-vertical', 'fas fa-balance-scale', 'fas fa-allergies', 'fas fa-tint',
                    'far fa-eye', 'fas fa-calendar-alt', 'fas fa-venus-mars'];


export function getPlanets(currentNumber) {
    fetch(BASE_URL + currentNumber)
        .then(response => response.json())
        .then(json_response => displayPlanets(json_response));
}

function displayPlanets(planets) {
    clearCurrentContent('.planet');

    const planetContainer = document.querySelector('.planet-table');

    for (let planet of planets.results) {
        planetContainer.appendChild(planetDetailCell(planet));
    }
}

function clearCurrentContent(className) {
    const elements = document.querySelectorAll(className);
    elements.forEach(element => element.remove());
}

export function handleShowDifferentPlanets(currentNumber) {

    const nextBtn = document.querySelector('.next');
    const previousBtn = document.querySelector('.previous');

    nextBtn.addEventListener('click', () => {
        if (currentNumber >= 6) { currentNumber = 5};
        getPlanets(++currentNumber);
    });
    previousBtn.addEventListener('click', () => {
        if (currentNumber <= 1) { currentNumber = 2};
        getPlanets(--currentNumber);
    });

}

export function showResidents(planet) {
    clearCurrentContent('.resCell');

    const residents = planet.residents;
    const modalHeader = document.querySelector(".modal-header h2");
    modalHeader.textContent = `Residents of ${planet.name}`;
    residents.forEach(residentURL => {
        fetch(residentURL).then(response => response.json())
        .then(json_response => displayResidents(json_response));
    });
}

function displayResidents(residentDetails) {
    console.log(residentDetails);

    const contentContainer = document.querySelector('.modal-content');
    const residentCell = createResidentCell(residentDetails);
    contentContainer.appendChild(residentCell);
}
