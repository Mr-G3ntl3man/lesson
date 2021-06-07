'use strict';

const btnResult = document.getElementById('start'),
	btnIncome = document.getElementsByTagName('button')[0],
	btnExpenses = document.getElementsByTagName('button')[1],
	checkDeposit = document.querySelector('#deposit-check'),
	incomeItem = document.querySelectorAll('.additional_income-item'),
	resultBudgetDay = document.getElementsByClassName('result-budget_day'),
	resultExpensesMonth = document.getElementsByClassName('result-expenses_month'),
	resultAdditionalIncome = document.getElementsByClassName('result-additional_income'),
	resultAdditionalExpenses = document.getElementsByClassName('result-additional_expenses'),
	resultIncomePeriod = document.getElementsByClassName('result-income_period'),
	resultTargetMonth = document.getElementsByClassName('result-target_month'),
	salary = document.querySelector('.salary-amount'),
	incomeName = document.querySelector('.income-title'),
	incomeAmount = document.querySelector('.income-amount'),
	expensesName = document.querySelector('.expenses-title'),
	expensesAmount = document.querySelector('.expenses-amount'),
	additionalItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select');








