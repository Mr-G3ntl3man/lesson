const getMovies = url => {
	const listWrapper = document.querySelector('.menu__list-container')

	const uniqueMovies = el => {
		const movies = new Set()
		el.forEach(el => { if (el.movies) el.movies.forEach(elem => movies.add(elem)) })

		return movies
	}

	const addMovies = el => {
		const ul = document.createElement('ul')
		ul.classList.add('menu__list')
		el.forEach(elem => ul.insertAdjacentHTML('beforeend', `<li class ='menu__item'>${elem}</li>`))

		return ul
	}

	const request = el => {
		fetch(el)
			.then(response => {
				if (response.status !== 200) throw new Error('Status not 200')
				return response.json()
			})
			.then(response => uniqueMovies(response))
			.then(response => addMovies(response))
			.then(response => {
				if (!listWrapper.innerHTML) {
					listWrapper.appendChild(response)
					setTimeout(() => response.classList.add('anim'), 200);
				} else {
					listWrapper.querySelector(`.${response.className}`).classList.remove('anim')
					setTimeout(() => listWrapper.querySelector(`.${response.className}`).remove(), 300);
				}
			})
			.catch(er => console.error(er))
	}

	request(url)
}


const addCard = (url, event) => {

	const checkIMovies = (movies, card, event) => {
		const cardWrapper = document.querySelector('.card'),
			ul = document.createElement('ul')
		ul.classList.add('card__list')

		if (movies === event.target.textContent.trim()) {
			for (key in card) {
				(key !== 'photo') ? ul.insertAdjacentHTML('beforeend', `
						<li class='card__subinfo'><span class='card__info'>${key}:</span> ${card[key]}</li>	`) :
					ul.insertAdjacentHTML('afterbegin', `
							<li class='card__bg' style='background: url(${card[key]}) no-repeat 0 0 / cover'></li>`)
			}
			cardWrapper.appendChild(ul)
		}
	}

	const checkCard = item => item.forEach(card => { if (card.movies) card.movies.forEach(movies => checkIMovies(movies, card, event)) })

	fetch(url)
		.then(response => {
			if (response.status !== 200) throw new Error('Status not 200')
			return response.json()
		})
		.then(response => {
			console.log(response);
			document.querySelector('.card').innerHTML = ''
			checkCard(response)
		})
		.catch(er => console.error(er))
}

document.addEventListener('click', event => {
	if (event.target.matches('.menu__btn')) getMovies('./dbHeroes.json')
	if (event.target.matches('.menu__item')) addCard('./dbHeroes.json', event)
})

