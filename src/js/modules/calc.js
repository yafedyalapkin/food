function calc() {
    // создаю калькулятор ===================================================================================================

    const result = document.querySelector('.calculating__result span'); // 1. получаю результат калорий

    let sex, height, weight, age, ratio; // 2. получаю все значения для вычислений: пол, рост, вес, возраст, активность





    if (localStorage.getItem('sex')) { // при повторном посещении сайта - если в хранилище есть ключ sex
        sex = localStorage.getItem('sex'); // записываю в переменную sex значение из хранилища
    } else {
        sex = 'female'; // иначе записываю значение по дефолту
        localStorage.setItem('sex', 'female'); // и дублюрую в хранилище
    }


    if (localStorage.getItem('ratio')) { // если в хранилище есть ключ ratio
        ratio = localStorage.getItem('ratio'); // записываю в переменную ratio значение из хранилища
    } else {
        ratio = 1.375; // иначе записываю значение по дефолту
        localStorage.setItem('ratio', 1.375); // и дублюрую в хранилище
    }



    // пишу функ котрая будут запоминать то что ввел юзер: пол и уровень активности
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => { // 
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) { // если значение айди html-элемента равно значению пола из хранилища
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { // если значение атрибута html-элемента равно значению уровня активности из хранилища 
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); // вызываю
    initLocalSettings('#gender div', 'calculating__choose-item_active'); // вызываю







    // 3. пишу функцию расчета калорий
    function calcTotal() {

        if (!sex || !height || !weight || !age || !ratio) { // 3.1 если хоть какое-то значение фолс (пустое)
            result.textContent = '___';
            return; // досрочно прерываю функ, чтобы след шаги на выполнялись
        }

        if (sex === 'female') { // 3.2 если женщина 
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }

        if (sex === 'male') { // 3.3 если мужчина
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };

    calcTotal(); // 4. вызываю функ 




    // 5. пишу функцию для получения и записи значений элементов родителя кнопок: gender и calculating__choose_big
    function getStaticInformation(selector, activeClass) {

        const elements = document.querySelectorAll(selector); // 5.1 получаю элементы 

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => { // 5.2 вешаю клики на элементы

                if (e.target.getAttribute('data-ratio')) { // 5.3 если элемент на который кликнули имеет такой атрибут (тру)
                    ratio = +e.target.getAttribute('data-ratio') // 5.4 записываю в ratio значение атрибута в числом виде


                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // отправляю в хранилище ключ значение
                } else {
                    sex = e.target.getAttribute('id'); // 5.5 иначе записываю в пол значение атрибута id


                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass); // 5.6 удаляю у всех элементов классы активности
                });
                e.target.classList.add(activeClass); // 5.7 добавляю класс активности на кликнутый элемент

                calcTotal(); // 5.8 вызываю главную функ расчета калорий после каждого клика

            });
        })
    }

    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // 6. вызываю функ для кнопок активности 
    getStaticInformation('#gender div', 'calculating__choose-item_active'); // 7. вызываю функ для gender





    // 8. пишу функ для получения и записи значений 3-х инпутов: рост, вес, возраст
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector); // 8.1 получаю элемент (инпут)


        input.addEventListener('input', () => { // 8.2 вешаю событие ввода на элем


            if (input.value.match(/\D/g)) { // если юзер ввел не цифры
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }


            switch (input.getAttribute('id')) { // 8.3 для каждого элемента, если значение айди :
                case 'height':
                    height = +input.value; // записываю в переменную рост
                    break; // прерываю
                case 'weight':
                    weight = +input.value; // записываю в переменную вес
                    break; // прерываю
                case 'age':
                    age = +input.value; // записываю в переменную возраст
                    break; // прерываю
            }

            calcTotal(); // 8.4. вызываю главную функ расчета калорий после каждого ввода в инпут
        });

    }
    getDynamicInformation('#height'); // 9. вызываю функ для айди рост
    getDynamicInformation('#weight'); // 10. вызываю функ для айди вес
    getDynamicInformation('#age'); // 11. вызываю функ для айди возраст


}

module.exports = calc;