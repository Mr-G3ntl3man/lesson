'use strict';

const isNum = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const bot = (num) => {
	return () => {
		let start = prompt('Угадай число от 1 до 100', 50);
		if (start === null) {
			alert('Игра окончена');
		} else if (isNum(start)) {
			if (+start === num) {
				alert('Поздравляю, Вы угадали!!!');
			} else if (+start > num) {
				alert('Загаданное число меньше');
				return foo();
			} else if (+start < num) {
				alert('Загаданное число больше');
				return foo();
			}
		} else {
			alert('Введи число!');
			return foo();
		}
	}

};

const foo = bot(42);

foo();
