function modal() {


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



}

module.exports = modal;