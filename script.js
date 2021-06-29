document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	const select = document.getElementById('cars'),
		output = document.getElementById('output')

	const collector = () => new Promise((res, rej) => {
		const request = new XMLHttpRequest()
		request.open('GET', './cars.json')
		request.setRequestHeader('Content-type', 'application/json')
		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) return;
			(request.status === 200) ? res(request) : rej()
		})
		request.send()
	})


	select.addEventListener('change', () => {
		collector()
			.then(request => {
				const data = JSON.parse(request.responseText)
				data.cars.forEach(item => {
					if (item.brand === select.value) {
						const { brand, model, price } = item;
						output.innerHTML = `Тачка ${brand} ${model} Цена: ${price}$`
					}
				})
			})
			.catch(() => output.innerHTML = 'Произошла ошибка')
	})
})




