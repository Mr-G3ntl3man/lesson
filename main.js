const defaultList = url => {
	const listDefault = document.querySelector('.dropdown-lists__list--default .dropdown-lists__col')

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

const selectList = (url, target, block) => {
	const listSelect = document.querySelector('.dropdown-lists__list--select .dropdown-lists__col')

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

					for (let i = 3; i <= el.cities.length - 1; i++) {
						block.insertAdjacentHTML('beforeend', `
						<div class="dropdown-lists__line">
							<div class="dropdown-lists__city">${el.cities[i].name}</div>
							<div class="dropdown-lists__count">${el.cities[i].count}</div>
						</div>`)
					}
				}



			})
		})
}

const removeList = () => {

}


document.addEventListener('click', el => {
	if (el.target.matches('#select-cities')) { defaultList('./db_cities.json') }
	if (el.target.closest('.dropdown-lists__total-line')) {
		const parentBlock = (el.target.parentNode.className === 'dropdown-lists__countryBlock') ?
			el.target.parentNode : el.target.parentNode.parentNode;
		selectList('./db_cities.json', el.target, parentBlock)
	}
})