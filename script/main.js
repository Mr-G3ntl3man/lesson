'use strict';

const DomElement = function () {
	this.bg;
	this.width;
	this.height;
	this.fontSize;
	this.selector;
	this.text;
	this.position;

}

DomElement.prototype.start = function () {
	this.createElem()
	this.addStyle()
	this.addText()
};

DomElement.prototype.createElem = function () {
	if (this.selector.startsWith('.')) {
		return document.body.insertAdjacentHTML('beforeend', `<div class = '${this.selector.substring(1)}'></div>`)
	}

	if (this.selector.startsWith('#')) {
		return document.body.insertAdjacentHTML('beforeend', `<p id = '${this.selector.substring(1)}'></p>`)
	}
};

DomElement.prototype.addStyle = function () {
	const elem = document.querySelector(`${this.selector}`)
	elem.style.cssText = `
	background-color: ${this.bg};
	width: ${this.width}px;
	height: ${this.height}px;
	font-size: ${this.fontSize}px;
	position: ${this.position};
	top: 0;
	left: 0;
	`
};

DomElement.prototype.addText = function () {
	const elem = document.querySelector(`${this.selector}`)
	elem.innerHTML = `${this.text}`
}


const newElem = new DomElement();
newElem.selector = '#new-block';
newElem.bg = '#049D03';
newElem.width = 100;
newElem.height = 100;
newElem.fontSize = 18;
newElem.position = 'absolute';
newElem.text = 'Жду правки! ^_^'


document.addEventListener('DOMContentLoaded', () => {
	newElem.start()

	document.addEventListener('keydown', (event) => {
		const elem = document.querySelector(`${newElem.selector}`)

		switch (event.key) {
			case "ArrowLeft": elem.style.left = parseInt(elem.style.left) - 10 + 'px'; break;
			case "ArrowRight": elem.style.left = parseInt(elem.style.left) + 10 + 'px'; break;
			case "ArrowUp": elem.style.top = parseInt(elem.style.top) - 10 + 'px'; break;
			case "ArrowDown": elem.style.top = parseInt(elem.style.top) + 10 + 'px'; break;
		}
	})
})





