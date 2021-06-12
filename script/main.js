'use strict';

const DomElement = function (
	selector = '#new-block',
	height = 500,
	width = 500,
	bg = '#049D03',
	fontSize = 50,
	text = 'Нужно больше правок!',
) {
	this.selector = selector;
	this.width = width;
	this.height = height;
	this.bg = bg;
	this.fontSize = fontSize;
	this.text = text;
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
	width: ${parseInt(this.width)}px;
	height: ${parseInt(this.height)}px;
	font-size: ${parseInt(this.fontSize)}px;`
};

DomElement.prototype.addText = function () {
	const elem = document.querySelector(`${this.selector}`)
	elem.innerHTML = `${this.text}`
}


const newElem = new DomElement('#block', '100px', '300px', 'red', '30px');
newElem.start()



