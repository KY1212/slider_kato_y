$(function () {

    function cloneSlide(slideSetWidth) {
      $(".slide:last-child").clone(true).prependTo($(".slideset")),
      $(".slide:nth-child(2)").clone(true).appendTo($(".slideset"));
      $(".slideset").css("width", slideSetWidth);
      $(".slide")
    }

    function addIndicator($slide,indicatorHTML,dotIndex,$indicator) {
      //インジケーターの生成
      $slide.each(function (){
        indicatorHTML += `<div class="dot" id="${dotIndex}">` + '</div>';
        $indicator.html(indicatorHTML);
        dotIndex++;
      });
    }

    function initial(slideCount,slideWidth) {
      console.log("initial "+slideCount);
      //インジケーター初期位置
      $(`#${slideCount}`).css({
        backgroundColor: "#fff"
        });
        //スライドの初期位置
        const initialSlide = slideCount * -slideWidth;
        $(".slideset").css({
          left: initialSlide
        });
    }

    function currentIndex() {

    }

    //インジケーターのクリック処理
    function clickIndicator(slideWidth){
      $(".dot").on("click", function(){
        //クリックされたドットの特定
        const idname = $(this).attr("id");
        const currentDot = $(`.dot#${idname}`);
        $(".dot").css({
            backgroundColor: "#999999"
        });
        currentDot.css({
            backgroundColor: "#fff"
        });
        //クリックされたドット位置とスライド位置を揃える
        const slideCount = idname;
        $(".slideset").stop(true).animate({
            left: slideCount * -slideWidth
        });
    });
  }

  //nextボタン押下でsliding実行
  function sliderNext(slideCount,slideWidth){

    $(".nav .next").click(function(){
      let clickFlag = true;
      const slideNum = $(".slide").length;

      if(clickFlag){
        console.log("nextボタンの"+slideCount, slideWidth);

        clickFlag = false;
        slideCount++;
         //変数slidingにアニメーション効果を格納
        const duration = 500;
        //スライドの移動処理
        $(".slideset").stop(true).animate({
          left: slideCount * -slideWidth
        },duration,function() {
          clickFlag = true;
        });

      //slideCountが1以下だった場合
      if(slideCount < 1){
        //スライド1枚目から6枚目に移動(アニメーション0秒)
        slideCount = 5;
        delayedCall(0.5,function(){
          $(".slideset").animate({
            left: slideCount * -slideWidth
        },0);
      });

      //slideCountがslideNum上限に差し掛かった場合
      }else if(slideCount == slideNum){
        slideCount = 0;
        delayedCall(0.5,function(){
          $(".slideset").animate({
            left: slideCount * -slideWidth
          },0);
        });
      }
      function delayedCall(second, callBack){
        setTimeout(callBack, second * 1000);
      }

      }else{
        return false;
      }
    });
  }




  function init() {
    const $slide = $(".slide");
    const slideWidth = $slide.outerWidth();
    const slideNum = $slide.length;
    const slideSetWidth = slideWidth * (slideNum+2);
    const slideCount = 1;
    const $indicator = $(".indicator");
    const indicatorHTML = "";
    const dotIndex = 1;
    cloneSlide(slideSetWidth);
    addIndicator($slide,indicatorHTML,dotIndex,$indicator);
    initial(slideCount,slideWidth);
    clickIndicator(slideWidth,slideNum);

    sliderNext(slideCount,slideWidth);
    // sliderPrev();
  }
  init();

});





// $(function () {

//   function cloneSlide(slideSetWidth) {
//     $(".slide:last-child").clone(true).prependTo($(".slideset"));
//     $(".slide:nth-child(2)").clone(true).appendTo($(".slideset"));
//     $(".slider").css("width", slideSetWidth);
//   }

//   function addIndicator($slide,indicatorHTML,dotIndex,indicator) {

    
//     //インジケーターの生成
//     $slide.each(function (){
//       indicatorHTML += `<div class="dot" id="${dotIndex}">` + '</div>';
//       indicator.html(indicatorHTML);
//       dotIndex++;
//     });

//     //インジケーター初期位置
//     $(".dot:first-child").css({
//         backgroundColor: "#fff"
//     });
//   }


//   //インジケーター
//   function clickIndicator(slideWidth){
//     $(".dot").on("click", function(){
//       //クリックされたドットの特定
//       const idname = $(this).attr("id");
//       const currentDot = $(`.dot#${idname}`);
//       $(".dot").css({
//           backgroundColor: "#999999"
//       });
//       currentDot.css({
//           backgroundColor: "#fff"
//       });
//       //クリックされたドット位置とスライド位置を揃える
//       const slideCount = idname;
//       $(".slideset").stop(true).animate({
//           left: slideCount * -slideWidth
//       });
//   });
// }

// function init() {
//   const $slide = $(".slide");
//   const slideWidth = $slide.outerWidth();
//   const slideNum = $slide.length;
//   const slideSetWidth = slideWidth * (slideNum+2);
//   const slideCount = 1;
//   const indicator = $(".indicator");
//   let indicatorHTML = "";
//   let dotIndex = 1;
//   var clickFlag = true;
//   cloneSlide(slideSetWidth);
//   addIndicator($slide,indicatorHTML,dotIndex,indicator);
//   clickIndicator(slideWidth,slideNum);
// }
// init();



// });