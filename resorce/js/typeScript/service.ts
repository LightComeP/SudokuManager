// 스도쿠 컨테이너 박스 사이즈 조절 펑션 
let fContainerResize: Function;
fContainerResize = function(){
    let containerSize: number; // 컨테이너 세로가로사이즈   
    let numberSize :number;  // 결과 입력 값
    let memoNumSize:number; // 메모 입력 값 사이즈
    
    //박스 크기 조절
    containerSize = (window.innerHeight - 150);
    sudokuContainer.style.height = containerSize + 'px';
    sudokuContainer.style.width  = containerSize + 'px';
    
    //글자 크기 조절
    numberSize = document.querySelector('[x]').offsetHeight - 25;
    memoNumSize = document.querySelector('[x]').querySelector('.memoDiv').offsetHeight - 12;
    if(numberSize < 0) numberSize = 0;
    if(memoNumSize < 0) memoNumSize = 0;
    
    
    var memoPEle:Array<HTMLElement> = common.qsa(null, '.memoP');
    var resultPEle:Array<HTMLElement> = common.qsa(null, '.resultP');
    for(let p:HTMLElement of memoPEle){
        p.setAttribute('style', 'font-size:' + memoNumSize );
    }
    for(let p:HTMLElement of resultPEle){
        p.setAttribute('style', 'font-size:' + numberSize );
    }

    
  }
  
  
  
  
}