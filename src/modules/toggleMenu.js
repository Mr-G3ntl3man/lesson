const toggleMenu = () => {
	const main = document.querySelector('main'),
		menu = document.querySelector('menu')


	let count = -10

	const anim = () => {
		count++
		const aminId = requestAnimationFrame(anim),
			menuRect = menu.getBoundingClientRect(),
			mainRect = main.getBoundingClientRect()

		if (mainRect.right < 768) cancelAnimationFrame(aminId)
		else if (menuRect.right < mainRect.right) {
			menu.style.transform = `translateX(${count * 10}%)`
			menu.classList.add('active')
		} else {
			cancelAnimationFrame(aminId)
		}
	}

	const animClose = () => {
		count--
		const aminId = requestAnimationFrame(animClose),
			menuRect = menu.getBoundingClientRect()
		if (menuRect.left > -menuRect.width) {
			menu.style.transform = `translateX(${count * 10}%)`
			menu.classList.remove('active')
		} else {
			cancelAnimationFrame(aminId)
		}
	}

	document.body.addEventListener('click', el => {
		if (el.target.closest('.menu')) anim()
		if (!el.target.closest('menu') && !el.target.closest('.menu')) animClose()
		if (el.target.classList.contains('close-btn')) animClose()
		if (el.target.closest('menu ul>li>a')) animClose()
	})

}

export default toggleMenu