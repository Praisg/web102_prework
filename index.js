/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
// Move top games code inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Sort games by pledged amount
    const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);
    
    // Get top 2 games
    const [firstGame, secondGame] = sortedGames;
    
    // Get containers
    const firstGameContainer = document.getElementById("first-game");
    const secondGameContainer = document.getElementById("second-game");
    
    // Debug checks
    console.log("First game container:", firstGameContainer);
    console.log("First game:", firstGame);
    
    // Create and append elements
    if (firstGameContainer && secondGameContainer) {
        const firstGameText = document.createElement('p');
        firstGameText.textContent = firstGame.name;
        firstGameContainer.appendChild(firstGameText);
        
        const secondGameText = document.createElement('p');
        secondGameText.textContent = secondGame.name;
        secondGameContainer.appendChild(secondGameText);
    } else {
        console.error("Game containers not found");
    }
});

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let game of games) {
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" />
            <h3>${game.name}</h3>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
        `;
        
        gamesContainer.appendChild(gameCard);
    }
}

addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************/

// Get DOM elements
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// Calculate totals
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Update DOM with formatted values 
contributionsCard.innerHTML = totalContributions.toLocaleString();
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
gamesCard.innerHTML = GAMES_JSON.length.toString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding

// show only games that are fully funded
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
    console.log("Unfunded games:", unfundedGames.length); // Shows 4 games
}

function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
    console.log("Funded games:", fundedGames.length); // Shows 7 games
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}
 // select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);



// add event listeners with the correct functions to each button


/************************************************************************************/
 //Count unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const unfundedCount = unfundedGames.length;

// Format totals
const totalMoneyRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const formattedMoney = totalMoneyRaised.toLocaleString();
const totalGames = GAMES_JSON.length;

// Create template string with ternary
const description = `Our company has raised $${formattedMoney} for ${totalGames} games. 
${unfundedCount === 1 ? 'There is 1 game' : `There are ${unfundedCount} games`} that still need${unfundedCount === 1 ? 's' : ''} funding to reach their goals.`;

// Create and append paragraph
const newParagraph = document.createElement('p');
newParagraph.innerHTML = description;
descriptionContainer.appendChild(newParagraph);

// Sort games by pledged amount
const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);

