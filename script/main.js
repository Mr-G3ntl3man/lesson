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


const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);


class AppData {
	constructor() {
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
	}

	start() {
		if (salary.value === '') {
			salary.style.border = '2px solid red';
		} else {
			allInputLeft = document.querySelectorAll('.data input[type=text]');
			allInputLeft.forEach(el => el.setAttribute("disabled", "disabled"));

			salary.style.border = '1px solid #ff7f63';
			btnResult.style.display = 'none';
			btnReset.style.display = 'block';

			this.budget = +salary.value;
			this.getExpenses();
			this.getIncome();
			this.getTargetMonth();
			this.getAddExpenses();
			this.calcSaveMoney();
			this.getAddIncome();
			this.getBudget();
			this.showResult();
		}
	}

	showResult() {
		resultBudgetMonth.value = this.budgetMonth;
		resultBudgetDay.value = this.budgetDay;
		resultExpensesMonth.value = this.expensesMonth;
		resultAdditionalExpenses.value = this.addExpenses.join(', ');
		resultAdditionalIncome.value = this.addIncome.join(', ');
		resultTargetMonth.value = this.getTargetMonth();
		resultIncomePeriod.value = this.calcSaveMoney();
		periodSelect.addEventListener('input', () => resultIncomePeriod.value = this.budgetMonth * periodSelect.value);
	}

	addExpensesBlock() {
		const cloneExpensesItem = expensesItem[0].cloneNode(true);
		cloneExpensesItem.querySelectorAll('input').forEach(el => el.value = '');

		expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);
		expensesItem = document.querySelectorAll('.expenses-items');

		if (expensesItem.length === 3) { btnExpenses.style.display = 'none' }
		if (expensesItem.length) { this.validRusNum() }
	}

	addIncomeBlock() {
		const cloneIncomeItem = incomeAmountItems[0].cloneNode(true);
		cloneIncomeItem.querySelectorAll('input').forEach(el => el.value = '');

		incomeAmountItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);
		incomeAmountItems = document.querySelectorAll('.income-items');

		if (incomeAmountItems.length === 3) { btnIncome.style.display = 'none' }
		if (incomeAmountItems.length) { this.validRusNum() }
	}

	getExpenses() {
		expensesItem.forEach(el => {
			let itemExpenses = el.querySelector('.expenses-title').value,
				cashExpenses = el.querySelector('.expenses-amount').value;

			if (itemExpenses !== '' && cashExpenses !== '') { this.expenses[itemExpenses] = cashExpenses }
		});
	}

	getIncome() {
		incomeAmountItems.forEach(el => {
			let itemsIncome = el.querySelector('input.income-title').value,
				cashIncome = el.querySelector('.income-amount').value;

			if (itemsIncome !== '' && cashIncome !== '') { this.income[itemsIncome] = cashIncome }
		});
		for (const key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}

	getAddExpenses() {
		const anyExpenses = additionalItem.value.split(',');
		anyExpenses.forEach(el => {
			el = el.trim();
			if (el !== '') { this.addExpenses.push(el) }
		});
	}

	getAddIncome() {
		incomeItem.forEach(el => {
			const elValue = el.value.trim();
			if (elValue !== '') { this.addIncome.push(elValue) }
		});
	}

	getExpensesMonth() {
		let sum = 0;

		for (let key in this.expenses) {
			sum += +this.expenses[key];
		}
		return this.expensesMonth = sum;
	}

	getBudget() {
		const result = this.budget + this.incomeMonth - this.getExpensesMonth(),
			budget = Math.floor(result / 30);

		this.budgetMonth = result;
		this.budgetDay = budget;
	}

	getTargetMonth() { return Math.ceil(targetAmount.value / this.budgetMonth) }

	calcSaveMoney() { return this.budgetMonth * periodSelect.value }

	reset() {
		allInputLeft = document.querySelectorAll('.data input[type=text]');
		allInputLeft.forEach(el => { el.removeAttribute('disabled'), el.value = '' });
		allInputRight.forEach(el => el.value = '');

		btnReset.style.display = 'none';
		btnResult.style.display = 'block';

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
	}

	validRusNum() {
		allInputNum = document.querySelectorAll('.data input[placeholder=Сумма]');
		allInputRus = document.querySelectorAll('.data input[placeholder=Наименование]');

		allInputRus.forEach(el => {
			el.addEventListener('keyup', () => {
				el.value = el.value.replace(/[^а-я , А-Я]/g, '');
			});
		});

		allInputNum.forEach(el => {
			el.addEventListener('keyup', () => {
				el.value = el.value.replace(/[^\d]/g, '');
			});
		});
	}

	eventsListeners() {
		this.validRusNum();
		btnReset.addEventListener('click', this.reset.bind(this));
		btnResult.addEventListener('click', this.start.bind(this));
		btnIncome.addEventListener('click', this.addIncomeBlock.bind(this));
		btnExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
		periodSelect.addEventListener('input', () => document.querySelector('.period-amount').innerHTML = periodSelect.value);
	}
}


const appData = new AppData();
appData.eventsListeners();
