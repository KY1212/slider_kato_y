$(function () {

  //変数の設定
    const $slides = $(".slides");
    const $slide = $(".slide");
    const slideWidth = $slide.outerWidth();
    const duration = 1000;
    let currentIndex=1;
    let slideNum = $slide.length;
    let indicatorHTML = "";
    let dotIndex = 1;
    let indicator = $(".indicator");

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
      $slide.each(function (){
        indicatorHTML += `<div class="dot" id="${dotIndex}">` + '</div>';
        indicator.html(indicatorHTML);
        dotIndex++;
      });
    }

    //スライドの初期位置
    function initialSlide() {
      $(".slides").animate({
        left: currentIndex * -slideWidth
      },0);
      console.log(currentIndex);
      $(`#${currentIndex}`).addClass("active");
    }

    //スライドアニメーション
    function changeSlide(clickDot) {
      console.log("clickDot "+clickDot);
      if(clickDot!=null){
        currentIndex = clickDot;
      }

      $slides.stop(true).animate({
        left: currentIndex * -100 + "%"
      },duration);
      console.log(currentIndex);
      if(currentIndex == slideNum && clickDot != slideNum){
        currentIndex = 0;
            $(".slides").animate({
                left: currentIndex * -slideWidth
            },0);
      }else if(currentIndex < 1) {
        currentIndex = slideNum;
        console.log(slideNum);
          $(".slides").animate({
              left: currentIndex * -slideWidth
          },0);
      }
      currentDot();
    }

    //インジケータークリック処理
    function clickDots() {
        let clickDot = $(this).attr("id");
        changeSlide(clickDot);
    }

    //現在のスライド位置をインジケーターに表示
    function currentDot() {
      console.log("現在の位置"+currentIndex,slideNum);
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

    //タイマー機能
    function startTimer() {
      const interval = 1000;
      timer = setInterval(changeSlide, interval);
    }

    function init() {
      cloneSlide();
      addIndicator();
      initialSlide();
    }

    function clickEvent() {
      $(".next").on("click", nextSlide);
      $(".prev").on("click", prevSlide);
      $(".dot").on("click", clickDots);
    }

    // startTimer();
    init();
    clickEvent();

  });
