'use strict'

// const todoControl = document.querySelector('.todo-control'),
// 	headerInput = document.querySelector('.header-input'),
// 	todoList = document.querySelector('.todo-list'),
// 	todoCompleted = document.querySelector('.todo-completed'),
// 	btnSubmit = document.querySelector('.header-button');

// let data = [];
// if (localStorage.getItem('ToDo')) { data = JSON.parse(localStorage.getItem('ToDo')) }

// const render = () => {
// 	todoList.textContent = ''
// 	todoCompleted.textContent = ''

// 	data.forEach((el) => {
// 		const li = document.createElement('li')
// 		li.classList.add('todo-item')
// 		li.innerHTML = `
// 			<span class="text-todo">${el.value}</span>
// 			<div class="todo-buttons">
// 				<button class="todo-remove"></button>
// 				<button class="todo-complete"></button>
// 			</div>`;

// 		(el.completed) ? todoCompleted.prepend(li) : todoList.prepend(li);


// 		const done = li.querySelector('.todo-complete'),
// 			remove = li.querySelector('.todo-remove');

// 		done.addEventListener('click', () => {
// 			li.style.animation = 'do 1s forwards'
// 			el.completed = !el.completed

// 			localStorage.setItem('ToDo', JSON.stringify(data))
// 			render()
// 		})

// 		remove.addEventListener('click', () => {
// 			li.classList.add('hidden')
// 			setTimeout(() => { li.remove() }, 1000)

// 			data.forEach((prop, index) => { if (prop === el) { data.splice(index, 1) } })
// 			localStorage.setItem('ToDo', JSON.stringify(data))
// 		})
// 	})
// }



// const collector = () => {
// 	const newToDo = { value: headerInput.value, completed: false, }
// 	data.push(newToDo)

// 	localStorage.setItem('ToDo', JSON.stringify(data))
// 	headerInput.value = ''
// 	btnSubmit.classList.add('submit')
// 	setTimeout(() => { btnSubmit.classList.remove('submit') }, 500)

// 	render()
// }

// todoControl.addEventListener('submit', (event) => {
// 	event.preventDefault();

// 	if (headerInput.value.trim() === '') {
// 		headerInput.classList.add('valid')
// 		setTimeout(() => { headerInput.classList.remove('valid') }, 500)
// 	} else collector()
// })

// render()





class ToDo {
	constructor(form, input, todoList, todoCom, container, btnCom, btnDel) {
		this.form = document.querySelector(form)
		this.input = document.querySelector(input)
		this.todoList = document.querySelector(todoList)
		this.todoCom = document.querySelector(todoCom)
		this.container = document.querySelector(container)
		this.btnCom = document.querySelector(btnCom)
		this.btnDel = document.querySelector(btnDel)
		this.todoData = new Map(JSON.parse(localStorage.getItem('list')))
	}

	addToStorage() {
		localStorage.setItem('list', JSON.stringify([...this.todoData]))
	}

	render() {
		this.todoList.textContent = ''
		this.todoCom.textContent = ''
		this.todoData.forEach(this.createItem, this)
		this.addToStorage()
	}

	createItem(item) {
		const li = document.createElement('li')
		li.classList.add('todo-item')
		li.insertAdjacentHTML('beforeend', `
				<span class="text-todo">${item.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>`);

		(item.completed) ? this.todoCom.append(li) : this.todoList.append(li)
	}


	addTodo(e) {
		e.preventDefault()

		if (this.input.value.trim()) {
			const newTodo = { value: this.input.value, completed: false, key: this.generateKey(), }
			this.todoData.set(newTodo.key, newTodo)
			this.render()
		}
	}

	handler() {
		this.container.addEventListener('click', el => this.deleteItem(el.target))
	}

	deleteItem(el) {
		if (el.className === 'todo-remove') {
			const li = el.parentNode.parentNode
			li.classList.add('hidden')
			setTimeout(() => { li.remove() }, 1000)



		}

	}

	completedItem() {

	}

	generateKey() {
		return Math.random().toString(36).substring(2, 15)
	}

	init() {
		this.form.addEventListener('submit', this.addTodo.bind(this))
		this.handler()
		this.render()

	}
}


const newList = new ToDo(
	'.todo-control',
	'.header-input',
	'.todo-list',
	'.todo-completed',
	'.todo-container',
	'.todo-complete',
	'.todo-remove')

newList.init()
// newList.handler()