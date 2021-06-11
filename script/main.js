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
	periodSelect = document.querySelector('.period-select'),
	allInputRight = document.querySelectorAll('.result input[type=text]'),
	btnReset = document.querySelector('#cancel');


let expensesItem = document.querySelectorAll('.expenses-items'),
	incomeAmountItems = document.querySelectorAll('.income-items'),
	allInputLeft = document.querySelectorAll('.data input[type=text]'),
	allInputNum = document.querySelectorAll('.data input[placeholder=Сумма]'),
	allInputRus = document.querySelectorAll('.data input[placeholder=Наименование]');


const isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};


const AppData = function () {
	this.budget = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.expensesMonth = 0;
	this.deposit = false;
	this.percentDeposi = 0;
	this.moneyDeposi = 0;
	this.incomeMonth = 0;
	this.income = {};
	this.expenses = {};
	this.addExpenses = [];
	this.addIncome = [];
};

AppData.prototype.start = function () {
	this.budget = +salary.value;
	this.valid();
	this.getExpenses();
	this.getIncome();
	this.getTargetMonth();
	this.getAddExpenses();
	this.calcSaveMoney();
	this.getAddIncome();
	this.getBudget();
	this.showResult();
};

AppData.prototype.showResult = function () {
	resultBudgetMonth.value = this.budgetMonth;
	resultBudgetDay.value = this.budgetDay;
	resultExpensesMonth.value = this.expensesMonth;
	resultAdditionalExpenses.value = this.addExpenses.join(', ');
	resultAdditionalIncome.value = this.addIncome.join(', ');
	resultTargetMonth.value = this.getTargetMonth();
	resultIncomePeriod.value = this.calcSaveMoney();
	periodSelect.addEventListener('input', function () { resultIncomePeriod.value = this.budgetMonth * periodSelect.value }.bind(this));
};

AppData.prototype.addExpensesBlock = function () {
	const cloneExpensesItem = expensesItem[0].cloneNode(true);
	cloneExpensesItem.querySelectorAll('input').forEach(function (el) { el.value = '' });
	expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
	expensesItem = document.querySelectorAll('.expenses-items');

	if (expensesItem.length === 3) { btnExpenses.style.display = 'none' }
	if (expensesItem.length) { AppData.prototype.validRusNum() }
};

AppData.prototype.addIncomeBlock = function () {
	const cloneIncomeItem = incomeAmountItems[0].cloneNode(true);
	cloneIncomeItem.querySelectorAll('input').forEach(function (el) { el.value = '' });
	incomeAmountItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);
	incomeAmountItems = document.querySelectorAll('.income-items');

	if (incomeAmountItems.length === 3) { btnIncome.style.display = 'none' }
	if (incomeAmountItems.length) { AppData.prototype.validRusNum() }
};

AppData.prototype.getExpenses = function () {
	expensesItem.forEach(function (el) {
		let itemExpenses = el.querySelector('.expenses-title').value,
			cashExpenses = el.querySelector('.expenses-amount').value;

		if (itemExpenses !== '' && cashExpenses !== '') { this.expenses[itemExpenses] = cashExpenses }
	}.bind(this));
};

AppData.prototype.getIncome = function () {
	incomeAmountItems.forEach(function (el) {
		let itemsIncome = el.querySelector('input.income-title').value,
			cashIncome = el.querySelector('.income-amount').value;

		if (itemsIncome !== '' && cashIncome !== '') { this.income[itemsIncome] = cashIncome }
	}.bind(this));

	for (let key in this.income) {
		this.incomeMonth += +this.income[key];
	}
};

AppData.prototype.getAddExpenses = function () {
	const anyExpenses = additionalItem.value.split(',');
	anyExpenses.forEach(function (el) {
		el = el.trim();
		if (el !== '') { this.addExpenses.push(el) }
	}.bind(this));
};

AppData.prototype.getAddIncome = function () {
	incomeItem.forEach(function (el) {
		const elValue = el.value.trim();
		if (elValue !== '') { this.addIncome.push(elValue) }
	}.bind(this));
};

AppData.prototype.getExpensesMonth = function () {
	let sum = 0;

	for (let key in this.expenses) {
		sum += +this.expenses[key];
	}
	return this.expensesMonth = sum;
};

AppData.prototype.getBudget = function () {
	const result = this.budget + this.incomeMonth - this.getExpensesMonth(),
		budget = Math.floor(result / 30);

	this.budgetMonth = result;
	this.budgetDay = budget;
};

AppData.prototype.getTargetMonth = function () {
	return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.calcSaveMoney = function () {
	return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
	allInputLeft = document.querySelectorAll('.data input[type=text]');
	allInputLeft.forEach(function (el) { el.removeAttribute('disabled'), el.value = '' });
	allInputRight.forEach(function (el) { el.value = ''; });
	btnReset.style.display = 'none';
	btnResult.style.display = 'block';
};

AppData.prototype.valid = function () {
	if (salary.value === '') {
		salary.style.border = '2px solid red';
	} else if (!isNumber(salary.value)) {
		salary.style.border = '2px solid red';
	} else {
		this.start();
		salary.style.border = '1px solid #ff7f63';
		allInputLeft.forEach(function (el) { el.setAttribute("disabled", "disabled") });
		btnResult.style.display = 'none';
		btnReset.style.display = 'block';
	}
};

AppData.prototype.validRusNum = function () {
	allInputNum = document.querySelectorAll('.data input[placeholder=Сумма]');
	allInputRus = document.querySelectorAll('.data input[placeholder=Наименование]');

	allInputRus.forEach(function (el) {
		el.addEventListener('keyup', function () {
			this.value = this.value.replace(/[^а-я , А-Я]/g, '');
		});
	});

	allInputNum.forEach(function (el) {
		el.addEventListener('keyup', function () {
			this.value = this.value.replace(/[^\d]/g, '');
		});
	});
};

AppData.prototype.eventsListeners = function () {
	btnReset.addEventListener('click', this.reset);
	btnResult.addEventListener('click', this.valid);
	btnIncome.addEventListener('click', this.addIncomeBlock);
	btnExpenses.addEventListener('click', this.addExpensesBlock);
	periodSelect.addEventListener('input', function () { document.querySelector('.period-amount').innerHTML = periodSelect.value; });
};

const appData = new AppData();
appData.validRusNum();
appData.eventsListeners();
