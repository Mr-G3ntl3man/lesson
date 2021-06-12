'use strict'

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed');


const data = [];

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
			el.completed = !el.completed
			render()
		})

		remove.addEventListener('click', () => {
			li.remove();
			data.forEach((prop, index) => { if (prop === el) { data.splice(index, 1) } })
		})


	})
}



todoControl.addEventListener('submit', (event) => {
	event.preventDefault()

	if (headerInput.value.trim() === '') {
		headerInput.style.border = '1px solid red'
	} else {
		headerInput.style.border = 'none'
		const newToDo = {
			value: headerInput.value,
			completed: false,
		}
		data.push(newToDo)
		headerInput.value = ''
		render()
	}
})

render()