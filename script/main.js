'use strict';

const DomElement = function () {
	this.bg;
	this.width;
	this.height;
	this.fontSize;
	this.selector;
	this.text;
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
	font-size: ${this.fontSize}px;`
};

DomElement.prototype.addText = function () {
	const elem = document.querySelector(`${this.selector}`)
	elem.innerHTML = `${this.text}`
}


const newElem = new DomElement();
newElem.selector = '#new-block';
newElem.bg = '#049D03';
newElem.width = 500;
newElem.height = 500;
newElem.fontSize = 50;
newElem.text = 'Жду правки! ^_^'
newElem.start()




