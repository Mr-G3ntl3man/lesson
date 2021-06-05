'use strict';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье',];

for (let i = 0; i < week.length; i++) {
	let html = week[i];
	let dateNow = new Date().getDate();

	if (week[dateNow] === html) html = html.bold();
	else if (i > 4) html = html.italics();

	const div = document.createElement('div');
	div.innerHTML = html;
	document.body.appendChild(div);
}