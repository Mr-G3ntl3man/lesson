let num = 266219;
let numArray = num.toString().split('');
let result = numArray.reduce((acc, res) => acc * res);

console.log(result);

console.log(`result pow 3 => ${String(result ** 3).slice(0, 2)}`);

