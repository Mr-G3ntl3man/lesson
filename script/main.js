'use strict';

let money;

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


const appData = {
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	mission: 300000,
	expenses: {},

	asking() {
		let costAmount,
			addExpenses;

		for (let i = 0; i < 2; i++) {
			addExpenses = prompt('Введите обязательную статью расходов?');

			do {
				costAmount = +prompt('Во сколько это обойдется?', '1000');
			} while (!isNumber(costAmount));

			this.expenses[addExpenses] = costAmount;

		}
	},

	getExpensesMonth() {
		let sum = 0;
		for (let key in this.expenses) {
			sum += this.expenses[key]
		}
		return this.expensesMonth = sum;
	},

	getBudget() {
		return this.budget - this.getExpensesMonth();
	},

	getTargetMonth() {
		const ressult = this.mission / this.getBudget();
		if (ressult < 0) {
			return `Цель не будет достигнута`;
		} else {
			return `Цель будет достигнута ${Math.ceil(ressult)} месяцев (-а)`;
		}
	},

	getStatusIncome() {
		const budget = this.getBudget() / 30;
		if (budget >= 1200) {
			return ('У вас высокий уровень дохода');
		} else if (budget >= 600 && budget <= 1200) {
			return ('У вас средний уровень дохода');
		} else if (budget <= 600 && budget >= 0) {
			return ('К сожалению у вас уровень дохода ниже среднего');
		} else {
			return ('Что то пошло не так');
		}
	},

}

appData.asking();
appData.getBudget();
appData.getTargetMonth();


console.log(`Расходов за месяц => ${appData.getExpensesMonth()}`);

console.log(appData.getTargetMonth());

console.log(`Уровень дохода => ${appData.getStatusIncome()}`);

for (let key in appData) { console.log(`Наша программа включает в себя данные: Свойсво => ${key}  Значение => ${appData[key]}`); }