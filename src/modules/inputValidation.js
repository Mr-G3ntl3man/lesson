const inputValidation = () => {
	document.addEventListener('input', el => {
		const target = el.target

		if (target.matches('.calc-item')) target.value = target.value.replace(/[^\d]/g, '')
		if (target.matches('[type="tel"]')) target.value = target.value.replace(/[^\d+]/g, '')
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