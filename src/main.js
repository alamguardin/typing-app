import './style.css';

//Compare letters
const compare = (quote, writting) => {
	const quoteContainer = document.querySelector('.quote h2').children;

	writting.forEach((letter, index) => {
		const currentQuoteLetter = quote[index].toLowerCase();
		if (letter === currentQuoteLetter) {
			quoteContainer[index].classList.add('check');
		} else {
			quoteContainer[index].classList.add('error');
		}
	});
};

// Render Quote and Keyboard
const keys = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const quotes = [
	'Dale sentido a tu existencia muriendo como un heroe',
	'Si no luchamos, no podemos ganar',
];

const quoteElement = document.querySelector('.quote');
const keyboardElement = document.querySelector('.keyboard');

const currentQuote = quotes[0].split('');
let quoteFragment = '';

for (const letter of currentQuote) {
	quoteFragment += `<span>${letter}</span>`;
}

quoteElement.innerHTML = `<h2>${quoteFragment}</h2>`;

let keyboardUIFragment = '';

for (const list of keys) {
	let keyList = '';

	for (const key of list) {
		keyList += `<div class="key" id="${key.toLowerCase()}">${key}</div>`;
	}

	keyboardUIFragment += `<div class="key-list">${keyList}</div>`;
}

keyboardElement.innerHTML += keyboardUIFragment;

// Activate pressed state
const currentWritting = [];
const chars = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
	' ',
	'Backspace',
];

document.body.addEventListener('keydown', (e) => {
	if (!chars.includes(e.key)) return;

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
