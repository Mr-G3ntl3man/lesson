const dataImg = () => {
	const img = document.querySelectorAll('.command .container .row img')

	img.forEach(el => {
		el.dataset.prevImg = el.src

		el.addEventListener('mouseenter', el => { el.target.src = el.target.dataset.img })
		el.addEventListener('mouseleave', el => { el.target.src = el.target.dataset.prevImg })
	})
}

export default dataImg