window.addEventListener('DOMContentLoaded', () => {
	const countTimer = deadline => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds')

		const createZero = i => (i < 10 ? `0${i}` : i)


		const getTimeRemaining = () => {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60)

			return { timeRemaining, hours, minutes, seconds, dateStop, dateNow }
		}

		const updateClock = () => {
			timerHours.textContent = createZero(getTimeRemaining().hours)
			timerMinutes.textContent = createZero(getTimeRemaining().minutes)
			timerSeconds.textContent = createZero(getTimeRemaining().seconds)
		}

		const timer = setInterval(() => {
			if (getTimeRemaining().timeRemaining > 0) {
				updateClock()
			} else {
				clearInterval(timer)
				timerHours.textContent = '00'
				timerMinutes.textContent = '00'
				timerSeconds.textContent = '00'
			}
		}, 1000)

		updateClock()
	}
	countTimer('25 june 2021')


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
	toggleMenu()


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

			if (window.innerWidth > 768) {
				popup.style.opacity = '0'
				popupItem.style.transform = 'translate(-50px,-150%)'
				anim()
				setTimeout(() => animModal(), 200)
			}
		}))

		popup.addEventListener('click', ev => {
			const target = ev.target.closest('.popup-content')

			if (ev.target.classList.contains('popup-close')) {
				if (window.innerWidth < 768) {
					popup.style.display = 'none'
				} else {
					animModalClose()
					setTimeout(() => animClose(), 400)
					setTimeout(() => popup.style.display = 'none', 500)
				}
			}


			if (!target) {
				if (window.innerWidth < 768) {
					popup.style.display = 'none'
				} else {
					animModalClose()
					setTimeout(() => animClose(), 400)
					setTimeout(() => popup.style.display = 'none', 500)
				}
			}
		})
	}
	toggleModal()


	const arrow = document.querySelector('a')

	const scroll = elem => {
		const name = elem.href.split('#')[1],
			item = document.querySelector(`#${name}`)

		item.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	arrow.addEventListener('click', el => {
		el.preventDefault()
		scroll(arrow)
	})


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
	tabs()

})



