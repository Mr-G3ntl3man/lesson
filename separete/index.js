const divD = document.createElement('div'),
	divN = document.createElement('div')

document.body.appendChild(divD)
document.body.appendChild(divN)

document.body.style.cssText = `
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-size: 60px;
	color: rgb(182, 0, 0);
	font-weight: 700;
	height: 100vh;
	
`

const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}

const createZero = i => {
	if (i < 10) { i = "0" + i }
	return i
}

// До нового года осталось ${newYear}
const resultDate = () => {
	const date = new Date(),
		today = date.toLocaleDateString('ru', options),
		hour = createZero(date.getHours()),
		minute = createZero(date.getMinutes()),
		second = createZero(date.getSeconds())

	const timesOfDay = () => {
		if (hour >= 0 && hour <= 6) {
			return 'Доброй ночи'
		} else if (hour >= 6 && hour <= 12) {
			return 'Доброе утро'
		} else if (hour >= 12 && hour <= 18) {
			return 'Добрый день'
		} else if (hour >= 18 && hour <= 24) {
			return 'Добрый вечер'
		}
	}

	const result = `
		${timesOfDay()}
		Сегодня ${today.slice(0, -17)}
		Текущее время: ${hour}:${minute}:${second}

		`

	divD.innerHTML = result
}

setInterval(resultDate, 1000)
