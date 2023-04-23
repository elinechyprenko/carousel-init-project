class Carousel {
 constructor() {
  this.container = document.querySelector("#carousel");
  this.slides = this.container.querySelectorAll(".slide");
 }
 initProps() {
  this.CODE_SPACE = "Space";
  this.CODE_ARROW_LEFT = "ArrowLeft";
  this.CODE_ARROW_RIGHT = "ArrowRight";
  this.FA_PAUSE = '<i class="far fa-pause-circle"></i>';
  this.FA_PLAY = '<i class="far fa-play-circle"></i>';
  this.FA_PREV = '<i class="fas fa-angle-left"></i>';
  this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

  this.currentSlides = 0;
  this.slidesCount = this.slides.length;
  this.timerID = null;
  this.isPlaying = true;
  this.swipeStartX = null;
  this.swipeEndX = null;

  this.CODE_SPACE = "Space";
  this.CODE_ARROW_LEFT = "ArrowLeft";
  this.CODE_ARROW_RIGHT = "ArrowRight";
 }

 initControls() {
  const controls = document.createElement("div");
  controls.setAttribute("class", "controls");
  const PAUSE = `<div id="pause" class="control">${this.FA_PAUSE}</div>`;
  const PREV = `<div id="prev" class="control">${this.FA_PREV}</div>`;
  const NEXT = `<div id="next" class="control">${this.FA_NEXT}</div>`;
  controls.innerHTML = PAUSE + PREV + NEXT;

  this.container.appendChild(controls);
  this.pauseBtn = this.container.querySelector("#pause");
  this.prevBtn = this.container.querySelector("#prev");
  this.nextBtn = this.container.querySelector("#next");
 }
 initIndicators() {
  const indicators = document.createElement("div");
  indicators.setAttribute("id", "indicators-container");
  indicators.setAttribute("class", "indicators");
  this.container.appendChild(indicators);
  for (let i = 0, n = this.slidesCount; i < n; i++) {
   const indicator = document.createElement("div");
   indicator.setAttribute("class", "indicator");
   i === 0 && indicator.classList.add("active");
   indicator.dataset.slideTo = `${i}`;
   indicators.appendChild(indicator);
  }
  this.indicatorsContainer = this.container.querySelector(
   "#indicators-container"
  );
  this.indicators = this.indicatorsContainer.querySelectorAll(".indicator");
 }
 goToSlide(n) {
  this.slides[this.currentSlides].classList.toggle("active");
  this.indicators[this.currentSlides].classList.toggle("active");
  this.currentSlides = (n + this.slidesCount) % this.slidesCount;
  this.slides[this.currentSlides].classList.toggle("active");
  this.indicators[this.currentSlides].classList.toggle("active");
 }
 prevSlide() {
  this.goToSlide(this.currentSlides - 1);
 }
 nextSlide() {
  this.goToSlide(this.currentSlides + 1);
 }
 prev() {
  this.prevSlide();
  this.pause();
 }
 next() {
  this.nextSlide();
  this.pause();
 }
 pause() {
  if (this.isPlaying) {
   this.pauseBtn.innerHTML = this.FA_PLAY;
   this.isPlaying = false;
   window.clearInterval(this.timerID);
  }
 }
 play() {
  this.pauseBtn.innerHTML = this.FA_PAUSE;
  this.isPlaying = true;
  this.timerID = setInterval(this.nextSlide.bind(this), 3000);
 }
 pausePlayBtn() {
  this.isPlaying ? this.pause() : this.play();
 }
 indicate(e) {
  const target = e.target;
  if (target && target.classList.contains("indicator")) {
   this.pause();
   this.goToSlide(+target.dataset.slideTo);
  }
 }
 pressKey(e) {
  // console.log(e)
  if (e.code === this.CODE_ARROW_LEFT) this.prev();
  if (e.code === this.CODE_ARROW_RIGHT) this.next();
  if (e.code === this.CODE_SPACE) this.pausePlayBtn();
 }
 initListeners() {
  this.pauseBtn.addEventListener("click", this.pausePlayBtn.bind(this));
  this.nextBtn.addEventListener("click", this.next.bind(this));
  this.prevBtn.addEventListener("click", this.prev.bind(this));
  this.indicatorsContainer.addEventListener("click", this.indicate.bind(this));
  document.addEventListener("keydown", this.pressKey.bind(this));
 }
 init() {
  this.initProps();
  this.initControls();
  this.initIndicators();
  this.initListeners();
  this.timerID = setInterval(this.nextSlide.bind(this), 3000);
 }
}

class swipeCarousel extends Carousel {
 swipeStart(e) {
  this.swipeStartX = e.changedTouches[0].clientX;
 }
 swipeEnd(e) {
  this.swipeEndX = e.changedTouches[0].clientX;
  this.swipeStartX - this.swipeEndX > 100 && this.next();
  this.swipeStartX - this.swipeEndX < -100 && this.prev();
 }
 initListeners() {
  super.initListeners();
  this.container.addEventListener("touchstart", this.swipeStart.bind(this));
  this.container.addEventListener("touchend", this.swipeEnd.bind(this));
 }
}
