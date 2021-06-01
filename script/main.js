'use strict';

let showString = (arg) => {
	if (typeof arg === 'string') {
		const a = arg.trim();
		(a.length > 30) ? console.log(`${a.substring(0, 30)}...`) : console.log(a);
	} else {
		console.log('Введите строку!');
	}
};

showString('       aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa                ');