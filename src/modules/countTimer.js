const countTimer = deadline => {
	const timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds')

	timerHours.textContent = '00'
	timerMinutes.textContent = '00'
	timerSeconds.textContent = '00'

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

	const timer = setInterval(() => ((getTimeRemaining().timeRemaining < 0) ? clearInterval(timer) : updateClock()), 0)

}

export default countTimer