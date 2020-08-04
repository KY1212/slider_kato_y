$(function () {

  function slider() {

    //変数の設定
    const $slides = $(".slides");
    const $slide = $(".slide");
    const duration = 1000;
    let currentIndex=0;
    let slideLength = $slide.length;

    //インジケーターの生成
    function addIndicator(){
      const $indicator = $(".indicator");
      let indicatorHTML = "";

      for (let i=1; i<=slideLength; i++){
        indicatorHTML += "<div class=dot>" + "</div>";
        $indicator.html(indicatorHTML);
        $(".dot").eq(currentIndex).addClass("active");
      }
    }

    //最初と最後のスライドをクローン
    function cloneSlide() {
      const $lastSlide = $slides.find("li:last-child");
      const $firstSlide = $slides.find("li:first-child");
      $lastSlide.clone(true).prependTo($slides);
      $firstSlide.clone(true).appendTo($slides);
    }
// .is isanimate アニメーション中は発火しないメソッドをいれる

    //スライドアニメーション
    function changeSlide(currentIndex) {
      const slideWidth = $slide.outerWidth();
      $slides.stop(true).animate({
        left: (currentIndex+1) * -100 + "%"
      },duration);
      if(currentIndex == slideLength){
        currentIndex = 1;
        $(".slides").animate({
          left: currentIndex * -slideWidth
        },0);
      }else if(currentIndex == -1) {
        currentIndex = slideLength;
        $(".slides").animate({
          left: currentIndex * -slideWidth
        },0);
      }

      console.log("changeSlide 下"+currentIndex);
    }

    //タイマースタート
    function startTimer() {
      const interval = 200000;
      timer = setInterval(function(){
        currentIndex++;
        changeSlide(currentIndex);
        if(currentIndex == slideLength){
          currentIndex = 0;
        }
        currentDot(currentIndex);
      },interval);
    }

    //タイマーの一時停止
    function stopTimer() {
      clearInterval(timer);
    }

    //現在のスライド位置をインジケーターに表示
    function currentDot(currentIndex) {
      if(currentIndex == slideLength){
        currentIndex = 0;
      }
      $(".dot").removeClass("active");
      $(".dot").eq(currentIndex).addClass("active");
    }

    //インジケータークリック処理
    function clickDots() {
      currentIndex = $(this).index();
      currentDot(currentIndex);
      changeSlide(currentIndex);
    }

    //prevボタンの処理
    function prevSlide() {
      currentIndex--;
      currentDot(currentIndex);
      changeSlide(currentIndex);
      if(currentIndex == -1){
        currentIndex = 3;
      }
    }

    //nextボタンの処理
    function nextSlide() {
      currentIndex++;
      currentDot(currentIndex);
      changeSlide(currentIndex);
      if(currentIndex == slideLength){
        currentIndex = 0;
      }
    }

    function init() {
      cloneSlide();
      addIndicator();
    }

    //クリックで実行
    function setEvent() {
      const $slideWrap = $(".sliderWrap");
      $slideWrap.on({
        mouseenter: stopTimer,
        mouseleave: startTimer
      });
      $(".prev").on("click", prevSlide);
      $(".next").on("click", nextSlide);
      $(".dot").on("click", clickDots);
    }

    init();
    setEvent();
    startTimer();

  }

  slider();

});