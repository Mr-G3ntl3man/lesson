const sendForm = () => {
	const message = document.createElement('div'),
		body = {}

	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})

	const collector = el => {
		el.preventDefault()
		document.querySelectorAll('form input').forEach(el => el.style.cssText = `box-shadow: transparent; border: none;`)
		message.insertAdjacentHTML('afterbegin', `<img src="images/preloader.gif" >`)
		const formData = new FormData(el.target)
		formData.forEach((el, key) => body[key] = el)

		postData(body)
			.then(response => {
				if (response.status !== 200) throw new Error('Status not 200')
				message.textContent = 'Запрос отправлен'
				setTimeout(() => message.textContent = '', 2000)
			})
			.catch(() => {
				message.textContent = 'Ошибка'
				setTimeout(() => message.textContent = '', 2000)
			})

		message.style.color = '#fff'
		el.target.appendChild(message)
		el.target.querySelectorAll('input').forEach(el => el.value = '')
	}

	document.addEventListener('submit', el => collector(el))
}

export default sendForm