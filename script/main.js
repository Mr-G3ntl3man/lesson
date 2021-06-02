'use strict';

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

let money,
	expenses = [];


const start = () => {
	do {
		money = +prompt('Ваш месячный доход?', '100000');
	} while (!isNumber(money));
	return money;
};
start();


const income = 'фриланс',
	period = 1,
	mission = 300000,
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
		'Квартплата, проездной, кредит'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	expensesAmount = getExpensesMonth(),
	accumulatedMonth = getAccumulatedMonth(money),
	missionMonth = mission / accumulatedMonth,
	budgetDay = accumulatedMonth / 30;


const showTypeOf = (data) => {
	console.log(data, typeof (data));
};


function getExpensesMonth() {
	let sum = 0;

	for (let i = 0; i < 2; i++) {
		expenses[i] = prompt('Введите обязательную статью расходов?');

		do {
			sum += +prompt('Во сколько это обойдется?', '100');
		} while (!isNumber(sum));
	}
	return sum;
}

function getAccumulatedMonth(money) {
	return money - expensesAmount;
}

function getTargetMonth(val) {
	const res = val / accumulatedMonth;
	if (res < 0) {
		return `Цель не будет достигнута`;
	} else {
		return `Цель будет достигнута ${Math.ceil(res)} месяца`;
	}
}

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



showTypeOf(money);

console.log(`Расходов за месяц => ${expensesAmount}`);

console.log(addExpenses.toLowerCase().split(','));

console.log(getTargetMonth(mission));

console.log(`Бюджет на день => ${Math.floor(budgetDay)}`);

console.log(`Проверка бюджета => ${getStatusIncome(budgetDay)}`);

