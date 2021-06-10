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
	incomeAmountItems = document.querySelectorAll('.income-items');

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
		this.budget = +salary.value;
		this.getExpenses();
		this.getIncome();
		this.getTargetMonth();
		this.getAddExpenses();
		this.calcSaveMoney();
		this.getAddIncome();
		this.getBudget();
		this.showResult();
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
		const cloneExpensesItem = expensesItem[0].cloneNode(true);

		expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnExpenses);

		expensesItem = document.querySelectorAll('.expenses-items');

		if (expensesItem.length === 3) { btnExpenses.style.display = 'none' }
	},

	addIncomeBlock() {
		const cloneIncomeItem = incomeAmountItems[0].cloneNode(true);

		incomeAmountItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncome);

		incomeAmountItems = document.querySelectorAll('.income-items');

		if (incomeAmountItems.length === 3) { btnIncome.style.display = 'none' }
	},

	getExpenses() {
		expensesItem.forEach(function (el) {
			let itemExpenses = el.querySelector('.expenses-title').value,
				cashExpenses = el.querySelector('.expenses-amount').value;

			if (itemExpenses !== '' && cashExpenses !== '') { this.expenses[itemExpenses] = cashExpenses }
		});
	},

	getIncome() {
		incomeAmountItems.forEach(function (el) {
			let itemsIncome = el.querySelector('input.income-title').value,
				cashIncome = el.querySelector('.income-amount').value;

			if (itemsIncome !== '' && cashIncome !== '') { this.income[itemsIncome] = cashIncome }
		});

		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	},

	getAddExpenses() {
		const anyExpenses = additionalItem.value.split(',');
		anyExpenses.forEach(function (el) {
			el = el.trim();
			if (el !== '') { this.addExpenses.push(el) }
		})
	},

	getAddIncome() {
		incomeItem.forEach((el) => {
			const elValue = el.value.trim();
			if (elValue !== '') { this.addIncome.push(elValue) }
		});
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
};

btnExpenses.addEventListener('click', appData.addExpensesBlock);
btnIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () { document.querySelector('.period-amount').innerHTML = periodSelect.value; });
btnResult.addEventListener('click', function () {
	if (salary.value === '') {
		salary.style.border = '2px solid red';
	} else if (!isNumber(salary.value)) {
		salary.style.border = '2px solid red';
	} else {
		appData.start.call(appData);
		salary.style.border = '1px solid #ff7f63';
		btnResult.style.opacity = '0.5';
		btnResult.style.cursor = 'default';
		btnResult.disabled = true;
	}
});












