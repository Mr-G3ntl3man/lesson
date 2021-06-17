const div1 = document.createElement('div'),
	div2 = document.createElement('div'),
	div3 = document.createElement('div'),
	div4 = document.createElement('div')

document.body.appendChild(div1)
document.body.appendChild(div2)
document.body.appendChild(div3)
document.body.appendChild(div4)

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

	const newYear = () => {
		const year = new Date('January 1, 2022'),
			msDay = 24 * 60 * 60 * 1000,
			daysLeft = Math.round((year.getTime() - date.getTime()) / msDay),
			dd = parseInt(String(daysLeft).substr(daysLeft.length - 1))

		if (daysLeft > 4 && daysLeft < 21) {
			return `${daysLeft} дней`
		} else if (dd === 1) {
			return `${daysLeft} день`
		} else if (dd === 2 || dd === 3 || dd === 4) {
			return `${daysLeft} дня`
		} else {
			return `${daysLeft} дней`
		}
	}


	div1.innerHTML = `${timesOfDay()}`
	div2.innerHTML = `Сегодня: ${(today.charAt(0).toUpperCase() + today.slice(1)).slice(0, -17)}`
	div3.innerHTML = `Текущее время: ${hour}:${minute}:${second}`
	div4.innerHTML = `До нового года осталось ${newYear()}`
}

setInterval(resultDate, 1000)
