const calcInput = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		total = document.querySelector('#total'),
		calcCount = document.querySelector('.calc-count')

	const countSum = () => {
		const typeValue = calcType.value,
			squareValue = calcSquare.value

		let res = 0,
			countValue = 1,
			dayValue = 1,
			counter = 0

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5
		}

		if (calcCount.value > 1) countValue += (calcCount.value - 1) / 10
		if (typeValue && squareValue) res = price * typeValue * squareValue * countValue

		const animCount = () => {
			const kef = Math.ceil((res + 1) / 2000)
			counter += 50 * kef

			const animId = requestAnimationFrame(animCount);
			(counter <= res) ? total.textContent = Math.ceil(counter) : cancelAnimationFrame(animId)
		}
		animCount()
	}

	calcBlock.addEventListener('input', el => {
		if (el.target.matches('select') || el.target.matches('input')) countSum()
	})
}

export default calcInput