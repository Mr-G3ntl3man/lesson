'use strict';

class Firs {
	hello() {
		console.log('Привет я метод родителя!')
	}
}

class Second extends Firs {
	hello() {
		super.hello()
		console.log('А я наследуемый метод')
	}
}

const bar = new Second()

bar.hello()