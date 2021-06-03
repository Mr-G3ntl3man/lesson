'use strict';

const income = 'фриланс',
	period = 1,
	mission = 300000;

let money,
	addExpenses = [];


const isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = () => {
	do {
		money = +prompt('Ваш месячный доход?', '100000');
	} while (!isNumber(money));
	return money;
};
start();

const getExpensesMonth = () => {
	let sum = 0,
		amount;

	for (let i = 0; i < 2; i++) {
		addExpenses[i] = prompt('Введите обязательную статью расходов?');

		do {
			amount = +prompt('Во сколько это обойдется?', '1000');
		} while (!isNumber(amount));

		sum += amount;
	}
	return sum;
};

const expensesAmount = getExpensesMonth(),
	deposit = confirm('Есть ли у вас депозит в банке?');

const getAccumulatedMonth = (money) => {
	return money - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth(money),
	missionMonth = mission / accumulatedMonth,
	budgetDay = accumulatedMonth / 30;

const getTargetMonth = (val) => {
	const res = val / accumulatedMonth;
	if (res < 0) {
		return `Цель не будет достигнута`;
	} else {
		return `Цель будет достигнута ${Math.ceil(res)} месяца`;
	}
};

const getStatusIncome = (budget) => {
	if (budget >= 1200) {
		return ('У вас высокий уровень дохода');
	} else if (budget >= 600 && budget <= 1200) {
		return ('У вас средний уровень дохода');
	} else if (budget <= 600 && budget >= 0) {
		return ('К сожалению у вас уровень дохода ниже среднего');
	} else {
		return ('Что то пошло не так');
	}
};

const showTypeOf = (data) => {
	console.log(data, typeof (data));
};


showTypeOf(money);

console.log(`Расходов за месяц => ${expensesAmount}`);

console.log(addExpenses);

console.log(getTargetMonth(mission));

console.log(`Бюджет на день => ${Math.floor(budgetDay)}`);

console.log(`Проверка бюджета => ${getStatusIncome(budgetDay)}`);

