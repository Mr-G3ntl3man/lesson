const response = () => {
	const usdRub = 'https://free.currconv.com/api/v7/convert?q=USD_RUB,RUB_USD&compact=ultra&apiKey=a9aa722e8b880cf65be8',
		eurRub = 'https://free.currconv.com/api/v7/convert?q=EUR_RUB,RUB_EUR&compact=ultra&apiKey=a9aa722e8b880cf65be8',
		usdEur = 'https://free.currconv.com/api/v7/convert?q=EUR_USD,USD_EUR&compact=ultra&apiKey=a9aa722e8b880cf65be8'

	const currency = []

	fetch(eurRub)
		.then(response => response.json())
		.then(response => currency.push({ ...response }))

	fetch(usdRub)
		.then(response => response.json())
		.then(response => currency.push({ ...response }))

	fetch(usdEur)
		.then(response => response.json())
		.then(response => currency.push({ ...response }))

	return currency
}

const currency = response()

const selectLeft = document.querySelector('.select-left'),
	selectRight = document.querySelector('.select-right'),
	inputLeft = document.querySelector('.input-left'),
	inputRight = document.querySelector('.input-right')

inputLeft.addEventListener('input', () => {
	currency.forEach(el => {
		if (el[`${selectLeft.value}_${selectRight.value}`] !== undefined) {
			inputRight.value = (inputLeft.value * el[`${selectLeft.value}_${selectRight.value}`]).toFixed(4)
		}
	})
})


