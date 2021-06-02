'use strict';

const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const fixString = (arg) => {
	if (!isNumber(arg)) {
		(arg.length > 30) ? console.log(`${arg.trim().substring(0, 30)}...`) : console.log(arg.trim());
	} else {
		console.log('Ошибка! Функция принимает только строковое значение!');
	}
};

fixString('    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa     ');

