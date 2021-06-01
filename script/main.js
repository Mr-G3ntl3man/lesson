"use strict";

const income = 'фриланс',
	period = 1,
	mission = 300000,
	money = +prompt('Ваш месячный доход?', '100000'),
	addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
		'Квартплата, проездной, кредит'),
	deposit = confirm('Есть ли у вас депозит в банке?'),
	expenses1 = prompt('Введите обязательную статью расходов?'),
	amount1 = +prompt('Во сколько это обойдется?', '100'),
	expenses2 = prompt('Введите обязательную статью расходов?'),
	amount2 = +prompt('Во сколько это обойдется?', '100'),
	accumulatedMonth = getAccumulatedMonth(money),
	missionMonth = mission / accumulatedMonth,
	budgetDay = accumulatedMonth / 30;


const showTypeOf = (data) => {
	console.log(data, typeof (data));
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


function getExpensesMonth(val1, val2) {
	return val1 + val2;
}

function getAccumulatedMonth(money) {
	return money - getExpensesMonth(amount1, amount2);
}

function getTargetMonth(val) {
	return val / accumulatedMonth;
}


showTypeOf(money);

console.log(`Расходов за месяц => ${getExpensesMonth(amount1, amount2)}`);

console.log(addExpenses.toLowerCase().split(','));

console.log(`Цель будет достигнута за => ${Math.ceil(getTargetMonth(mission))} месяцев (-а)`);

console.log(`Бюджет на день => ${Math.floor(budgetDay)}`);

console.log(`Проверка бюджета => ${getStatusIncome(budgetDay)}`);

