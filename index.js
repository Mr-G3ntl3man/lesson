"use strict";
let hexCode;
const anyCombo = '0123456789ABCDEF',
	createHtmlHexCode = document.body.insertAdjacentHTML('afterbegin', `<div>#249718</div>`),
	createBtn = document.body.insertAdjacentHTML('beforeend', `<button>CLICK ME</button>`),
	btn = document.querySelector('button'),
	htmlHexCode = document.querySelector('div');

document.body.style.cssText = `
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100vh;
background-color: #249718;
transition: background-color 0.3s ease-in-out;
box-shadow: 0px 0px 100px 0px rgba(0, 0, 0, 0.7) inset;
margin: 0;
`;

btn.style.cssText = `
border: none;
cursor: pointer;
display: block;
font-size: 22px;
font-weight: 700;
padding: 0 70px;
height: 70px;
letter-spacing: 5px;
color: #014b3e;
border-radius: 15px;
background-color: #fff;
text-shadow: 0 0 0.1em rgba(0, 0, 0, 0.8);
transition: background-color 0.5s ease-in-out;
animation: glowing 1s ease-in-out infinite;
`;
htmlHexCode.style.cssText = `
font-size: 120px;
font-weight: 700;
letter-spacing: 5px;
color: #fff;
margin-bottom: 90px;
transition: color 0.5s ease-in-out;
text-shadow: 0 0 0.1em rgba(0, 0, 0, 0.5), 0 0 0.1em rgba(0, 0, 0, 0.5), 0 0 0.1em rgba(0, 0, 0, 0.5);
`;

const generateCode = () => {
	hexCode = '#';
	for (var i = 0; i < 6; i++) {
		hexCode += anyCombo[(Math.floor(Math.random() * 16))];
	}
};

btn.addEventListener('click', () => {
	generateCode();
	document.body.style.backgroundColor = hexCode;
	htmlHexCode.innerHTML = hexCode;
	btn.style.color = hexCode;

	generateCode();
	htmlHexCode.style.color = hexCode;
	btn.style.backgroundColor = hexCode;
});








