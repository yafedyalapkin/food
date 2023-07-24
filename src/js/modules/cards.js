import {
    getResource
} from "../services/services";


function cards() {

    // шаблон карточки меню ===================================================================================================







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

}

export default cards;