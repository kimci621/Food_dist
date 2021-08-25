function slider({
  parentSelector,
  sliderItemSelector,
  prevArrow,
  nextArrow,
  counterSelector,
  totalCountSelector,
  sliderWrapperSelector,
  sliderParentSelector
}) {
  //slider
  const slider = parentSelector;
  const slides = sliderItemSelector;
  const prev = prevArrow;
  const next = nextArrow;
  const counter = counterSelector;
  const total = totalCountSelector;
  const sliderWrapper = sliderWrapperSelector;
  const sliderInner = sliderParentSelector;
  const width = window.getComputedStyle(sliderInner).width;
  //delete px from 650px
  const widthInt = +width.replace(/\D/g, '');
  let step = 0;
  let slideNum = 1;
  //total count of slides
  if (slides.length > 9) {
    total.textContent = `${slides.length}`;
    counter.textContent = `${slideNum}`;
  } else {
    total.textContent = `0${slides.length}`;
    counter.textContent = `0${slideNum}`;
  }

  //slider карусель
  sliderInner.style.width = slides.length * 100 + '%';
  sliderInner.style.display = 'flex';
  sliderWrapper.style.overflow = 'hidden';
  sliderInner.style.transition = '0.5s all';


  slides.forEach(slide => {
    slide.style.width = width;
  });

  prev.addEventListener('click', () => {
    //Прокрутка
    if (step == 0) {
      step = widthInt * (slides.length - 1);
    } else {
      step -= widthInt;
    }
    sliderInner.style.transform = `translateX(-${step}px)`;
    //номер слайда
    if (slideNum == 1) {
      slideNum = slides.length;
    } else {
      slideNum--;
    }
    //Присвоение
    if (slideNum < 10) {
      counter.textContent = `0${slideNum}`;
    } else {
      counter.textContent = `${slideNum}`;
    }
    //dots active
    dots.forEach((dot) => {
      dot.style.opacity = '.5';
    });
    dots[slideNum - 1].style.opacity = '1';

  });

  next.addEventListener('click', () => {
    //Прокрутка
    if (step == (widthInt * (slides.length - 1))) {
      step = 0;
    } else {
      step += widthInt;
    }
    sliderInner.style.transform = `translateX(-${step}px)`;
    //номер слайда
    if (slideNum == slides.length) {
      slideNum = 1;
    } else {
      slideNum++;
    }
    //Присвоение
    if (slideNum < 10) {
      counter.textContent = `0${slideNum}`;
    } else {
      counter.textContent = `${slideNum}`;
    }
    //dots active
    dots.forEach((dot) => {
      dot.style.opacity = '.5';
    });
    dots[slideNum - 1].style.opacity = '1';
  });

  //Навигация для слайдов 
  slider.style.position = 'relative';
  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
   position: absolute;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 15;
   display: flex;
   justify-content: center;
   margin-right: 15%;
   margin-left: 15%;
   list-style: none;
   `;
  slider.append(indicators);

  let dots = [];
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    //индикация пар слайд==точка с помощью атрибута data-*,index
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
     box-sizing: content-box;
     flex: 0 1 auto;
     width: 30px;
     height: 6px;
     margin-right: 3px;
     margin-left: 3px;
     cursor: pointer;
     background-color: #fff;
     background-clip: padding-box;
     border-top: 10px solid transparent;
     border-bottom: 10px solid transparent;
     opacity: .5;
     transition: opacity .6s ease;
   `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
    //слайды по клику на навигацию
    dots.forEach(dot => {
      dot.addEventListener('click', (event) => {
        const slideTo = event.target.getAttribute('data-slide-to');
        slideNum = slideTo;
        step = (widthInt * (slideTo - 1));
        sliderInner.style.transform = `translateX(-${step}px)`;

        dots.forEach((dot) => {
          dot.style.opacity = '.5';
        });
        dots[slideNum - 1].style.opacity = '1';
      });
    });
  }
}

export default slider;