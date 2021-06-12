'use strict';

class DomElement {
	constructor(
		selector = '.new-block',
		height = 500,
		width = 500,
		bg = '#049D03',
		fontSize = 50,
		text = 'Нужно больше правок!',
		position = 'absolute',
	) {
		this.selector = selector;
		this.width = width;
		this.height = height;
		this.bg = bg;
		this.fontSize = fontSize;
		this.text = text;
		this.position = position;
	}

	createElem() {
		const createHtml = (el) => {
			const htmlEl = document.createElement(el);
			(el === 'div') ? htmlEl.className = `${this.selector.substring(1)}` : htmlEl.id = `${this.selector.substring(1)}`
			htmlEl.innerHTML = `${this.text}`
			this.addStyle(htmlEl)
			document.body.prepend(htmlEl)
		}

		if (this.selector.startsWith('.')) { createHtml('div') }
		if (this.selector.startsWith('#')) { createHtml('p') }
	}

	addStyle(el) {
		const elem = document.querySelector(`${this.selector}`)
		el.style.cssText = `
		background-color: ${this.bg};
		width: ${parseInt(this.width)}px;
		height: ${parseInt(this.height)}px;
		font-size: ${parseInt(this.fontSize)}px;
		position: ${this.position};
		top: 0;
		left: 0;`
	}
}

const newElem = new DomElement('#block', '200px', '400px', 'green', '30px');


document.addEventListener('DOMContentLoaded', () => {
	newElem.createElem()

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





