'use strict';

document.addEventListener('DOMContentLoaded', () => {



    // табы ============================================================================================================================

    // 1. получаю кнопки, родителя кнопок и то что сожержится в кнопках
    const tabs = document.querySelectorAll('.tabheader__item'), // 4 кнопки (таба)
        tabsContent = document.querySelectorAll('.tabcontent'), // 4 контента для разных табов
        tabsParent = document.querySelector('.tabheader__items'); // родитель для 4 кнопок (табов)


    // 2. функция по скрытию контента для табов
    function hideTabContent() {

        tabsContent.forEach(item => { // скрываю в css
            // item.style.display = 'none';
            // или
            item.classList.add('hide'); // добавляю класс с display = 'none'
            item.classList.remove('show', 'fade'); // и удаляю  эти
        });

        tabs.forEach(tab => { // удаляю классы активности
            tab.classList.remove('tabheader__item_active');
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
        if (target && target.classList.contains('tabheader__item')) { // если у детей есть такой класс

            tabs.forEach((item, i) => { // запускаю перебор 4-ех табов

                if (target == item) { // если таб который кликнули совпадает с каким-то из 4-ех
                    hideTabContent(); // скрываю все
                    showTabContent(i); // показываю контент по индексу
                };
            })
        }
    });






    // таймер ===================================================================================================

    // 1. создаю дедлайн
    const deadline = '2023-09-10';


    // 2. функция по расчету всех временных промежутков
    function getTimeRemaining(endtime) {

        let days, hours, minutes, seconds;

        const t = Date.parse(endtime) - Date.parse(new Date()); // в t кладу deadline в миллисекундах - текущее время 

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // округл. в мен.сторону кол-во дней, сколько осталось до дедлайна
                hours = Math.floor((t / (1000 * 60 * 60) % 24)), // получаю остаток часов от кол-ва всех часов, которые ушли в дни
                minutes = Math.floor((t / (1000 * 60) % 60)), // получаю остаток минут от всех минут, которые ушли в часы
                seconds = Math.floor((t / 1000) % 60); // получаю остаток секунд от всех секунд, которые ушли в минуты
        }


        return { // возвращаю объект с днями часами минутами...
            'total': t, // кол-во миллисекунд, сколько осталось до дедлайна
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }



    // 2. функция по получению вставке дней часов минут... в html
    function setClock(endtime) {

        const days = document.querySelector('#days'), // получаю по айди спэн в котором будут дни
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds');



        // фиксим баги - пункты 7 и 8 
        // 7. запускаю сразу после получения спэнов, чтобы таймер сразу был обновлен
        updateClock();

        // 8. пишу еще одну функцию по добавлению ноликов в дни часы
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }



        // 3. функция по вставке дней часов минут... в html
        function updateClock() {

            const t = getTimeRemaining(endtime) // создаю и кладу в t объект с днями, часами, минутами...

            days.innerHTML = `<span id="days">${getZero(t.days)}</span>`; // вставляю расчитанные до делайна дни
            hours.innerHTML = `<span id="days">${getZero(t.hours)}</span>`;
            minutes.innerHTML = `<span id="days">${getZero(t.minutes)}</span>`;
            seconds.innerHTML = `<span id="days">${getZero(t.seconds)}</span>`;

            // 4. останавливаю таймер если кол-во миллисекунд сколько осталось до делайна 
            if (t.total <= 0) {
                clearInterval(timeInterval); // сбрасываю таймаут
            }
        }

        // 5. чтобы таймер обновлялся буду запускать функцию каждую секунду
        const timeInterval = setInterval(updateClock, 1000);
    }
    // 6. запускаю 
    setClock(deadline)










    // модальное окно ===================================================================================================

    const modal = document.querySelector('.modal'), // получаю модальное окно
        btns = document.querySelectorAll('[data-modal]'); // кнопки-триггеры


    // простой вариант, но с ним нельзя будет закрыть окно клавишей esc
    // 1. в css в модальном окне пишу display: none; чтобы по-умолчанию оно было скрыто

    // btns.forEach(btn => { // 2.
    //     btn.addEventListener('click', () => {
    //         modal.style.display = 'block';
    //         document.body.style.overflow = 'hidden'; // запрещаю прокрутку страницы
    //     });
    // });


    // function closeModal() { // 5. вынесу в отдельную функцию повторяющиеся действия
    //     modal.style.display = 'none';
    //     document.body.style.overflow = ''; // разрешаю прокрутку страницы
    // };

    // close.addEventListener('click', closeModal); // 3. при клике на крестик - выполняется функ

    // modal.addEventListener('click', (e) => { // 4.
    //     if (e.target === modal) { // если элемент, на который кликнули - это именно подложка под модальное окно
    //         closeModal(); // выполняется функ
    //     };
    // });




    // чуть сложней вариант с добавлением класса
    // 1. создаю в css новый класс hide с display: none;
    // 2. добавляю его в html-структуру в модальное окно чтобы по-умолчанию оно было скрыто

    btns.forEach(btn => { // 3.
        btn.addEventListener('click', openModal);
    });

    function openModal() { // 8. вынесу в отдельную функцию и открытие окна
        // modal.classList.toggle('hide'); // если такой класс есть - убираю
        modal.classList.add('show');
        modal.classList.remove('hide');

        document.body.style.overflow = 'hidden'; // запрещаю прокрутку страницы
        // clearInterval(modalTimerId);
    };


    function closeModal() { // 7. вынесу в отдельную функцию повторяющиеся действия (закрытие окна)
        // modal.classList.toggle('hide'); // если такой класс нет - добавляю
        modal.classList.add('hide');
        modal.classList.remove('show');

        document.body.style.overflow = ''; // разрешаю прокрутку страницы
    };


    modal.addEventListener('click', (e) => { // 5.
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // если элемент, на который кликнули - это именно подложка под модальное окно или крестик, который я выявлю по атрибуту
            closeModal(); // выполняется функ
        };
    });

    document.addEventListener('keydown', (e) => { // 6. вешаю на весь документ событие (нажатие клавиши)
        if (e.code === 'Escape' && !modal.classList.contains('hide')) { // если нажатие клавиши - esc и в окне нету класса hide
            closeModal(); // выполняется функ
        }
    });



    // модифицирую модал окно
    // const modalTimerId = setTimeout(openModal, 50000); // через 5 секунд модальное окно откроется самостоятельно

    // 1. добавляю в функ OpenModal метод clearInterval(modalTimerId) - сброс таймера. чтобы юзеру не прилитело еще одно окно через какое-то время, после того как он сам его уже открыл 

    // 3. пишу функцию которая будет проверять доскроллил ли юзер до конца страницы
    // function showModalByScroll() {
    //     // если уже проскроленная часть (которую юзер уже не видит) + клиентская высота страницы (та, что видна юзеру) >= чем вся высота документа -1px
    //     if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    //         openModal(); // открываю окно
    //         window.removeEventListener('scroll', showModalByScroll); // удаляю обработчик после того как окно открылось
    //     };
    // };

    // 2. вешаю обработчик события (скролл) на всю страницу. если юзер проскроллит до конца страницы - модальное окно откроется самостоятельно
    // window.addEventListener('scroll', showModalByScroll);







    // шаблон карточки меню ===================================================================================================


    // 1. создаю функцию которая будет получать базу данных для подгрузки карточек 
    const getResource = async (url) => { // 1арг - путь, откуда получать

        const res = await fetch(url); // создаю промис, посылаю запрос на сервер

        // чтобы сработал catch(), если запрос не пройдет и вылезет какая-нибудь ошибка 404, проверяю 
        if (!res.ok) { // если с запросом не ок
            throw new Error(`ошибка ${res.status}`); // выкидываю ошибку
        }
        return await res.json(); // возвращаю промис с данными, конвертирую их в формат джейсон)
    };




    getResource('http://localhost:3000/menu') // 2. вызываю функцию для получения данных. здесь получается промис
        .then(data => createCard(data)); // 4. вызываю функ для создания карточек 




    // 3. создаю функцию для создания карточек на основе базы данных
    function createCard(data) {
        data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => { // для каждого элемента в базе данных применяю деструктуризацию (вытаскиваю ключи)

            const card = document.createElement('div'); // динамически создаю карточку
            card.classList.add('menu__item'); // накладываю стили

            // кладу в карточку html-структуру со значениями из ключей
            card.innerHTML = ` 
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> евро/день</div>
                </div>
            `

            document.querySelector('.menu .container').append(card); // добавляю карточку на страницу в родителя
        });

    };









    // отправляю данные с модальных окон ===================================================================================================

    const forms = document.querySelectorAll('form'); // 1. получаю две формы 


    const message = { // 4. и 5. создаю надписи, которые будут выводиться в новом окне после отправки формы
        loading: 'Загрузка',
        success: 'Спасибо, сейчас мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };



    // async - ставлю перед функцией (тем самым говорю что после этого слова будет асинхронный код (непонятно когда отработает))
    // awayt - ставлю перед операцией, которую надо дождаться, прежде чем класть в переменную res или возвращать промис

    // 2. создаю функцию которая будет постить данные на сервер
    const postData = async (url, data) => { // 1арг - путь, куда постить, 2арг - что постить

        const res = await fetch(url, { // создаю промис
            method: "POST", // хочу отправить данные с формы
            headers: {
                'Content-type': 'application/json' // в формате json
            },
            body: data // отправляю какие-то данные 
        });

        return await res.json(); // возвращаю промис с данными, конвертирую их в формат джейсон)
    };





    // 3. создаю функ которая собирает данные с формы, постит их (отправляет на сервер) и вызывает окно с надписью
    function bindPostData(form) {
        form.addEventListener('submit', (e) => { // submit - срабатывает когда отправляю форму
            e.preventDefault(); // отменяю перезагрузку страницы


            const formData = new FormData(form); // 1. создаю объект, который сам поместит в себя данные с формы


            // 2. конвертирую формдату в массив массивов > обратно в объект > в джейсон формат
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json) // 3. вызываю функцию, которая отправляет данные

                // использую промисы. если функция postData выполнился - запускается then
                .then(data => {
                    console.log(data); // вывожу то, что я отправил на сервер
                    showThanksModal(message.success); // 4. вызываю функцию, которая покажет новое модальное окно с надписью
                })
                .catch(() => { // если не выполнился - запускается catch
                    showThanksModal(message.failure); // 5. вызываю функцию, которая покажет новое модальное окно с надписью 'Что-то пошло не так...' 

                })
                .finally(() => { // 6. и в конце запускается finally в любом случае
                    form.reset(); // сбрасываю форму 
                })
        });
    };



    // 4. создаю функцию которая будет показывать новое модальное окно с разными надписями
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 2000);
    }



    // 5. запускаю функцию
    forms.forEach(item => { // для каждой формы
        bindPostData(item) // запускаю функ
    });

























});