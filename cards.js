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