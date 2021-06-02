'use strict';

const arr = [2222, 333333, 444444, 555555, 222222, 555555, 444444];

arr.forEach((el) => {
	if (el.toString().startsWith('2') || el.toString().startsWith('4')) { console.log(el); }
});




for (let i = 2; i <= 100; i++) {
	let isPrime = true;

	for (let j = 2; j < i; j++) {
		if (i % j === 0 && i !== j) {
			isPrime = false;
		}
	}
	if (isPrime === true) {
		const n = i % 2 === 0;
		console.log(`${i} Делители этого числа: 1 и ${i}`);
	}
}