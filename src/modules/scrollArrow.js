const scrollArrow = () => {
	const arrow = document.querySelector('a')

	const scroll = (elem, event) => {
		event.preventDefault()
		const name = elem.href.split('#')[1],
			item = document.querySelector(`#${name}`)

		item.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	arrow.addEventListener('click', event => scroll(arrow, event))
}

export default scrollArrow