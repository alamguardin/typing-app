import './style.css';
import { KEYBOARD_KEYS, ALLOWED_KEYS, VOWELS } from './constants/const';
import snk from './data/snk.json';
import { allKeys } from './constants/keys';

console.log(allKeys);

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

	if (isEqual) {
		currentQuote = randomQuote(snk).split('');
		currentWritting = [];
		drawQuote(currentQuote);
	}
};

/**
 * Get random item from arrayconcat
 *
 * @param {Object[]} array - Quote lists
 *
 * @returns {string} Quote item
 */
const randomQuote = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);

	return array[randomIndex].quote;
};

const drawQuote = (quote) => {
	const quoteElement = document.querySelector('.quote');

	let quoteFragment = '';

	for (const letter of quote) {
		quoteFragment += `<span>${letter}</span>`;
	}

	quoteElement.innerHTML = `<h2 class="quote-heading">${quoteFragment}</h2>`;
};

let currentQuote = randomQuote(snk).split('');
let currentWritting = [];

document.addEventListener('DOMContentLoaded', () => {
	drawQuote(currentQuote);

	// Draw keyboard UI

	const keyboardElement = document.querySelector('.keyboard');

	let keyboardUIFragment = '';

	for (const list of KEYBOARD_KEYS) {
		for (const key of list) {
			keyboardUIFragment += `
			<div class="key" id="${key.keyCode}">
				<img src=${allKeys[key.keyCode]}>
			</div>
			`;
		}
	}

	keyboardElement.innerHTML += `<div class="key-list">${keyboardUIFragment}</div>`;

	// Handle keyboard Events

	let deadIsActive = false;

	document.body.addEventListener('keydown', (e) => {
		if (!ALLOWED_KEYS.includes(e.code)) return;

		const currentKey = document.querySelector(`#${e.code}`);

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
				const vowelsWithAccent = [
					'Á',
					'É',
					'Í',
					'Ó',
					'Ú',
					'á',
					'é',
					'í',
					'ó',
					'ú',
				];

				const indexVowelWithAccent = VOWELS.findIndex((vowel) => {
					return vowel === e.key;
				});

				currentWritting.push(vowelsWithAccent[indexVowelWithAccent]);
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
