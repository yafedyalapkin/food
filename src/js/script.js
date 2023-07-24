'use strict';


// 1. в папке модулес создаю отдельные файлы под разные разделы сайта со скриптами обтянутыми в функции. каждый модуль экспортирую
// 2. здесь импортирую (пронимаю) их
// 3. вызываю все модули после того как загрузится дом-дерево
// 4. скачиваю файл вебпак.конфиг.джс, настраиваю пути, запускаю 


import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';



document.addEventListener('DOMContentLoaded', () => {

	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal');
	timer('2023-09-10');
	cards();
	calc();
	forms();
	slider({
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
	});


});