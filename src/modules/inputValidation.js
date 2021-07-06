const inputValidation = () => {
	const mail = document.querySelectorAll('[type="email"]'),
		btnTop = document.querySelector('#form1 button'),
		btnBot = document.querySelector('#form2 button'),
		btnModal = document.querySelector('#form3 button')


	mail.forEach(el => el.setAttribute('required', ''))

	const styleSuccess = (el, btn) => {
		el.style.cssText = `	border: 1px solid green;box-shadow: 0 0 10px green;`
		if (btn) btn.removeAttribute('disabled')
	}
	const styleError = (el, btn) => {
		el.style.cssText = `border: 1px solid red;box-shadow: 0 0 10px red;	`
		if (btn) btn.setAttribute('disabled', 'disabled')
	}

	const formValid = (target, form, btn) => {
		if (target.closest(form)) {
			if (target.matches('[type="tel"]')) {
				target.reportValidity()
				target.setCustomValidity('');

				(/^\+\d{11}$/.test(target.value) || /^[78]\d{10}$/.test(target.value)) ? styleSuccess(target, btn) :
					styleError(target, btn),
					target.setCustomValidity('Ошибка! Поле должно начинаться с (+,7,8) и быть не длинее 11 или 12 символов')
			}

			if (target.matches('[name="user_message"]')) {
				(target.value !== '') ? ((/^[а-яё0-9,.!? ]+$/i.test(target.value)) ? styleSuccess(target, btn) : styleError(target, btn)) :
					styleError(target, btn)
			}

			if (target.matches('[type="email"]')) {
				(/-?\w+@\w+\.\w{2,3}/.test(target.value)) ? styleSuccess(target, btn) : styleError(target, btn)
			}

			if (target.matches('[name="user_name"]')) {
				(/^[а-яё]+ [а-яё]+$/i.test(target.value)) ? styleSuccess(target, btn) : styleError(target, btn)
			}
		}
	}

	document.addEventListener('input', el => {
		const target = el.target

		if (target.matches('.calc-item')) (/^\d+$/.test(target.value)) ? styleSuccess(target) : styleError(target)

		formValid(target, '#form1', btnTop)
		formValid(target, '#form2', btnBot)
		formValid(target, '#form3', btnModal)
	})

	document.querySelectorAll('input').forEach(elem => {
		elem.addEventListener('blur', el => {
			const target = el.target

			if (target.matches('[type="email"]')) target.value = target.value.replace(/-+/g, '-')
			if (target.matches('[name="user_message"]')) {
				target.value = target.value.replace(/^\s+|\s+$/g, '')
				target.value = target.value.replace(/\s+/g, ' ')
			}
			if (target.matches('[name="user_name"]')) {
				let res = ''
				target.value.split(' ').forEach(elem => res += elem.charAt(0).toUpperCase() + elem.slice(1).toLowerCase() + ' ')

				target.value = res
				target.value = target.value.replace(/^\s+|\s+$/g, '')
				target.value = target.value.replace(/\s+/g, ' ')
			}
		})
	})
}

export default inputValidation



