

const monsterContainer = document.querySelector('#monster-container');

const backButton = document.querySelector('#back');
const forwardButton = document.querySelector('#forward');

function listMonsters() {
    fetch('http://localhost:3000/monsters')
        .then((response) => response.json())
        .then((data) => renderMonsters(data))
}

function renderMonsters(monsters) {
    const monsterContainer = document.querySelector('#monster-container')


    monsters.forEach((monster) => {
        const monsterCard = document.createElement('div');
        monsterCard.className = 'card';
        const monsterName = document.createElement('h2');
        const monsterAge = document.createElement('h4');
        const monsterDescription = document.createElement('p');

        // Add details to the monster card
        monsterName.textContent = monster.name;
        monsterAge.textContent = monster.age
        monsterDescription.textContent = monster.description;

        // Add name, Age and description to the monster card
        monsterCard.appendChild(monsterName);
        monsterCard.appendChild(monsterAge);
        monsterCard.appendChild(monsterDescription);


        //Append the monster card to the monster container
        monsterContainer.appendChild(monsterCard);
    });
    // add monsters to list using form
    const monsterForm = document.querySelector('#monster-form')
    monsterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = event.target.name.value
        const age = event.target.age.value
        const description = event.target.description.value
        const monster = {
            name: name,
            age: age,
            description: description
        }
        monsterForm.reset();

        // update database
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(monster)
        })
            .then(response => response.json())
            .then(monster => {
                const monsterCard = createCard(monster)
                monsterContainer.appendChild(monsterCard);
            })
    });
};
listMonsters();
