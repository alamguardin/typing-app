import './style.css';

const keys = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const quotes = [
	'Dale sentido a tu existencia muriendo como un heroe',
	'Si no luchamos, no podemos ganar',
];

document.body.addEventListener('keydown', (e) => {
	console.log(e);
});

const quoteElement = document.querySelector('.quote');
const keyboardElement = document.querySelector('.keyboard');

quoteElement.innerHTML = `<h2>${quotes[0]}</h2>`;

let keyboardUIFragment = '';

for (const list of keys) {
	let keyList = '';

	for (const key of list) {
		keyList += `<div class="key" id="${key.toLowerCase()}">${key}</div>`;
	}

	keyboardUIFragment += `<div class="key-list">${keyList}</div>`;
}

keyboardElement.innerHTML += keyboardUIFragment;
