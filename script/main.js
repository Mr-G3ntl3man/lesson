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
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	period: 5,
	income: {},
	expenses: {},
	addExpenses: [],

	asking() {
		let costAmount,
			expenses,
			itemIncome,
			cashIncome,
			possibleExpenses;

		possibleExpenses = prompt('Перечислите возможные расходы?', 'Пить, кушать, гулять');
		this.addExpenses.push(possibleExpenses.toLowerCase().split(','));

		if (confirm('Если ли у вас доп. заработок?')) {
			do {
				itemIncome = prompt('Какой у вас дополнительный заработок?', 'Попрошайничаю');
			} while (isNumber(itemIncome));

			do {
				cashIncome = prompt('Сколько зарабатываете на это?', 100);
			} while (!isNumber(cashIncome));

			this.income[itemIncome] = cashIncome;
		}

		for (let i = 0; i < 2; i++) {
			do {
				expenses = prompt('Введите обязательную статью расходов?');
			} while (isNumber(expenses))

			do {
				costAmount = +prompt('Во сколько это обойдется?', '1000');
			} while (!isNumber(costAmount));

			this.expenses[expenses] = costAmount;
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
		const result = this.budget - this.getExpensesMonth(),
			budget = Math.floor(result / 30);

		this.budgetMonth = result;
		this.budgetDay = budget;
	},

	getTargetMonth() {
		const result = this.mission / this.budgetMonth;
		if (result < 0) {
			return `Цель не будет достигнута`;
		} else {
			return `Цель будет достигнута ${Math.ceil(result)} месяцев (-а)`;
		}
	},

	getStatusIncome() {
		if (this.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода');
		} else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
			return ('У вас средний уровень дохода');
		} else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
			return ('К сожалению у вас уровень дохода ниже среднего');
		} else {
			return ('Что то пошло не так');
		}
	},

	getInfoDeposit() {
		this.deposit = confirm('Есть ли у вас депозит в банке?');

		if (this.deposit) {
			do {
				this.percentDeposit = prompt('Какой годовой процент?', 42);
			} while (!isNumber(this.percentDeposit));

			do {
				this.moneyDeposit = prompt('Какая сумма заложена?', 42000);
			} while (!isNumber(this.moneyDeposit));
		}
	},
	calcSaveMoney() {
		return this.budgetMonth * this.period;
	},
}

appData.asking();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();
appData.calcSaveMoney();


console.log(`Расходов за месяц => ${appData.getExpensesMonth()}`);

console.log(appData.getTargetMonth());

console.log(`Уровень дохода => ${appData.getStatusIncome()}`);


const newExpenses = String(appData.addExpenses).split(', ').map(el => el[0].toUpperCase() + el.substring(1)).join(', ');

console.log(newExpenses)


// for (let key in appData) { console.log(`Наша программа включает в себя данные: Свойсво => ${key}  Значение => ${appData[key]}`); }