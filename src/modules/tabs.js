const tabs = () => {
	const headerTab = document.querySelector('.service-header'),
		tab = headerTab.querySelectorAll('.service-header-tab'),
		tabContent = document.querySelectorAll('.service-tab')

	const toggleContent = index => {
		tabContent.forEach((el, i) => {
			if (index === i) {
				tab[i].classList.add('active')
				tabContent[i].classList.remove('d-none')
			} else {
				tab[i].classList.remove('active')
				tabContent[i].classList.add('d-none')
			}
		})
	}

	headerTab.addEventListener('click', el => {
		const target = el.target.closest('.service-header-tab')
		if (target) { tab.forEach((el, index) => { if (el === target) toggleContent(index) }) }
	})
}

export default tabs