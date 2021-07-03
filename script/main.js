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
		}, 0)

	}
	countTimer('30 june 2021')


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
			popup.style.opacity = '1'
			popupItem.style.transform = 'translate(-50px,0)'

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


	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			// btn = document.querySelectorAll('.portfolio-btn'),
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
	slider()


	const dataImg = () => {
		const img = document.querySelectorAll('.command .container .row img')

		img.forEach(el => {
			el.dataset.prevImg = el.src

			el.addEventListener('mouseenter', el => { el.target.src = el.target.dataset.img })
			el.addEventListener('mouseleave', el => { el.target.src = el.target.dataset.prevImg })
		})
	}
	dataImg()


	// const inputValidation = () => {
	// 	const calcBlock = document.querySelectorAll('.calc-block input'),
	// 		userName = document.querySelectorAll('[name="user_name"]'),
	// 		userMessage = document.querySelector('[name="user_message"]'),
	// 		email = document.querySelectorAll('[name="user_email"]'),
	// 		userPhone = document.querySelectorAll('[name="user_phone"]')

	// 	userName.forEach(el => {
	// 		el.addEventListener('blur', () => {
	// 			let res = ''
	// 			el.value.split(' ').forEach(elem => res += elem.charAt(0).toUpperCase() + elem.slice(1) + ' ')
	// 			el.value = res
	// 			el.value = el.value.replace(/[^а-яё ]/gi, '')
	// 			el.value = el.value.replace(/^\s+|\s+$/g, '')
	// 			el.value = el.value.replace(/\s+/g, ' ')
	// 		})
	// 	})

	// 	userPhone.forEach(el => {
	// 		el.addEventListener('blur', () => {
	// 			el.value = el.value.replace(/[^\d+]/g, '')
	// 		})
	// 	})

	// 	calcBlock.forEach(el => {
	// 		el.addEventListener('blur', () => {
	// 			el.value = el.value.replace(/[^\d]/g, '')
	// 		})
	// 	})

	// 	email.forEach(el => {
	// 		el.addEventListener('blur', () => {
	// 			el.value = el.value.replace(/^[^a-z@!_~'-.*]/gi, '')
	// 			el.value = el.value.replace(/-+/g, '-')
	// 		})
	// 	})

	// 	userMessage.addEventListener('blur', () => {
	// 		userMessage.value = userMessage.value.replace(/[^а-яё0-9 ,.!?]/gi, '')
	// 	})


	// }
	// inputValidation()


	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			total = document.querySelector('#total'),
			calcCount = document.querySelector('.calc-count')


		const countSum = () => {
			let res = 0,
				countValue = 1,
				dayValue = 1,
				counter = 0


			const typeValue = calcType.value,
				squareValue = calcSquare.value

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2
			} else if (calcDay.value && calcDay.value < 10) {
				// eslint-disable-next-line no-unused-vars
				dayValue *= 1.5
			}

			if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10
			if (typeValue && squareValue) res = price * typeValue * squareValue * countValue


			const animCount = () => {
				const kef = Math.ceil((res + 1) / 2000)
				counter += 50 * kef

				const animId = requestAnimationFrame(animCount);
				(counter <= res) ? total.textContent = Math.ceil(counter) : cancelAnimationFrame(animId)
			}
			animCount()
		}


		calcBlock.addEventListener('input', el => {
			if (el.target.matches('select') || el.target.matches('input')) countSum()
		})
	}
	calc()

	const validFrom = (form) => {
		const valid = new Validator({
			selector: form,
			pattern: {},
			method: {
				[`${form.slice(1)}-phone`]: [
					['notEmpty'],
					['pattern', 'phone']
				],
				[`${form.slice(1)}-email`]: [
					['notEmpty'],
					['pattern', 'email']
				],
				[`${form.slice(1)}-name`]: [
					['notEmpty'],
					['pattern', 'rus']
				],
				[`${form.slice(1)}-message`]: [
					['notEmpty'],
					['pattern', 'rus']
				],
			},
		})
		valid.init()
	}
	validFrom('#form1')
	validFrom('#form2')
	validFrom('#form3')

})