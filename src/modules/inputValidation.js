const inputValidation = () => {
	const mail = document.querySelectorAll('[type="email"]')
	mail.forEach(el => el.setAttribute('required', ''))

	document.addEventListener('input', el => {
		const target = el.target,
			formBtn = document.querySelector('.form-btn')

		if (target.matches('.calc-item')) target.value = target.value.replace(/[^\d]/g, '')
		if (target.matches('[type="tel"]')) {
			target.value = target.value.replace(/[^\d+]/g, '')
			target.reportValidity()
			target.setCustomValidity('')

			if (target.value.match(/^\+/)) {
				target.setAttribute('maxlength', '12');
				(target.value.length < 12) ? formBtn.setAttribute('disabled', 'disabled') : formBtn.removeAttribute('disabled')
			} else if (target.value.match(/^7/) || target.value.match(/^8/)) {
				target.setAttribute('maxlength', '11');
				(target.value.length < 11) ? formBtn.setAttribute('disabled', 'disabled') : formBtn.removeAttribute('disabled')
			} else {
				target.setAttribute('maxlength', '1');
				formBtn.setAttribute('disabled', 'disabled')
				target.setCustomValidity('Ошибка! Поле должно начинаться с (+,7,8) и быть не длинее 11 или 12 символов');
			}
		}
		if (target.matches('[name="user_message"]')) target.value = target.value.replace(/[^а-яё0-9,.!?]/gi, '')
		if (target.matches('[type="email"]')) target.value = target.value.replace(/^[^a-z@!_~'-.*]/gi, '')
		if (target.matches('[name="user_name"]')) target.value = target.value.replace(/[^а-яё ]/gi, '')
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
				target.value.split(' ').forEach(elem => res += elem.charAt(0).toUpperCase() + elem.slice(1) + ' ')
				target.value = res
				target.value = target.value.replace(/^\s+|\s+$/g, '')
				target.value = target.value.replace(/\s+/g, ' ')
			}
		})
	})
}

export default inputValidation