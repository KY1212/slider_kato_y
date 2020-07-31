$(function () {
  function slider() {

    //変数の設定
    const $slideWrap =$(".sliderWrap");
    const $slides = $(".slides");
    const $slide = $(".slide");
    const slideWidth = $slide.outerWidth();
    const duration = 1000;
    let currentIndex=1;
    let slideNum = $slide.length;
    let indicatorHTML = "";
    let dotIndex = 1;
    let indicator = $(".indicator");
    let nextIndex = 1;

    //最初と最後のスライドをクローン
    function cloneSlide(slideSetWidth) {
      $lastSlide = $(".slide:last-child");
      $firstSlide = $(".slide:first-child");
      $lastSlide.clone(true).prependTo(".slides");
      $firstSlide.clone(true).appendTo(".slides");
      $(".slides").css("width", slideSetWidth);
      return slideNum;
    }

    //インジケーターの生成
    function addIndicator() {
      // $slide.each(function (){
      //   indicatorHTML += `<div class="dot" id="${dotIndex}">` + '</div>';
      //   indicator.html(indicatorHTML);
      //   dotIndex++;
      //   $(`#${currentIndex}`).addClass("active");
      // });
      for (let i=1; i<=slideNum; i++){
        console.log(slideNum);
        indicatorHTML += `<div class="dot" id="${i}">` + '</div>';
        indicator.html(indicatorHTML);
        $(`#${currentIndex}`).addClass("active");
      }
    }

    //スライドアニメーション
    function changeSlide(index) {
      if(index!=null){
        currentIndex = index;
      }else if(index==slideNum){
        currentIndex = 4;
      }
      $slides.stop(true).animate({
        left: currentIndex * -100 + "%"
      },duration);
      if(currentIndex == slideNum && index != slideNum){
        currentIndex = 0;
          $(".slides").animate({
            left: currentIndex * -slideWidth
          },0);
      }else if(currentIndex < 1) {
        currentIndex = slideNum;
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
        if(nextIndex==slideNum){
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
        currentDot = slideNum;
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
      addIndicator();
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
