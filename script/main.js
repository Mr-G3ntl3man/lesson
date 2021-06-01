'use strict';

const fixString = (arg) => {
	if (typeof arg === 'string') {
		(arg.length > 30) ? console.log(`${arg.trim().substring(0, 30)}...`) : console.log(arg.trim());
	} else {
		console.log('Ошибка! Функция принимает только строковое значение!');
	}
};

fixString('     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa        ');