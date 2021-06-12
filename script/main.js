'use strict';

const btnResult = document.getElementById('start'),
	btnIncome = document.getElementsByTagName('button')[0],
	btnExpenses = document.getElementsByTagName('button')[1],
	checkDeposit = document.querySelector('#deposit-check'),
	incomeItem = document.querySelectorAll('.additional_income-item'),
	resultBudgetDay = document.getElementsByClassName('budget_day-value')[0],
	resultBudgetMonth = document.querySelector('.budget_month-value'),
	resultExpensesMonth = document.getElementsByClassName('expenses_month-value')[0],
	resultAdditionalIncome = document.getElementsByClassName('additional_income-value')[0],
	resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value')[0],
	resultIncomePeriod = document.getElementsByClassName('income_period-value')[0],
	resultTargetMonth = document.getElementsByClassName('target_month-value')[0],
	salary = document.querySelector('.salary-amount'),
	incomeName = document.querySelector('input.income-title'),
	expensesName = document.querySelector('input.expenses-title'),
	additionalItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select');

let expensesItem = document.querySelectorAll('.expenses-items'),
	incomeAmountItems = document.querySelectorAll('.income-items'),
	allInputRus = document.querySelectorAll('.data input[placeholder=Наименование]'),
	allInputNum = document.querySelectorAll('.data input[placeholder=Сумма]');

const isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const appData = {
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	incomeMonth: 0,
	income: {},
	expenses: {},
	addExpenses: [],
	addIncome: [],

	start() {
		appData.budget = +salary.value;
		appData.getExpenses();
		appData.getIncome();
		appData.getTargetMonth();
		appData.getAddExpenses();
		appData.calcSaveMoney();
		appData.getAddIncome();
		appData.getBudget();
		appData.showResult();
	},

	showResult() {
		resultBudgetMonth.value = this.budgetMonth;
		resultBudgetDay.value = this.budgetDay;
		resultExpensesMonth.value = this.expensesMonth;
		resultAdditionalExpenses.value = this.addExpenses.join(', ');
		resultAdditionalIncome.value = this.addIncome.join(', ');
		resultTargetMonth.value = this.getTargetMonth();
		resultIncomePeriod.value = this.calcSaveMoney();

		periodSelect.addEventListener('input', function () { resultIncomePeriod.value = this.budgetMonth * periodSelect.value }.bind(appData));
	},

	addExpensesBlock() {

		let cloneExpensesItem = expensesItem[0].cloneNode(true);
		cloneExpensesItem.querySelectorAll('input').forEach(function (el) { el.value = '' });
		expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
		expensesItem = document.querySelectorAll('.expenses-items');

		if (expensesItem.length === 3) { btnExpenses.style.display = 'none' }
		if (expensesItem.length) { appData.validRusNum() }
	},

	addIncomeBlock() {
		const cloneIncomeItem = incomeAmountItems[0].cloneNode(true);
		cloneIncomeItem.querySelectorAll('input').forEach(function (el) { el.value = '' });
		incomeAmountItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);
		incomeAmountItems = document.querySelectorAll('.income-items');

		if (incomeAmountItems.length === 3) { btnIncome.style.display = 'none' }
		if (incomeAmountItems.length) { appData.validRusNum() }
	},

	getExpenses() {
		expensesItem.forEach(function (el) {
			let itemExpenses = el.querySelector('.expenses-title').value,
				cashExpenses = el.querySelector('.expenses-amount').value;

			if (itemExpenses !== '' && cashExpenses !== '') { this.expenses[itemExpenses] = cashExpenses }
		}.bind(appData));
	},

	getIncome() {


		incomeAmountItems.forEach(function (el) {
			let itemsIncome = el.querySelector('input.income-title').value,
				cashIncome = el.querySelector('.income-amount').value;

			if (itemsIncome !== '' && cashIncome !== '') { this.income[itemsIncome] = cashIncome }
		}.bind(appData));

		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	},

	getAddExpenses() {
		const anyExpenses = additionalItem.value.split(',');
		anyExpenses.forEach(function (el) {
			el = el.trim();
			if (el !== '') { this.addExpenses.push(el) }
		}.bind(appData))
	},

	getAddIncome() {
		incomeItem.forEach(function (el) {
			const elValue = el.value.trim();
			if (elValue !== '') { this.addIncome.push(elValue) }
		}.bind(appData));
	},

	getExpensesMonth() {
		let sum = 0;

		for (let key in this.expenses) {
			sum += +this.expenses[key];
		}
		return this.expensesMonth = sum;
	},

	getBudget() {
		const result = this.budget + this.incomeMonth - this.getExpensesMonth(),
			budget = Math.floor(result / 30);

		this.budgetMonth = result;
		this.budgetDay = budget;
	},

	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	},

	calcSaveMoney() {
		return this.budgetMonth * periodSelect.value;
	},

	validRusNum() {
		allInputNum = document.querySelectorAll('.data input[placeholder=Сумма]');
		allInputRus = document.querySelectorAll('.data input[placeholder=Наименование]');

		allInputRus.forEach((el) => {
			el.addEventListener('keyup', function () {
				el.value = el.value.replace(/[^а-я , А-Я]/g, '');
			});
		});

		allInputNum.forEach((el) => {
			el.addEventListener('keyup', function () {
				el.value = el.value.replace(/[^\d]/g, '');
			});
		});
	},
};

appData.validRusNum();
btnExpenses.addEventListener('click', appData.addExpensesBlock);
btnIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () { document.querySelector('.period-amount').innerHTML = periodSelect.value; });
btnResult.addEventListener('click', function () {
	if (salary.value === '') {
		salary.style.border = '2px solid red';
	} else if (!isNumber(salary.value)) {
		salary.style.border = '2px solid red';
	} else {
		appData.start();
		salary.style.border = '1px solid #ff7f63';
		btnResult.style.opacity = '0.5';
		btnResult.style.cursor = 'default';
		btnResult.disabled = true;
	}
});





