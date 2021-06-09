'use strict';

const book = document.querySelectorAll('.book'),
	spam = document.querySelector('.adv'),
	h2 = document.querySelectorAll('.book h2 a'),
	liBook = document.querySelectorAll('ul li');

book[0].before(book[1]);
book[0].after(book[4]);
book[4].after(book[3]);
book[3].after(book[5]);

document.body.style.background = 'url(image/you-dont-know-js.jpg)';

h2[4].innerHTML = 'Книга 3. this и Прототипы Объектов';

spam.remove();

liBook[3].after(liBook[2]);
liBook[3].after(liBook[6]);
liBook[6].after(liBook[8]);
liBook[8].after(liBook[4]);
liBook[4].after(liBook[5]);
liBook[9].after(liBook[2]);
liBook[47].after(liBook[55]);
liBook[55].after(liBook[49]);
liBook[49].after(liBook[50]);
liBook[48].after(liBook[52]);
liBook[52].after(liBook[53]);

console.log(liBook);
liBook[25].innerHTML = '<li>Глава 8: За пределами ES6</li>';
