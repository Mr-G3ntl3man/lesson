'use strict'

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed'),
	btnSubmit = document.querySelector('.header-button');

let data = [];
if (localStorage.getItem('ToDo')) { data = JSON.parse(localStorage.getItem('ToDo')) }

const render = () => {
	todoList.textContent = ''
	todoCompleted.textContent = ''

	data.forEach((el) => {
		const li = document.createElement('li')
		li.classList.add('todo-item')
		li.innerHTML = `
			<span class="text-todo">${el.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>`;

		(el.completed) ? todoCompleted.prepend(li) : todoList.prepend(li);


		const done = li.querySelector('.todo-complete'),
			remove = li.querySelector('.todo-remove');

		done.addEventListener('click', () => {
			li.style.animation = 'do 1s forwards'
			el.completed = !el.completed

			localStorage.setItem('ToDo', JSON.stringify(data))
			render()
		})

		remove.addEventListener('click', () => {
			li.classList.add('hidden')
			setTimeout(() => { li.remove() }, 1000)

			data.forEach((prop, index) => { if (prop === el) { data.splice(index, 1) } })
			localStorage.setItem('ToDo', JSON.stringify(data))
		})
	})
}



const collector = () => {
	const newToDo = { value: headerInput.value, completed: false, }
	data.push(newToDo)

	localStorage.setItem('ToDo', JSON.stringify(data))
	headerInput.value = ''
	btnSubmit.classList.add('submit')
	setTimeout(() => { btnSubmit.classList.remove('submit') }, 500)

	render()
}

todoControl.addEventListener('submit', (event) => {
	event.preventDefault();

	if (headerInput.value.trim() === '') {
		headerInput.classList.add('valid')
		setTimeout(() => { headerInput.classList.remove('valid') }, 500)
	} else collector()
})

render()