'use strict';


const nameHours = ['час', 'часов', 'часа'],
	nameMinute = ['минута', 'минуты', 'минут'],
	nameSeconds = ['секунда', 'секунды', 'секунд'];

const checkTime = (i) => {
	if (i < 10) { i = "0" + i; }
	return i;
};

const fixName = (value, arr) => {
	const a = Math.abs(value) % 100,
		b = a % 10;

	if (a > 10 && a < 20) { return `${value} ${arr[2]}`; }
	else if (b > 1 && b < 5) { return `${value} ${arr[1]}`; }
	else if (b == 1) { return `${value} ${arr[0]}`; }
	return `${value} ${arr[2]}`;
};


const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};

const date = new Date(),
	today = date.toLocaleDateString('ru', options),
	hour = checkTime(date.getHours()),
	minute = checkTime(date.getMinutes()),
	second = checkTime(date.getSeconds());


document.body.style.cssText = `
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 60px;
	color: rgb(182, 0, 0);
	font-weight: 700;
	height: 100vh;
`;
document.body.insertAdjacentHTML("beforeend", `<div>Сегодня ${today.slice(0, -2)}год, ${fixName(hour, nameHours)} ${fixName(minute, nameMinute)} ${fixName(second, nameSeconds)}</div>`)