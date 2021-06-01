'use strict';

let lang = prompt('Введите язык "ru" или "en"', 'en');

if (lang === 'en') {
	console.log(`
		Дни недели на английском языке: monday, tuesday, wednesday,
		thursday, friday, saturday, sunday.
	`);
} else if (lang === 'ru') {
	console.log(`
		Дни недели на русском языке: понедельник, вторник, среда,
		четверг, пятница, суббота, воскресенье.
	`);
} else {
	console.log('Что-то пошло не так!');
}

switch (lang) {
	case 'en':
		console.log(`
		Дни недели на английском языке: monday, tuesday, wednesday,
		thursday, friday, saturday, sunday.
	`);
		break;

	case 'ru':
		console.log(`
		Дни недели на русском языке: понедельник, вторник, среда,
		четверг, пятница, суббота, воскресенье.
	`);
		break;

	default:
		console.log('Что-то пошло не так!');
}

const daysOfTheWeek = new Map([
	['ru', `Дни недели на русском языке: понедельник, вторник, среда,
	четверг, пятница, суббота, воскресенье.`],

	['en', `Дни недели на английском языке: monday, tuesday, wednesday,
	thursday, friday, saturday, sunday.`],

	[, 'Что-то пошло не так!'],

]);

console.log(daysOfTheWeek.has(lang) ? daysOfTheWeek.get(lang) : daysOfTheWeek.get(undefined))


let namePerson = prompt('Введите имя пользователя!', 'Артем');

(namePerson === 'Артем') ? console.log('Директор') :
	(namePerson === 'Максим') ? console.log('Преподаватель') :
		(namePerson === null || !namePerson.length) ? console.log('Введите имя!') :
			console.log('Студент');