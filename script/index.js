'use strict'

const userName = document.querySelector('.user__name'),
	check = document.querySelector('.check'),
	login = document.querySelector('.login'),
	userList = document.querySelector('.user-list')


const data = JSON.parse(localStorage.getItem('Person')) || []

data.forEach(el => userList.insertAdjacentHTML('beforeend', `<li>Имя: ${el.name}, Фамилия: ${el.surname}, Дата регистрации: ${el.registrationDate} <button class='remove'>Удалить</button></li>`));

const dateNow = () => {
	const createZero = i => i < 10 ? `0${i}` : i

	const date = new Date(),
		today = date.toLocaleDateString('ru', { year: 'numeric', month: 'long', day: 'numeric', }),
		hour = createZero(date.getHours()),
		minute = createZero(date.getMinutes()),
		second = createZero(date.getSeconds())

	return `${today} - ${hour}:${minute}:${second}`
}

const collector = () => {
	const name = prompt('Ведите имя и фамилию, через пробел!')

	if (/^[а-яё]+ [а-яё]+$/i.test(name)) {
		const prop = name.split(' '),
			login = prompt('Ведите логин!'),
			password = prompt('Ведите пароль!')

		const newPerson = { name: prop[0], surname: prop[1], login: login, password: password, registrationDate: dateNow() }
		data.push(newPerson)
		userList.insertAdjacentHTML('beforeend', `<li>Имя: ${newPerson.name}, Фамилия: ${newPerson.surname}, Дата регистрации: ${newPerson.registrationDate} <button class='remove'>Удалить</button></li>`)
		localStorage.setItem('Person', JSON.stringify(data))
	} else {
		alert('Ошибка')
	}
}

const removePrerson = (el) => {
	if (el.className === 'remove') {
		data.forEach((prop, index) => { if (prop.registrationDate === el.parentNode.textContent.split(': ')[3].slice(0, -8)) data.splice(index, 1) })

		el.parentNode.remove()
		localStorage.setItem('Person', JSON.stringify(data))
	}
}

const logPerson = () => {
	const login = prompt('Ведите логин!');

	let log = 0;

	data.forEach(el => { if (login === el.login) log = el })

	if (login === log.login) {
		const password = prompt('Ведите пароль!');
		(password === log.password) ? userName.innerHTML = log.name : alert('Не верный пароль!')
	} else { alert('Пользователь не найден!') }

}

check.addEventListener('click', collector)
userList.addEventListener('click', el => removePrerson(el.target))
login.addEventListener('click', logPerson)





