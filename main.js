const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another.
// manually
// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 1 + 'px';

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}


slides.forEach(setSlidePosition);



// fuction for moving slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; 
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDot = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide')
}


const HideShowArrow = (targetIndex, slides, prevButton, nextButton) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden')
    }
}

//when I click right, move slides to the right.
nextButton.addEventListener('click', e => {
    // getting the current slide.
    const currentSlide = track.querySelector('.current-slide');

    // getting the next slide.
    const targetSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === targetSlide);

    // move to the next slide when the next button is click. 
    moveToSlide(track, currentSlide, targetSlide);
    updateDot(currentDot, targetDot);

    HideShowArrow (nextIndex, slides, prevButton, nextButton);


})






//when I click left, move slides to the left.
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const targetSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetDot = currentDot.previousElementSibling;

    moveToSlide(track, currentSlide, targetSlide);
    updateDot(currentDot, targetDot);
    const prevIndex = slides.findIndex(slide => slide === targetSlide);
    HideShowArrow (prevIndex, slides, prevButton, nextButton);


})


//when I click the nav indicators, move to that slide.
dotsNav.addEventListener('click', e => {
    //What indicator was clicked on? 
    const targetDot = e.target.closest('button');

    if (!targetDot) return;
    //This means if what we click is not target button, the function should stop.

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);

    updateDot(currentDot, targetDot);

    HideShowArrow (targetIndex, slides, prevButton, nextButton);
    


})
