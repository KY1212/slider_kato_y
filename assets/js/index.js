$(function () {
  function slider() {

    //変数の設定
    const $slideWrap =$(".sliderWrap");
    const $slides = $(".slides");
    const $slide = $(".slide");
    const $indicator = $(".indicator");
    const slideWidth = $slide.outerWidth();
    const duration = 1000;
    let currentIndex=0;
    let slideLength = $slide.length;
    let indicatorHTML = "";

    //インジケーターの生成
    for (let i=1; i<=slideLength; i++){
      indicatorHTML += "<div class=dot>" + "</div>";
      $indicator.html(indicatorHTML);
      $(".dot").eq(currentIndex).addClass("active");
    }

    //最初と最後のスライドをクローン
    function cloneSlide() {
      const $lastSlide = $slides.find("li:last-child");
      const $firstSlide = $slides.find("li:first-child");
      $lastSlide.clone(true).prependTo($slides);
      $firstSlide.clone(true).appendTo($slides);
    }

    //スライドアニメーション
    function changeSlide(currentIndex) {
      $slides.stop(true).animate({
        left: (currentIndex+1) * -100 + "%"
      },duration);
      if(currentIndex == slideLength){
        currentIndex = 1;
          $(".slides").animate({
            left: currentIndex * -slideWidth
          },0);
      }else if(currentIndex == 0) {
        currentIndex = slideLength+1;
          $(".slides").animate({
            left: currentIndex * -slideWidth
          },0);
      }
        console.log("changeSlide 下"+currentIndex);
    }

    //タイマー機能
    function startTimer() {
      const interval = 3000;
      timer = setInterval(function(){
        currentIndex++;
        changeSlide(currentIndex);
        if(currentIndex==slideLength){
          currentIndex=0;
        }
        currentDot(currentIndex);
      },interval);
    }

    //現在のスライド位置をインジケーターに表示
    function currentDot(currentIndex) {
      $(".dot").removeClass("active");
      $(".dot").eq(currentIndex).addClass("active");
    }

    //インジケータークリック処理
    function clickDots() {
      index = $(this).index();
      currentDot(index);
      changeSlide(index);
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
      $(".prev .navIcon").on("click", nextSlide);
      $(".nexrt .navIcon").on("click", prevSlide);
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




  // $(function () {
  //   function slider() {
  
  //     //変数の設定
  //     const $slideWrap =$(".sliderWrap");
  //     const $slides = $(".slides");
  //     const $slide = $(".slide");
  //     const $indicator = $(".indicator");
  //     const slideWidth = $slide.outerWidth();
  //     const duration = 1000;
  //     let currentIndex=0;
  //     let slideLength = $slide.length;
  //     let indicatorHTML = "";
  //     let nextIndex = 0;
  
  //     //インジケーターの生成
  //     for (let i=1; i<=slideLength; i++){
  //       indicatorHTML += "<div class=dot>" + "</div>";
  //       $indicator.html(indicatorHTML);
  //       $(".dot").eq(currentIndex).addClass("active");
  //     }
  
  //     //最初と最後のスライドをクローン
  //     function cloneSlide() {
  //       const $lastSlide = $slides.find("li:last-child");
  //       const $firstSlide = $slides.find("li:first-child");
  //       $lastSlide.clone(true).prependTo($slides);
  //       $firstSlide.clone(true).appendTo($slides);
  //     }
  
  //     //スライドアニメーション
  //     function changeSlide(currentIndex) {
  //       console.log("changeSlide 上"+currentIndex);
  
  //       $slides.stop(true).animate({
  //         left: (currentIndex+1) * -100 + "%"
  //       },duration);
  //       if(currentIndex == slideLength){
  //         currentIndex = 1;
  //           $(".slides").animate({
  //             left: currentIndex * -slideWidth
  //           },0);
  //       }else if(currentIndex == 0) {
  //         currentIndex = slideLength+1;
  //           $(".slides").animate({
  //             left: currentIndex * -slideWidth
  //           },0);
  //       }
  
  //       // if(currentIndex==slideLength-1) {
  //       //   currentIndex= 0;
  //         console.log("changeSlide 下"+currentIndex);
  //       // }
  //       currentDot(currentIndex);
  //     }
  
  //     //タイマー機能
  //     function startTimer() {
  //       const interval = 3000;
  //       timer = setInterval(function(){
  //         console.log("startTimer "+currentIndex);
  //         currentIndex++;
  //         changeSlide(currentIndex);
  //         if(currentIndex==slideLength){
  //           currentIndex=0;
  //         }
  //       },interval);
  //     }
  
  //     //現在のスライド位置をインジケーターに表示
  //     function currentDot(currentIndex) {
  //       console.log(currentIndex,slideLength);
  
  //       console.log("インジェタのcurrentIndex "+currentIndex);
  //       $(".dot").removeClass("active");
  //       $(".dot").eq(currentIndex).addClass("active");
  //       // currentIndex = (slideLength-1);
  
  //     }
  
  //     //インジケータークリック処理
  //     function clickDots() {
  //       index = $(this).index();
  //       changeSlide(index);
  //     }
  
  
  //     //prevボタンの処理
  //     function prevSlide() {
  //       currentIndex--;
  //       changeSlide();
  //     }
  
  //     //nextボタンの処理
  //     function nextSlide() {
  //       currentIndex++;
  //       changeSlide();
  //     }
  
  //     //タイマーの一時停止
  //     function stopTimer() {
  //       clearInterval(timer);
  //     }
  
  //     function init() {
  //       cloneSlide();
  //     }
  
  //     //クリックで実行
  //     function clickEvent() {
  //       $(".next").on("click", nextSlide);
  //       $(".prev").on("click", prevSlide);
  //       $(".dot").on("click", clickDots);
  //     }
  
  //     //マウスの位置で動作
  //     function mouseEvent() {
  //       $slideWrap.on({
  //         mouseenter: stopTimer,
  //         mouseleave: startTimer
  //       });
  //     }
  
  //     init();
  //     mouseEvent();
  //     clickEvent();
  //     startTimer();
  //   }
  
  //   slider()
  
  //   });
  