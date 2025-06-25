import './style.css';
import { KEYBOARD_KEYS, ALLOWED_KEYS, VOWELS } from './constants/const';
import snk from './data/snk.json';

/**
 * Compare two arrays strictly
 *
 * @param {string[]} quote - Quote in use
 * @param {string[]} writting - Current Writting
 */
const compare = (quote, writting) => {
	const quoteContainer = document.querySelector('.quote h2').children;

	for (const element of quoteContainer) {
		element.classList.remove('check', 'error');
	}

	writting.forEach((letter, index) => {
		const currentQuoteLetter = quote[index];
		if (letter === currentQuoteLetter) {
			quoteContainer[index].classList.add('check');
		} else {
			quoteContainer[index].classList.add('error');
		}
	});

	const isEqual = JSON.stringify(quote) === JSON.stringify(writting);
};

/**
 * Get random item from array
 *
 * @param {Object[]} array - Quote lists
 *
 * @returns {string} Quote item
 */
const randomQuote = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);

	return array[randomIndex].quote;
};

document.addEventListener('DOMContentLoaded', () => {
	// Draw quote Element

	const quoteElement = document.querySelector('.quote');

	const currentQuote = randomQuote(snk).split('');
	let quoteFragment = '';

	for (const letter of currentQuote) {
		quoteFragment += `<span>${letter}</span>`;
	}

	quoteElement.innerHTML = `<h2 class="quote-heading">${quoteFragment}</h2>`;

	// Draw keyboard UI

	const keyboardElement = document.querySelector('.keyboard');

	let keyboardUIFragment = '';

	for (const list of KEYBOARD_KEYS) {
		let keyList = '';

		for (const key of list) {
			keyList += `<div class="key" id="${key.keyCode.toLowerCase()}">${key.key}</div>`;
		}

		keyboardUIFragment += `<div class="key-list">${keyList}</div>`;
	}

	keyboardElement.innerHTML += keyboardUIFragment;

	// Handle keyboard Events

	const currentWritting = [];
	let deadIsActive = false;

	document.body.addEventListener('keydown', (e) => {
		if (!ALLOWED_KEYS.includes(e.code)) return;

		const currentKey = document.querySelector(`#${e.code.toLowerCase()}`);

		currentKey.classList.add('press');

		setTimeout(() => {
			currentKey.classList.remove('press');
		}, 200);

		if (e.code === 'BracketLeft') {
			deadIsActive = true;
			return;
		}

		if (deadIsActive) {
			if (VOWELS.includes(e.key)) {
				switch (e.key) {
					case 'A':
						currentWritting.push('Á');
						break;
					case 'E':
						currentWritting.push('É');
						break;
					case 'I':
						currentWritting.push('Í');
						break;
					case 'O':
						currentWritting.push('ó');
						break;
					case 'U':
						currentWritting.push('Ú');
						break;
					case 'a':
						currentWritting.push('á');
						break;
					case 'e':
						currentWritting.push('é');
						break;
					case 'i':
						currentWritting.push('í');
						break;
					case 'o':
						currentWritting.push('ó');
						break;
					case 'u':
						currentWritting.push('u');
						break;
				}
				compare(currentQuote, currentWritting);
				deadIsActive = false;
				return;
			}
		}

		if (e.code === 'Backspace') {
			currentWritting.pop();
			compare(currentQuote, currentWritting);
			return;
		}

		currentWritting.push(e.key);
		compare(currentQuote, currentWritting);
	});
});
