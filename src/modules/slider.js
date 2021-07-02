const slider = () => {
	const slide = document.querySelectorAll('.portfolio-item'),
		slider = document.querySelector('.portfolio-content'),
		portfolioDots = document.querySelector('.portfolio-dots')

	let currentSlide = 0,
		interval

	if (slide.length) portfolioDots.insertAdjacentHTML('beforeend', `<li class='dot dot-active'></li>`)
	for (let i = 0; i < slide.length - 1; i++) {
		portfolioDots.insertAdjacentHTML('beforeend', `<li class='dot'></li>`)
	}
	const dots = document.querySelectorAll('.dot')

	const prevSlide = (el, index, elClass) => el[index].classList.remove(elClass)
	const nextSlide = (el, index, elClass) => el[index].classList.add(elClass)

	const autoPlay = () => {
		prevSlide(slide, currentSlide, 'portfolio-item-active')
		prevSlide(dots, currentSlide, 'dot-active')
		currentSlide++
		if (currentSlide >= slide.length) currentSlide = 0
		nextSlide(slide, currentSlide, 'portfolio-item-active')
		nextSlide(dots, currentSlide, 'dot-active')
	}

	const startSlide = (time = 3000) => interval = setInterval(autoPlay, time)

	const stoptSlide = () => clearInterval(interval)

	slider.addEventListener('click', el => {
		el.preventDefault()
		if (!el.target.matches('.portfolio-btn, .dot')) { return }

		prevSlide(slide, currentSlide, 'portfolio-item-active')
		prevSlide(dots, currentSlide, 'dot-active')

		if (el.target.matches('#arrow-right')) currentSlide++
		if (el.target.matches('#arrow-left')) currentSlide--
		if (el.target.matches('.dot')) {
			dots.forEach((elem, index) => { if (elem === el.target) currentSlide = index })
		}

		if (currentSlide >= slide.length) currentSlide = 0
		if (currentSlide < 0) currentSlide = slide.length - 1

		nextSlide(slide, currentSlide, 'portfolio-item-active')
		nextSlide(dots, currentSlide, 'dot-active')
	})

	slider.addEventListener('mouseover', el => {
		if (el.target.matches('.portfolio-btn') || el.target.matches('.dot')) stoptSlide()
	})
	slider.addEventListener('mouseout', el => {
		if (el.target.matches('.portfolio-btn') || el.target.matches('.dot')) startSlide()
	})
	startSlide()
}

export default slider