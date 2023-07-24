function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // табы ============================================================================================================================

    // 1. получаю кнопки, родителя кнопок и то что сожержится в кнопках
    const tabs = document.querySelectorAll(tabsSelector), // 4 кнопки (таба)
        tabsContent = document.querySelectorAll(tabsContentSelector), // 4 контента для разных табов
        tabsParent = document.querySelector(tabsParentSelector); // родитель для 4 кнопок (табов)


    // 2. функция по скрытию контента для табов
    function hideTabContent() {

        tabsContent.forEach(item => { // скрываю в css
            // item.style.display = 'none';
            // или
            item.classList.add('hide'); // добавляю класс с display = 'none'
            item.classList.remove('show', 'fade'); // и удаляю  эти
        });

        tabs.forEach(tab => { // удаляю классы активности
            tab.classList.remove(activeClass);
        });
    }


    // 3. функция по показу контента для табов
    function showTabContent(i = 0) { // i - индекс таба по умолчанию
        // tabsContent[i].style.display = 'block';
        // или
        tabsContent[i].classList.add('show', 'fade'); // добавляю эти классы
        tabsContent[i].classList.remove('hide'); // и удаляю этот

        tabs[i].classList.add('tabheader__item_active'); // добавляю класс активности табу по индексу
    }



    // 4. вызываю функции, чтобы 1-ый таб был по-умолчанию
    hideTabContent(); // скрываю все контенты для табов
    showTabContent(); // показываю 1-ый контент, потому что 0 стоит по умолчанию



    // 5. вешаю обработчик кликов на родителя табов
    tabsParent.addEventListener('click', (e) => {
        const target = e.target; // чтобы постоянно не писать e. (e.target - это тот элемент который кликнули)
        if (target && target.classList.contains(tabsSelector.slice(1))) { // если у детей есть такой класс

            tabs.forEach((item, i) => { // запускаю перебор 4-ех табов

                if (target == item) { // если таб который кликнули совпадает с каким-то из 4-ех
                    hideTabContent(); // скрываю все
                    showTabContent(i); // показываю контент по индексу
                };
            })
        }
    });
}

export default tabs;