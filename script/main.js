'use strict';

const btnResult = document.getElementById('start'),
	btnIncome = document.getElementsByTagName('button')[0],
	btnExpenses = document.getElementsByTagName('button')[1],
	checkDeposit = document.querySelector('#deposit-check'),
	incomeItem = document.querySelectorAll('.additional_income-item'),
	resultItem = Array.from(document.querySelectorAll('.result .result-total')),
	shiftResultIyem = resultItem.shift(),
	salary = document.querySelector('.salary-amount'),
	incomeName = document.querySelector('.income-title'),
	incomeAmount = document.querySelector('.income-amount'),
	expensesName = document.querySelector('.expenses-title'),
	expensesAmount = document.querySelector('.expenses-amount'),
	additionalItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodSelect = document.querySelector('.period-select');








