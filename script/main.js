'use strict';

const isNum = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const bot = (value, attempts = 10) => {
	let num = value,
		count = attempts;

	const game = () => {
		let start = prompt('Угадай число от 1 до 100', 50);

		if (count === 0) {
			let b = confirm('Попытки закончились. Хотели бы сыграть еще?');
			if (b === true) {
				return bot(num, attempts);
			} else {
				alert('Игра окончена. Спасибо за игру!');
				return;
			}
		}

		if (start === null) {
			alert('Игра окончена');

			return;
		} else if (isNum(start)) {
			if (+start === num) {
				let a = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
				if (a === true) {
					return bot(num, attempts);
				} else {
					alert('Игра окончена. Спасибо за игру!');
					return;
				}
			} else if (+start > num) {
				alert(`Загаданное число меньше, осталось попыток ${count}`);
			} else if (+start < num) {
				alert(`Загаданное число больше, осталось попыток ${count}`);
			}
		} else {
			alert('Введи число!');
		}

		game(count--);
	};

	return game();
};


bot(42);