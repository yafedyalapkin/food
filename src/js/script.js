'use strict';

document.addEventListener('DOMContentLoaded', () => {



	// require() — это функция для размещения внешних модулей, которые существуют в отдельных файлах
	const tabs = require('./modules/tabs'),
		modal = require('./modules/modal'),
		timer = require('./modules/timer'),
		cards = require('./modules/cards'),
		calc = require('./modules/calc'),
		forms = require('./modules/forms'),
		slider = require('./modules/slider');



	tabs();
	modal();
	timer();
	cards();
	calc();
	forms();
	slider();






});