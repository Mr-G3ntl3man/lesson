window.addEventListener('DOMContentLoaded', () => {
	const countTimer = deadline => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds')

		const createZero = i => i < 10 ? `0${i}` : i


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
	countTimer('20 june 2021')


	const toggleMenu = () => {
		const menuBtn = document.querySelector('.menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItem = document.querySelectorAll('ul>li'),
			main = document.querySelector('main'),
			menu = document.querySelector('menu')


		let count = -10

		const anim = () => {
			count++
			const aminId = requestAnimationFrame(anim),
				menuRect = menu.getBoundingClientRect(),
				mainRect = main.getBoundingClientRect();

			(mainRect.right < 768) ? cancelAnimationFrame(aminId) :
				(menuRect.right < mainRect.right) ? menu.style.transform = `translateX(${count * 10}%)` : cancelAnimationFrame(aminId)
		}

		const animClose = () => {
			count--
			const aminId = requestAnimationFrame(animClose),
				menuRect = menu.getBoundingClientRect();
			(menuRect.left > -menuRect.width) ? menu.style.transform = `translateX(${count * 10}%)` : cancelAnimationFrame(aminId)
		}

		menuBtn.addEventListener('click', anim)
		closeBtn.addEventListener('click', animClose)
		menuItem.forEach(el => el.addEventListener('click', () => menu.classList.toggle('active-menu')))
	}
	toggleMenu()


	const toggleModal = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close'),
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
			(0 >= countTwo) ? popupItem.style.transform = `translate(-50px,${countTwo * 5}%)` : cancelAnimationFrame(animId)
		}

		animModalClose = () => {
			countTwo--
			const animId = requestAnimationFrame(animModalClose);
			(-30 <= countTwo) ? popupItem.style.transform = `translate(-50px,${countTwo * 5}%)` : cancelAnimationFrame(animId)
		}

		popupBtn.forEach(el => el.addEventListener('click', () => {
			if (window.innerWidth > 768) {
				popup.style.display = 'block'
				popup.style.opacity = '0'
				popupItem.style.transform = 'translate(-50px,-150%)'
				anim()
				setTimeout(() => animModal(), 200);
			}
		}))
		popupClose.addEventListener('click', () => {
			animModalClose()
			setTimeout(() => animClose(), 400);
			setTimeout(() => popup.style.display = 'none', 500);
		})
	}
	toggleModal()



	const scrollTo = () => {
		const arrow = document.querySelector('a'),
			main = document.querySelector('main')

		let count = 0

		const scrollPx = () => window.scrollY

		const scroll = () => {
			count += 0.4
			const animId = requestAnimationFrame(scroll);
			(Math.round(scrollPx()) <= Math.round(main.offsetHeight)) ? window.scrollBy(0, count) : cancelAnimationFrame(animId)
		}

		arrow.addEventListener('click', el => {
			el.preventDefault()
			scroll()
		})
	}
	scrollTo()

})



