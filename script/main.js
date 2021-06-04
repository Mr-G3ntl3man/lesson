'use strict';

const isNum = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const bot = (value) => {
	const num = value;

	const game = () => {
		let start = prompt('Угадай число от 1 до 100', 50);
		if (start === null) {
			alert('Игра окончена');
			return;
		} else if (isNum(start)) {
			if (+start === num) {
				alert('Поздравляю, Вы угадали!!!');
				return;
			} else if (+start > num) {
				alert('Загаданное число меньше');
			} else if (+start < num) {
				alert('Загаданное число больше');
			}
		} else {
			alert('Введи число!');
		}
		game();
	};

	return game();
};

bot(42);