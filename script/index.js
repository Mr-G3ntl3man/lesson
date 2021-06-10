"use strict";

const anyCombo = '0123456789ABCDEF',
	btn = document.querySelector('.btn'),
	htmlHexCode = document.querySelector('.hex-code');

let hexCode;

const generateCode = () => {
	hexCode = '#';
	for (var i = 0; i < 6; i++) {
		hexCode += anyCombo[(Math.floor(Math.random() * 16))];
	}
}

btn.addEventListener('click', () => {
	generateCode();
	document.body.style.backgroundColor = hexCode;
	htmlHexCode.innerHTML = hexCode;
	btn.style.color = hexCode;

	generateCode()
	htmlHexCode.style.color = hexCode;
	btn.style.backgroundColor = hexCode;
})








