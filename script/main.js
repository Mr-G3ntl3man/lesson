'use strict';

const input = document.querySelector('input'),
	p = document.querySelector('p')


const debounce = (fn, ms) => {
	let timeout

	return function () {
		const callFn = () => fn.apply(this)

		clearTimeout(timeout)

		timeout = setTimeout(callFn, ms)
	}
}

const write = () => {
	p.innerHTML = input.value
}

const debounceWrite = debounce(write, 300)


input.addEventListener('input', debounceWrite)