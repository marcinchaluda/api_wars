const RESIDENTS_HEADERS = ['name', 'height', 'mass', 'skin_color', 'hair_color', 'eye_color', 'birth_year', 'gender'];
const ICONS_RESIDENT = ['fas fa-user', 'fas fa-ruler-vertical', 'fas fa-balance-scale', 'fas fa-allergies', 'fas fa-tint',
                    'far fa-eye', 'fas fa-calendar-alt', 'fas fa-venus-mars'];

export function createResidentCell(residentDetails) {
    const residentCell = document.createElement('div',);
    residentCell.classList.add('resCell');

    for (let [index, header] of RESIDENTS_HEADERS.entries()) {
        const detail = document.createElement('div');
        detail.classList.add('pair');
        const detailValue = createResidentValue(residentDetails, header, index);
        const detailDescription = createResidentDescription(header);
        detail.appendChild(detailValue);
        detail.appendChild(detailDescription);
        residentCell.appendChild(detail);
    }
    return residentCell;
}

function createResidentValue(residentDetails, header, index) {
    const detailValue = document.createElement('p');
    let icon = index === 5 ? `<i class='far ${ICONS_RESIDENT[index]}'></i>`
        : `<i class='fas ${ICONS_RESIDENT[index]}'></i>`;

    detailValue.classList.add('resVal');
    detailValue.textContent = residentDetails[header];
    detailValue.style.textTransform = 'capitalize';
    detailValue.insertAdjacentHTML('afterbegin', icon);

    return detailValue;
}

function createResidentDescription(header) {
    const detailDescription = document.createElement('p');

    detailDescription.classList.add('desc');
    detailDescription.textContent = header.replace('_', ' ');
    detailDescription.style.textTransform = 'capitalize';

    return detailDescription;
}