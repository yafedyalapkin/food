function forms() {

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


}

module.exports = forms;