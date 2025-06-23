import './style.css';
import { KEYBOARD_KEYS, ALLOWED_KEYS } from './constants/const';
import snk from './data/snk.json';

console.log(snk);

//Compare letters
const compare = (quote, writting) => {
	const quoteContainer = document.querySelector('.quote h2').children;

	for (const element of quoteContainer) {
		element.classList.remove('check', 'error');
	}

	writting.forEach((letter, index) => {
		const currentQuoteLetter = quote[index].toLowerCase();
		if (letter === currentQuoteLetter) {
			quoteContainer[index].classList.add('check');
		} else {
			quoteContainer[index].classList.add('error');
		}
	});
};

// Ramdom Quote
const randomQuote = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length + 1);

	return array[randomIndex].quote;
};

// Render Quote and Keyboard
const quoteElement = document.querySelector('.quote');
const keyboardElement = document.querySelector('.keyboard');

const currentQuote = randomQuote(snk).split('');
let quoteFragment = '';

for (const letter of currentQuote) {
	quoteFragment += `<span>${letter}</span>`;
}

quoteElement.innerHTML = `<h2 class="quote-heading">${quoteFragment}</h2>`;

let keyboardUIFragment = '';

for (const list of KEYBOARD_KEYS) {
	let keyList = '';

	for (const key of list) {
		keyList += `<div class="key" id="${key.toLowerCase()}">${key}</div>`;
	}

	keyboardUIFragment += `<div class="key-list">${keyList}</div>`;
}

keyboardElement.innerHTML += keyboardUIFragment;

// Activate pressed state
const currentWritting = [];

document.body.addEventListener('keydown', (e) => {
	if (!ALLOWED_KEYS.includes(e.key)) return;

	if (e.key === ' ') {
		currentWritting.push(e.key);
		compare(currentQuote, currentWritting);
		return;
	}

	if (e.key === 'Backspace') {
		currentWritting.pop();
		compare(currentQuote, currentWritting);
		return;
	}

	const currentKey = document.querySelector(`#${e.key}`);

	currentKey.classList.add('press');

	setTimeout(() => {
		currentKey.classList.remove('press');
	}, 200);

	currentWritting.push(e.key);
	compare(currentQuote, currentWritting);
});
