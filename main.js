const dropdownDefault = document.querySelector('.dropdown-lists__list--default'),
	dropdownSelect = document.querySelector('.dropdown-lists__list--select'),
	dropdownAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
	selectCities = document.querySelector('#select-cities'),
	closeBtn = document.querySelector('.close-button'),
	followBtn = document.querySelector('.button'),
	dropdownLists = document.querySelector('.dropdown-lists')

followBtn.style.pointerEvents = 'none'

let data = JSON.parse(localStorage.getItem('localCountry')) || []

const requestLocalCountry = url => {
	const request = () => {
		console.log('sad');
		fetch(url)
			.then(response => {
				if (response.status !== 200) throw new Error('Status not 200')
				return response
			})
			.then(response => response.json())
			.then(response => {
				if (!response[document.cookie.toUpperCase()]) {
					document.cookie = null
					throw new Error('Нет такой локали!')
				}
				return response[document.cookie.toUpperCase()]
			})
			.then(response => {
				data = []
				data.push(...response)
				data[0].local = 'RU'
				data[1].local = 'DE'
				data[2].local = 'EN'
				return data
			})
			.then(response => {
				response.sort((a, b) => a.local === document.cookie.toUpperCase() ?
					-1 : b.local === document.cookie.toUpperCase() ? 1 : 0)

				return response
			})
			.then(response => localStorage.setItem('localCountry', JSON.stringify(response)))
			.catch(er => document.body.insertAdjacentHTML('afterbegin', `<div class='error'>${er}</div>`))
	}


	if (!document.cookie) {
		const localCountry = (document.cookie === 'null' || document.cookie === '') ?
			prompt(`Введите локаль(RU, EN или DE)`, 'EN') : document.cookie

		document.cookie = localCountry
		request()
	}
}

requestLocalCountry('./db_cities.json')


const defaultList = () => {
	const listDefault = document.querySelector('.dropdown-lists__list--default .dropdown-lists__col')
	listDefault.innerHTML = `<div class='loading'><img src="preload.gif" alt="preload"></div>`

	dropdownDefault.style.display = 'block'
	dropdownSelect.style.display = 'none'
	dropdownAutocomplete.style.display = 'none'

	const createDef = response => {
		listDefault.innerHTML = ''
		response.forEach(el => {
			el.cities.sort((a, b) => b.count - a.count)

			listDefault.insertAdjacentHTML('beforeend',
				`	<div class="dropdown-lists__countryBlock">
			<div class="dropdown-lists__total-line">
				<div class="dropdown-lists__country">${el.country}</div>
				<div class="dropdown-lists__count">${el.count}</div>
			</div>
			<div class="dropdown-lists__line">
				<div class="dropdown-lists__city dropdown-lists__city--ip">${el.cities[0].name}</div>
				<div class="dropdown-lists__count">${el.cities[0].count}</div>
			</div>
			<div class="dropdown-lists__line">
				<div class="dropdown-lists__city">${el.cities[1].name}</div>
				<div class="dropdown-lists__count">${el.cities[1].count}</div>
			</div>
			<div class="dropdown-lists__line">
				<div class="dropdown-lists__city">${el.cities[2].name}</div>
				<div class="dropdown-lists__count">${el.cities[2].count}</div>
			</div>
		</div>`)
		});
	}

	setTimeout(() => createDef(data), 200)
}


const selectList = target => {
	const listSelect = document.querySelector('.dropdown-lists__list--select .dropdown-lists__col')
	listSelect.innerHTML = `<div class='loading'><img src="preload.gif" alt="preload"></div>`

	const createSel = response => {
		listSelect.innerHTML = ''

		response.forEach(el => {
			el.cities.sort((a, b) => b.count - a.count)
			const child = (target.childNodes[1] !== undefined) ? target.childNodes[1] : target;

			if (target.textContent === el.country || child.textContent === el.country) {
				listSelect.insertAdjacentHTML('beforeend',
					`	<div class="dropdown-lists__countryBlock">
			<div class="dropdown-lists__total-line">
				<div class="dropdown-lists__country">${el.country}</div>
				<div class="dropdown-lists__count">${el.count}</div>
			</div>
			<div class="dropdown-lists__line">
				<div class="dropdown-lists__city dropdown-lists__city--ip">${el.cities[0].name}</div>
				<div class="dropdown-lists__count">${el.cities[0].count}</div>
			</div>
		</div>`)

				for (let i = 1; i <= el.cities.length - 1; i++) {
					listSelect.querySelector('.dropdown-lists__countryBlock').insertAdjacentHTML('beforeend', `
				<div class="dropdown-lists__line">
					<div class="dropdown-lists__city">${el.cities[i].name}</div>
					<div class="dropdown-lists__count">${el.cities[i].count}</div>
				</div>`)
				}
			}
		})
	}

	setTimeout(() => createSel(data), 300)
}


const autocompleteList = target => {
	const listAuto = document.querySelector('.dropdown-lists__list--autocomplete .dropdown-lists__countryBlock')
	listAuto.innerHTML = `<div class='loading'><img src="preload.gif" alt="preload"></div>`

	dropdownDefault.style.display = 'none'
	dropdownSelect.style.display = 'none'
	dropdownAutocomplete.style.display = 'block'

	const createAuto = response => {
		listAuto.innerHTML = ''

		response.forEach(el => {
			el.cities.forEach(city => {
				let res = target.value.charAt(0).toUpperCase() + target.value.slice(1).toLowerCase()

				if (city.name.startsWith(res)) {
					const ressult = city.name.replace(res, '')

					listAuto.insertAdjacentHTML('beforeend',
						`	<div class="dropdown-lists__line">
						<div class="dropdown-lists__city"> <span class='find'>${res}</span>${ressult}</div>
						<div class="dropdown-lists__count">${el.country}</div>
					</div>`)
				}

				setTimeout(() => {
					if (listAuto.innerHTML === '') {
						listAuto.innerHTML = `
						<div class="dropdown-lists__line">
							<div class="dropdown-lists__city not-found">Ничего не найдено</div>
						</div>`
					}
				}, 200)

				if (selectCities.value === '') defaultList()
			})
		})

	}

	setTimeout(() => createAuto(data), 300)
}

const followLink = (response, target) => {
	response.forEach(el => {
		el.cities.forEach(city => {
			if (city.name === target.textContent.trim() || city.name === target.parentNode.textContent.trim()) {
				followBtn.style.pointerEvents = 'auto'
				followBtn.href = city.link
			}
		})
	})
}

const swapList = (el, counter) => {
	let count = counter

	const animNext = () => {
		count += 15
		const animId = requestAnimationFrame(animNext);
		(el >= count) ? dropdownLists.style.left = `-${count}px` : cancelAnimationFrame(animId)
	}

	const animPrev = () => {
		count -= 15
		const animId = requestAnimationFrame(animPrev);
		(el <= count) ? dropdownLists.style.left = `-${count}px` : cancelAnimationFrame(animId)
	}

	(el > 1) ? animNext() : animPrev()
}




document.addEventListener('click', el => {
	if (el.target.matches('#select-cities')) defaultList()

	if (el.target.closest('.dropdown-lists__list--default .dropdown-lists__total-line')) {
		dropdownSelect.style.display = 'block'
		selectList(el.target)
		swapList(405, 0)
	}

	if (el.target.closest('.dropdown-lists__list--select .dropdown-lists__total-line')) {
		swapList(0, 420)
	}

	if (el.target.matches('.dropdown-lists__country') || el.target.matches('.dropdown-lists__city')) {
		selectCities.value = el.target.textContent;

		(selectCities.value === '') ? closeBtn.style.display = 'none' : closeBtn.style.display = 'block'
	}

	if (el.target.matches('.close-button')) {
		followBtn.style.pointerEvents = 'none'
		selectCities.value = '';
		(selectCities.value === '') ? closeBtn.style.display = 'none' : closeBtn.style.display = 'block'
		dropdownDefault.style.display = 'none'
		dropdownSelect.style.display = 'none'
	}

	if (el.target.closest('.dropdown-lists__city')) {
		followLink(data, el.target)
	}
})

document.addEventListener('input', el => {
	if (el.target.matches('#select-cities')) {
		autocompleteList(el.target);

		(selectCities.value === '') ? (closeBtn.style.display = 'none', followBtn.style.pointerEvents = 'none') :
			closeBtn.style.display = 'block'
	}
})
