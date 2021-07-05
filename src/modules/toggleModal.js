const toggleModal = () => {
	const popup = document.querySelector('.popup'),
		popupBtn = document.querySelectorAll('.popup-btn'),
		popupItem = document.querySelector('.popup-content')

	let count = 0,
		countTwo = -20

	const anim = () => {
		count += 0.1
		const animId = requestAnimationFrame(anim);
		(count <= 1) ? popup.style.opacity = count : cancelAnimationFrame(animId)
	}

	const animClose = () => {
		count -= 0.1
		const animId = requestAnimationFrame(animClose);
		(count >= 0) ? popup.style.opacity = count : cancelAnimationFrame(animId)
	}

	const animModal = () => {
		countTwo++
		const animId = requestAnimationFrame(animModal);
		(0 >= countTwo) ? popupItem.style.transform = `translate(-50px,${countTwo * 5}%)` :
			cancelAnimationFrame(animId)
	}

	const animModalClose = () => {
		countTwo--
		const animId = requestAnimationFrame(animModalClose);
		(-30 <= countTwo) ? popupItem.style.transform = `translate(-50px,${countTwo * 5}%)` :
			cancelAnimationFrame(animId)
	}

	popupBtn.forEach(el => el.addEventListener('click', () => {
		popup.style.display = 'block'
		popup.style.opacity = '1'
		popupItem.style.transform = 'translate(-50px,0)'

		if (document.body.clientWidth > 768) {
			popup.style.opacity = '0'
			popupItem.style.transform = 'translate(-50px,-150%)'
			anim()
			setTimeout(() => animModal(), 200)
		}
	}))

	popup.addEventListener('click', ev => {
		const target = ev.target.closest('.popup-content')

		if (ev.target.classList.contains('popup-close')) {
			if (document.body.clientWidth < 768) {
				popup.style.display = 'none'
			} else {
				animModalClose()
				setTimeout(() => animClose(), 400)
				setTimeout(() => popup.style.display = 'none', 500)
			}
		}

		if (!target) {
			if (document.body.clientWidth < 768) {
				popup.style.display = 'none'
			} else {
				animModalClose()
				setTimeout(() => animClose(), 400)
				setTimeout(() => popup.style.display = 'none', 500)
			}
		}
	})
}

export default toggleModal