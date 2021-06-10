'use strict';


const nameHours = ['час', 'часов', 'часа'],
	nameMinute = ['минута', 'минуты', 'минут'],
	nameSeconds = ['секунда', 'секунды', 'секунд'],
	divD = document.createElement('div'),
	divN = document.createElement('div');

document.body.appendChild(divD);
document.body.appendChild(divN);

document.body.style.cssText = `
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-size: 60px;
	color: rgb(182, 0, 0);
	font-weight: 700;
	height: 100vh;
	
`;

const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};

const optionsNum = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
};

const fixName = (value, arr) => {
	const a = Math.abs(value) % 100,
		b = a % 10;

	if (a > 10 && a < 20) { return `${value} ${arr[2]}`; }
	else if (b > 1 && b < 5) { return `${value} ${arr[1]}`; }
	else if (b == 1) { return `${value} ${arr[0]}`; }
	return `${value} ${arr[2]}`;
};

const createZero = (i) => {
	if (i < 10) { i = "0" + i; }
	return i;
};


const resultDate = () => {
	const date = new Date(),
		today = date.toLocaleDateString('ru', options),
		todayNum = date.toLocaleDateString('ru', optionsNum),
		hour = createZero(date.getHours()),
		minute = createZero(date.getMinutes()),
		second = createZero(date.getSeconds());

	const resultFullDate = `Сегодня ${today.slice(0, -2)}год, ${fixName(hour, nameHours)} ${fixName(minute, nameMinute)} ${fixName(second, nameSeconds)}`,
		resultNumDate = `${todayNum.slice(0)} - ${hour}:${minute}:${second}`;

	divD.innerHTML = resultFullDate;
	divN.innerHTML = resultNumDate;
}

setInterval(resultDate, 1000);