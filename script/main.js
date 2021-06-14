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
			this.getExpInc();
			this.getExpensesMonth();
			this.getBudget();
			this.getTargetMonth();
			this.calcSaveMoney();
			this.getAddExpInc();
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

	addBlock(el) {
		const nameBlock = el.className.split('-')[0],
			itemBlock = document.querySelector(`.${nameBlock}`),
			block = el.cloneNode(true);

		block.querySelectorAll('input').forEach(el => el.value = '');
		el.parentNode.insertBefore(block, itemBlock.lastElementChild);
		el = document.querySelectorAll(`.${nameBlock}-items`);

		if (el.length === 3) { itemBlock.lastElementChild.style.display = 'none' }
		if (el.length) { this.validRusNum() }
	}

	getExpInc() {
		const count = el => {
			const startStr = el.className.split('-')[0],
				itemTitle = document.querySelector(`input.${startStr}-title`).value,
				itemAmount = document.querySelector(`.${startStr}-amount`).value;
			if (itemTitle !== '' && itemAmount !== '') { this[startStr][itemTitle] = itemAmount }
		}
		expensesItem.forEach(count)
		incomeAmountItems.forEach(count)

		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}

	getAddExpInc() {
		const collector = el => {
			const start = el.className.split('_')[1],
				res = el.value.trim();

			if (res !== '') {
				res.split(',').forEach(e => {
					e = e.trim();
					(start === 'income-item') ? this.addIncome.push(e) : this.addExpenses.push(e);
				})
			}
		}
		collector(additionalItem)
		incomeItem.forEach(collector)
	}

	getExpensesMonth() {
		let sum = 0;

		for (let key in this.expenses) {
			sum += +this.expenses[key];
		}
		this.expensesMonth = sum;
	}

	getBudget() {
		const result = this.budget + this.incomeMonth - this.expensesMonth,
			budget = Math.floor(result / 30);

		this.budgetMonth = result;
		this.budgetDay = budget;
	}

	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth)
	}

	calcSaveMoney() {
		return this.budgetMonth * periodSelect.value
	}

	reset() {
		allInputLeft = document.querySelectorAll('.data input[type=text]');
		allInputLeft.forEach(el => { el.removeAttribute('disabled'), el.value = '' });
		allInputRight.forEach(el => el.value = '');

		btnReset.style.display = 'none';
		btnResult.style.display = 'block';
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
		btnIncome.addEventListener('click', () => this.addBlock(incomeAmountItems[0]));
		btnExpenses.addEventListener('click', () => this.addBlock(expensesItem[0]));
		periodSelect.addEventListener('input', () => document.querySelector('.period-amount').innerHTML = periodSelect.value);
	}
}


const appData = new AppData();
appData.eventsListeners();
