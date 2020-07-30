import { getPlanets, handleShowDifferentPlanets } from './service.js'
let pageNumber = 1;

function init() {
    getPlanets(pageNumber);
    handleShowDifferentPlanets(pageNumber);
}

init()