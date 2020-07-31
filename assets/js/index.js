$(function () {
  function slider() {

    //変数の設定
    const $slideWrap =$(".sliderWrap");
    const $slides = $(".slides");
    const $slide = $(".slide");
    const $indicator = $(".indicator");
    const slideWidth = $slide.outerWidth();
    const duration = 1000;
    let currentIndex=1;
    let slideLength = $slide.length;
    let indicatorHTML = "";
    let nextIndex = 1;

    //インジケーターの生成
    for (let i=1; i<=slideLength; i++){
      console.log(slideLength);
      indicatorHTML += `<div class="dot" id="${i}">` + '</div>';
      $indicator.html(indicatorHTML);
      $(`#${currentIndex}`).addClass("active");
    }

    //最初と最後のスライドをクローン
    function cloneSlide(slideSetWidth) {
      $lastSlide = $(".slide:last-child");
      $firstSlide = $(".slide:first-child");
      $lastSlide.clone(true).prependTo(".slides");
      $firstSlide.clone(true).appendTo(".slides");
      $(".slides").css("width", slideSetWidth);
      return slideLength;
    }

    //スライドアニメーション
    function changeSlide(index) {
      if(index!=null){
        currentIndex = index;
      }else if(index==slideLength){
        currentIndex = 4;
      }
      $slides.stop(true).animate({
        left: currentIndex * -100 + "%"
      },duration);
      if(currentIndex == slideLength && index != slideLength){
        currentIndex = 0;
          $(".slides").animate({
            left: currentIndex * -slideWidth
          },0);
      }else if(currentIndex < 1) {
        currentIndex = slideLength;
          $(".slides").animate({
            left: currentIndex * -slideWidth
          },0);
      }
      currentDot();
    }

    //タイマー機能
    function startTimer() {
      const interval = 3000;
      timer = setInterval(function(){
        nextIndex++;
        changeSlide(nextIndex);
        if(nextIndex==slideLength){
          nextIndex=0;
        }
      },interval);
    }

    //インジケータークリック処理
    function clickDots() {
      let clickDot = $(this).attr("id");
      changeSlide(clickDot);
    }

    //現在のスライド位置をインジケーターに表示
    function currentDot() {
      let currentDot = currentIndex;
      if(currentIndex==0){
        currentDot = slideLength;
      }
      $(".dot").removeClass("active");
      $(`#${currentDot}`).addClass("active");
    }

    //prevボタンの処理
    function prevSlide() {
      currentIndex--;
      changeSlide();
    }

    //nextボタンの処理
    function nextSlide() {
      currentIndex++;
      changeSlide();
    }

    //タイマーの一時停止
    function stopTimer() {
      clearInterval(timer);
    }

    function init() {
      cloneSlide();
    }

    //クリックで実行
    function clickEvent() {
      $(".next").on("click", nextSlide);
      $(".prev").on("click", prevSlide);
      $(".dot").on("click", clickDots);
    }

    //マウスの位置で動作
    function mouseEvent() {
      $slideWrap.on({
        mouseenter: stopTimer,
        mouseleave: startTimer
      });
    }

    init();
    mouseEvent();
    clickEvent();
    startTimer();
  }

  slider()

  });
