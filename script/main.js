"use strict";

let money = 0,
	income = 'фриланс',
	addExpenses = 'интернет, такси, коммуналка',
	deposit = false,
	mission = 300000,
	period = 1,
	budgetDay = money / 30;

console.log(typeof money);

console.log(typeof income);

console.log(typeof deposit);

console.log(addExpenses.length);

console.log(period === mission);

console.log(addExpenses.toLowerCase().split(','));

console.log(budgetDay);


// lesson_3
money = +prompt('Ваш месячный доход?', '100000');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.',
	'Квартплата, проездной, кредит');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?'),
	amount1 = +prompt('Во сколько это обойдется?', '100'),
	expenses2 = prompt('Введите обязательную статью расходов?'),
	amount2 = +prompt('Во сколько это обойдется?', '100'),
	budgetMonth = money - (amount1 + amount2);

mission /= budgetMonth;


budgetDay = budgetMonth / 30;

console.log(`budgetMonth => ${budgetMonth}`);

console.log(`mission in months => ${Math.ceil(mission)}`);

console.log(`budgetDay => ${Math.floor(budgetDay)}`);

if (budgetDay >= 1200) {
	console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <= 1200) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay <= 600 && budgetDay >= 0) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
	console.log('Что то пошло не так');
}








