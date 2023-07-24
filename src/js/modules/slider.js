function slider({
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter
}) {
    // создаю слайдер ===================================================================================================

    const next = document.querySelector(nextArrow),
        prev = document.querySelector(prevArrow),
        slides = document.querySelectorAll(slide);

    let slideIndex = 1,
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter);





    // текущее состояние слайда
    currentSlide();

    function currentSlide() {
        slides.forEach(item => item.style.display = 'none'); // 2. скрываю все слайды
        slides[slideIndex - 1].style.display = 'block';

        if (slides.length >= 10) {
            total.textContent = `${slides.length}`;
        } else {
            total.textContent = `0${slides.length}`;
        }

        current.textContent = `0${slideIndex}`;
    };



    // при клике вправо
    next.addEventListener('click', nextShowSlide);

    function nextShowSlide() {


        if (slideIndex >= slides.length) { // 1. если индекс стал больше чем общее кол-во слайдов
            slideIndex = 0; // возвращаю индекс в позицию 1
        };
        slides.forEach(item => item.style.display = 'none'); // 2. скрываю все слайды

        slideIndex += 1; // 3. 
        slides[slideIndex - 1].style.display = 'block'; // 4. 

        current.textContent = `0${slideIndex}`;
    };



    // при клике влево
    prev.addEventListener('click', prevShowSlide);

    function prevShowSlide() {
        if (slideIndex < 1) {
            slideIndex = slides.length;
        };

        slides.forEach(item => item.style.display = 'none'); // скрываю все слайды


        slideIndex -= 1;
        slides[slideIndex].style.display = 'block';

        current.textContent = `0${slideIndex+1}`;

    };

}

export default slider;