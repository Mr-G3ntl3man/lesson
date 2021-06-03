'use strict';

const isNum = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const bot = (num, attempts = 10) => {
	let start = prompt('Угадай число от 1 до 100', 50);

	if (attempts === 0) {
		alert('Попытки закончились');
	}

	if (start === null) {
		alert('Игра окончена');
		return;
	} else if (isNum(start)) {
		if (+start === num) {
			let a = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
			if (a === true) {
				return bot(num, attempts--);
			} else {
				return;
			}
		} else if (+start > num) {
			alert(`Загаданное число меньше, осталось попыток ${attempts}`);
		} else if (+start < num) {
			alert(`Загаданное число больше, осталось попыток ${attempts}`);
		}
	} else {
		alert('Введи число!');
	}

	return bot(num, attempts--);
};


bot(42);