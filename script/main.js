'use strict';

const lang = prompt('Введите язык "ru" или "en"', 'en'),
	namePerson = prompt('Введите имя пользователя!', 'Артем'),
	daysOfTheWeek = [
		['ru', 'Дни недели на русском языке: понедельник, вторник, среда, четверг, пятница, суббота, воскресенье.'],
		['en', 'Дни недели на английском языке: monday, tuesday, wednesday, thursday, friday, saturday, sunday.'],
		[, 'Что-то пошло не так!'],],
	map = new Map(daysOfTheWeek),
	ru = daysOfTheWeek[0].toString().slice(3),
	en = daysOfTheWeek[1].toString().slice(3);


console.log(map.get(lang) || map.get(undefined));

if (lang === 'ru') console.log(ru);
else if (lang === 'en') console.log(en);
else console.log('Что-то пошло не так!');

switch (lang) {
	case 'ru': console.log(ru); break;
	case 'en': console.log(en); break;
	default: console.log('Что-то пошло не так!');
}


(namePerson === 'Артем') ? console.log('Директор') :
	(namePerson === 'Максим') ? console.log('Преподаватель') :
		(namePerson === null || !namePerson.length) ? console.log('Введите имя!') :
			console.log('Студент');