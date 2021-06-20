'use strict'


class ToDo {
	constructor(form, input, todoList, todoCom, container) {
		this.form = document.querySelector(form)
		this.input = document.querySelector(input)
		this.todoList = document.querySelector(todoList)
		this.todoCom = document.querySelector(todoCom)
		this.container = document.querySelector(container)
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
		if (this.input.value.trim() === '') {
			this.input.classList.add('valid')
			setTimeout(() => { this.input.classList.remove('valid') }, 500)
		} else {
			const newTodo = { value: this.input.value, completed: false, key: this.generateKey(), }
			this.todoData.set(newTodo.key, newTodo)
			this.input.value = ''
			this.render()
		}
	}

	handler() {
		this.container.addEventListener('click', el => {
			this.deleteItem(el.target)
			this.completedItem(el.target)
		})
	}

	deleteItem(el) {
		if (el.className === 'todo-remove') {
			const li = el.parentNode.parentNode,
				span = li.querySelector('span')

			li.classList.add('hidden')
			setTimeout(() => { li.remove() }, 1000)

			this.todoData.forEach((el, index, arr) => { if (span.textContent === el.value) arr.delete(index) })
			localStorage.setItem('list', JSON.stringify([...this.todoData]))
		}
	}

	completedItem(el) {
		if (el.className === 'todo-complete') {
			const li = el.parentNode.parentNode,
				span = li.querySelector('span')

			this.todoData.forEach(el => { if (span.textContent === el.value) el.completed = !el.completed })
			localStorage.setItem('list', JSON.stringify([...this.todoData]))
			this.render()
		}
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
	'.todo-container')

newList.init()
