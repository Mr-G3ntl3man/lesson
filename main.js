const dropdownDefault = document.querySelector('.dropdown-lists__list--default'),
	dropdownSelect = document.querySelector('.dropdown-lists__list--select'),
	dropdownAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete'),
	selectCities = document.querySelector('#select-cities'),
	closeBtn = document.querySelector('.close-button'),
	followBtn = document.querySelector('.button')

followBtn.style.pointerEvents = 'none'

const defaultList = url => {
	const listDefault = document.querySelector('.dropdown-lists__list--default .dropdown-lists__col')
	listDefault.innerHTML = ''

	dropdownDefault.style.display = 'block'

	fetch(url)
		.then(response => response.json())
		.then(response => response.RU.sort((a, b) => b.count - a.count))
		.then(response => {
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
		})
}

const selectList = (url, target) => {
	const listSelect = document.querySelector('.dropdown-lists__list--select .dropdown-lists__col')
	listSelect.innerHTML = ''

	fetch(url)
		.then(response => response.json())
		.then(response => response.RU.sort((a, b) => b.count - a.count))
		.then(response => {
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
		})
}

const autocompleteList = (url, target) => {
	const listAuto = document.querySelector('.dropdown-lists__list--autocomplete .dropdown-lists__countryBlock')
	listAuto.innerHTML = ''

	dropdownDefault.style.display = 'none'
	dropdownSelect.style.display = 'none'
	dropdownAutocomplete.style.display = 'block'

	fetch(url)
		.then(response => response.json())
		.then(response => {
			response.RU.forEach(el => {

				el.cities.forEach(city => {
					if (city.name.startsWith(target.value.charAt(0).toUpperCase() + target.value.slice(1).toLowerCase())) {
						listAuto.insertAdjacentHTML('beforeend',
							`	<div class="dropdown-lists__line">
								<div class="dropdown-lists__city">${city.name}</div>
								<div class="dropdown-lists__count">${city.count}</div>
							</div>`)
					}

					setTimeout(() => {
						if (listAuto.innerHTML === '') {
							listAuto.innerHTML = `
								<div class="dropdown-lists__line">
									<div class="dropdown-lists__city">Ничего не найдено</div>
								</div>`
						}
					}, 200)

					if (selectCities.value === '') {
						dropdownDefault.style.display = 'block'
						dropdownSelect.style.display = 'none'
						dropdownAutocomplete.style.display = 'none'
					}
				})
			})
		})
}
const followLink = (url, target) => {

	fetch(url)
		.then(response => response.json())
		.then(response => {
			response.RU.forEach(el => {
				el.cities.forEach(city => {
					if (city.name === target.textContent) {
						followBtn.style.pointerEvents = 'auto'
						followBtn.href = city.link
					}
				})
			})

		})

}

document.addEventListener('click', el => {
	if (el.target.matches('#select-cities')) defaultList('./db_cities.json')

	if (el.target.closest('.dropdown-lists__list--default .dropdown-lists__total-line')) {
		dropdownDefault.style.display = 'none'
		dropdownSelect.style.display = 'block'

		selectList('./db_cities.json', el.target)
	}

	if (el.target.closest('.dropdown-lists__list--select .dropdown-lists__total-line')) {
		dropdownDefault.style.display = 'block'
		dropdownSelect.style.display = 'none'
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
	if (el.target.matches('.dropdown-lists__city')) {

		followLink('./db_cities.json', el.target)
	}
})

document.addEventListener('input', el => {
	if (el.target.matches('#select-cities')) {
		autocompleteList('./db_cities.json', el.target);

		(selectCities.value === '') ? (closeBtn.style.display = 'none', followBtn.style.pointerEvents = 'none') :
			closeBtn.style.display = 'block'
	}
})


