window.addEventListener('DOMContentLoaded', () => {
	const countTimer = deadline => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds')

		const createZero = i => { if (i < 10) { i = "0" + i } return i }


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

	countTimer('18 june 2021')
})



