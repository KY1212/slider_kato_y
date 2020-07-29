$(function () {

    /*================================
    init関数
    初期表示に必要な関数
    ================================*/
    
    //最初と最後のスライドを複製
    function cloneSlide(slideSetWidth) {
      $(".slide:last-child").clone(true).prependTo($(".slideset")),
      $(".slide:nth-child(2)").clone(true).appendTo($(".slideset"));
      $(".slideset").css("width", slideSetWidth);
      $(".slide")
    }

    //インジケーターの生成
    function addIndicator($slide,indicatorHTML,dotIndex,$indicator) {
      $slide.each(function (){
        indicatorHTML += `<div class="dot" id="${dotIndex}">` + '</div>';
        $indicator.html(indicatorHTML);
        dotIndex++;
      });
    }

    //スライド、インジケーターの初期位置
    function initial(slideCount,slideWidth) {
      $(`#${slideCount}`).css({
        backgroundColor: "#fff"
        });
        const initialSlide = slideCount * -slideWidth;
        $(".slideset").css({
          left: initialSlide
        });
    }

    /*================================
    dynamic関数
    動的な処理の関数
    ================================*/

      //インジケーターのクリック処理
    function clickIndicator(slideWidth,idname,currentIndex){
      const $dot = $(".dot");
      $dot.on("click", function(){
        idname = $(this).attr("id");
        currentIndex = $(`.dot#${idname}`);

      //インジケーターの色をスライド位置に合わせて変更
        $dot.css({
          backgroundColor: "#999999"
        });
        currentIndex.css({
            backgroundColor: "#fff"
        });

        //クリックされたドット位置とスライド位置を揃える
        const slideCount = idname;
        $(".slideset").stop(true).animate({
            left: slideCount * -slideWidth
        });

        console.log("idnmae "+idname);
        console.log("currentIndex "+currentIndex);
        // return idname;
    });
  }

  //nextボタン押下でsliding実行
  function sliderNext(slideCount,slideWidth,slideNum){
    $(".nav .next").click(function(){
      let clickFlag = true;
      
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
        //slideCount上限に達した場合、重複スライドをスキップする
        if(slideCount == slideNum+1){
          slideCount = 1;
          delayedCall(0.5,function(){
            $(".slideset").animate({
              left: slideCount * -slideWidth
            },0);
          });
        }
        function delayedCall(second, callBack){
          setTimeout(callBack, second * 1000);
        }
      //クリックフラグ抜ける
      }else{
        return false;
      }
      const $dot = $(".dot");

      currentIndex = $(`.dot#${slideCount}`);

      //インジケーターの色をスライド位置に合わせて変更
      $dot.css({
        backgroundColor: "#999999"
      });
      currentIndex.css({
          backgroundColor: "#fff"
      });

    });
  }

    //nextボタン押下でsliding実行
    function sliderNext(slideCount,slideWidth,slideNum){
      $(".nav .next").click(function(){
        let clickFlag = true;
        
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
          //slideCount上限に達した場合、重複スライドをスキップする
          if(slideCount == slideNum+1){
            slideCount = 1;
            delayedCall(0.5,function(){
              $(".slideset").animate({
                left: slideCount * -slideWidth
              },0);
            });
          }
          function delayedCall(second, callBack){
            setTimeout(callBack, second * 1000);
          }
        //クリックフラグ抜ける
        }else{
          return false;
        }
        const $dot = $(".dot");
  
        currentIndex = $(`.dot#${slideCount}`);
  
        //インジケーターの色をスライド位置に合わせて変更
        $dot.css({
          backgroundColor: "#999999"
        });
        currentIndex.css({
            backgroundColor: "#fff"
        });

      });
    }

        //prevボタン押下でsliding実行
        function sliderPrev(slideCount,slideWidth){
          $(".nav .prev").click(function(){
            let clickFlag = true;
            console.log("slideCount "+slideCount);
            if(clickFlag){
              clickFlag = false;
              slideCount--;
               //変数slidingにアニメーション効果を格納
              const duration = 500;
              //スライドの移動処理
              $(".slideset").stop(true).animate({
                left: slideCount * -slideWidth
              },duration,function() {
                clickFlag = true;
              });
              //slideCountが1以下だった場合
              if(slideCount+1 < 2){
                console.log("1以下slideCount "+slideCount);

                //スライド1枚目から6枚目に移動(アニメーション0秒)
                slideCount = 4;
                console.log("1以下slideCount "+slideCount);
                delayedCall(0.5,function(){
                    $(".slideset").animate({
                        left: slideCount * -slideWidth
                    },0);
                });

                //slideCountがslideNum上限に差し掛かった場合
                }
              function delayedCall(second, callBack){
                setTimeout(callBack, second * 1000);
              }
            //クリックフラグ抜ける
            }else{
              return false;
            }
            const $dot = $(".dot");
      
            currentIndex = $(`.dot#${slideCount}`);
      
            //インジケーターの色をスライド位置に合わせて変更
            $dot.css({
              backgroundColor: "#999999"
            });
            currentIndex.css({
                backgroundColor: "#fff"
            });
      
          });
        }

    /*================================
    関数まとめ
    ================================*/
  function init() {
    const $slide = $(".slide");
    const slideWidth = $slide.outerWidth();
    const slideNum = $slide.length;
    const slideSetWidth = slideWidth * (slideNum+2);
    const slideCount = 1;
    const $indicator = $(".indicator");
    const indicatorHTML = "";
    const dotIndex = 1;
    const idname = null;
    const currentIndex = null;
    cloneSlide(slideSetWidth);
    addIndicator($slide,indicatorHTML,dotIndex,$indicator);
    initial(slideCount,slideWidth);

    clickIndicator(slideWidth,slideNum,idname,currentIndex);
    sliderNext(slideCount,slideWidth,slideNum);
    sliderPrev(slideCount,slideWidth,slideNum);
  }

  // function dynamic() {
  //   clickIndicator(slideWidth,slideNum,idname,currentIndex);
  //   sliderNext(slideCount,slideWidth,slideNum);
  //   sliderPrev(slideCount,slideWidth,slideNum);
  // }

  init();
  // dynamic();

});


