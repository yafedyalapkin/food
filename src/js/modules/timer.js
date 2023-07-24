function timer(deadline) {
    // таймер ===================================================================================================

    // 1. создаю дедлайн
    // const deadline = '2023-09-10';


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

}

export default timer;