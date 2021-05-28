let num = 266219;

for (i = 1; i <= 3; i++) {
	num *= i;
	console.log(num);
	console.log(`num pow 3 => ${String(num ** 3).slice(0, 2)} `);
}