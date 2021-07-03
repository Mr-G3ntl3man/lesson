class Validator {
	constructor({ selector, pattern = {}, method }) {
		this.form = document.querySelector(selector)
		this.pattern = pattern
		this.method = method
		this.elemsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button')
		this.error = new Set()
	}

	init() {
		this.applyStyle()
		this.setPattern()
		this.elemsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)))
		this.form.addEventListener('submit', ev => {
			this.elemsForm.forEach(el => this.checkIt({ target: el }))
			if (this.error.size) ev.preventDefault()
		})
	}

	isValid(el) {
		const validatorMethod = {
			notEmpty(el) {
				if (el.value.trim() === '') return false
				return true
			},
			pattern(el, pattern) {
				return pattern.test(el.value)
			}
		}

		if (this.method) {
			const method = this.method[el.id]
			if (method) return method.every(item => validatorMethod[item[0]](el, this.pattern[item[1]]))
		}

		return true
	}

	checkIt(el) {
		if (this.isValid(el.target)) {
			this.showSuccess(el.target)
			this.error.delete(el.target)
		} else {
			this.showError(el.target)
			this.error.add(el.target)
		}
	}

	showError(el) {
		el.classList.remove('success')
		el.classList.add('error')

		if (el.nextElementSibling && el.nextElementSibling.classList.contains('validator-error')) return

		el.insertAdjacentHTML('afterend', `<div class='validator-error'>Ошибка в этом поле!</div>`)
	}

	showSuccess(el) {
		el.classList.remove('error')
		el.classList.add('success')
		if (el.nextElementSibling && el.nextElementSibling.classList.contains('validator-error')) el.nextElementSibling.remove()

	}

	applyStyle() {
		const style = document.createElement('style')
		style.textContent = `
			input.success {
				border: 2px solid green !important;
			}
			input.error {
				border: 2px solid red !important;
			}
			.validator-error {
				font-size: 14px;
				color: red;
			}
		`
		document.head.appendChild(style)
	}
	setPattern() {
		if (!this.pattern.phone) this.pattern.phone = /^\+?[78]([-()]*\d){10}$/
		if (!this.pattern.email) this.pattern.email = /^\w+@\w+\.\w{2,}$/
		if (!this.pattern.rus) this.pattern.rus = /^[а-яё ]+$/i
	}
}