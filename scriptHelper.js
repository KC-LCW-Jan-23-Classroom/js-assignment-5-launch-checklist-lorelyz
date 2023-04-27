// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById('missionTarget');

    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name} </li>
            <li>Diameter: ${diameter} </li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance} </li>
            <li>Number of Moons: ${moons} </li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   } else if (isNaN(testInput)) {
    return "Not a Number";
   }
   return "Is a Number";
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Please enter valid data for each field");
    } else {
        
        let pilotStatus = document.getElementById('pilotStatus');
        let copilotStatus = document.getElementById('copilotStatus');
        let fuelStatus = document.getElementById('fuelStatus');
        let cargoStatus = document.getElementById('cargoStatus');
        let launchStatus = document.getElementById('launchStatus');

        pilotStatus.textContent = `Pilot ${pilot} is ready for launch`;
        copilotStatus.textContent = `Co-pilot ${copilot} is ready for launch`;

        if (parseInt(fuelLevel) < 10000 || parseInt(cargoLevel) > 10000) {
            
            if (parseInt(fuelLevel) < 10000) {
                fuelStatus.textContent = "Fuel level too low for launch";
            } else {
                fuelStatus.textContent = "Fuel level high enough for launch";
            }
    
            if (parseInt(cargoLevel) > 10000) {
                cargoStatus.textContent = "Cargo mass too heavy for launch";
            } else {
                cargoStatus.textContent = "Cargo mass low enough for launch";
            }

            launchStatus.textContent = "Shuttle Not Ready for Launch";
            launchStatus.style.color = 'rgb(199, 37, 78)';
        } else {
            launchStatus.textContent = "Shuttle is Ready for Launch"
            launchStatus.style.color = "rgb(65, 159, 106)";
            fuelStatus.textContent = "Fuel level high enough for launch";
            cargoStatus.textContent = "Cargo mass low enough for launch";
        }

        list.style.visibility = "visible";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json");

    planetsReturned = await planetsReturned.json()
    
    return planetsReturned;
}

function pickPlanet(planets) {
    let randomIndex = Math.floor(Math.random() * planets.length);

    return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;