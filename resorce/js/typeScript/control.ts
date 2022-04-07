

window.addEventListener('DOMContentLoaded', function(){
  fMakeSudokuGrid();      // 컨테이너 내부 그리드 생성
  fContainerResize();     // 스도쿠 컨테이너 사이즈 맞춤
  sudokuInitNumberSet();  // 스도쿠 숫자 입력;
  window.onresize = function(){ //윈도우 사이즈 변경시 동적 반응
    debugger;
    fContainerResize();
  }
  let body_ :HTMLElement = common.qs(null,'body');
  body_.addEventListener('keyup', fArrowDownEvent); // 화살표로 변경
  body_.addEventListener('mousedown', () => mouseToggleFlag = true); 
  body_.addEventListener('mouseup', () => mouseToggleFlag = false); 
  body_.addEventListener('keydown', (e) => {if(e.key == 'Shift') mouseToggleFlag = true}); 
  body_.addEventListener('keyup', (e) => {if(e.key == 'Shift')mouseToggleFlag = false}); 

})
//선언
let sudokuContainer: HTMLElement = document.getElementById('sudokuContainer');
//입력 숫자 갯수 입력
let hintNumberWordConunt = 20;
let mouseToggleFlag:boolean;



  



//컨테이너 내부 grid 구성
let fMakeSudokuGrid: Function = function(){
  const NINE:number = '9';
  for(let y:number = 1; y <= NINE; y++){
    for(let x:number = 1; x <= NINE; x++){
      let divEle:HTMLElement = document.createElement('div'); //어팬드div
      let BoxX:string = Math.ceil(x/3);
      let BoxY:string = Math.ceil(y/3);
      
      divEle.setAttribute('x', x);
      divEle.setAttribute('y', y);
      divEle.setAttribute('box',''+BoxX+BoxY);
      divEle.classList.add('sudokuBox');
      divEle.addEventListener('mousedown',focusHighlight);
      
      for(let i = 0 ; i < 9; i++){
        let memoDivEle:HTMLElement = document.createElement('div'); // 메모 div
        memoDivEle.setAttribute('class', 'memoDiv');
        let memoPEle:HTMLElement = document.createElement('p'); // 메모 p
        memoPEle.setAttribute('class', 'memoP');
        memoDivEle.append(memoPEle);
        divEle.append(memoDivEle); // ex: <div class= 'memoDiv'><p class= 'memoP'></></>
      }
      let pEle = document.createElement('p');
      pEle.setAttribute('class', 'resultP')
      divEle.append(pEle);
      sudokuContainer.append(divEle); 
    }
  }
}
//포커싱시 하이라이트
let focusHighlight: Function;
focusHighlight = function(e){
  //선언
  let targetDiv:HTMLElement;
  if(e.type == 'mousedown'){
    if(e.target.parentElement.classList['value'].indexOf('sudokuBox') >= 0){ // 자식요소가 클릭되면 부모 요소 클릭 이벤트로 변경
      targetDiv = e.target.parentElement;
    }else{
      targetDiv = e.target;
    }
  }else if(e.type == 'keyup'){
    targetDiv = e.customTarget;
  }
  
  
  let xDivCd    = targetDiv.getAttribute('x');
  let yDivCd    = targetDiv.getAttribute('y');
  let boxDivCd  = targetDiv.getAttribute('box');
  
  let sudokuDivlist = document.querySelectorAll('[x]');
  let xArray    = document.querySelectorAll('[x="'+ xDivCd +'"]');
  let yArray    = document.querySelectorAll('[y="'+ yDivCd +'"]');
  let boxArray  = document.querySelectorAll('[box="'+ boxDivCd +'"]');

  //초기화
  for(let div of sudokuDivlist){
    div.setAttribute('class', 'sudokuBox');
  }
  
  
  for(let div of boxArray){
    div.classList.add('selectBox');
  }
  for(let div of xArray){
    div.classList.add('selectX');
  }
   for(let div of yArray){
    div.classList.add('selectY');
  }
  targetDiv.classList.add('selectXY');
}

//랜덤 숫자 배열
let sudokuInitNumberSet:function;
sudokuInitNumberSet = function(){
  document.querySelectorAll('[x]')[1].querySelector('.resultP').innerHTML = '';
}
  
//keyup 이벤트;
let fArrowDownEvent:function;
fArrowDownEvent = function(e){
  let targetDiv:HTMLElement = document.querySelector('.selectXY');
  let eventDumi:Obj = {};
  eventDumi.customTarget = document.querySelector('.selectXY'); // 현재 선택된 xy;
  eventDumi.type = e.type;
  let kCode = e.keyCode;
  
  let targetDIV:HTMLElement  = eventDumi.customTarget;
  if(targetDIV == null) return;                    // 공백시 retrun;
  let targetX:number    = Number(targetDIV.getAttribute('x'));  // 선택된 X 행
  let targetY:number    = Number(targetDIV.getAttribute('y'));  // 선택된 Y 열
  let targetBox:number  = targetDIV.getAttribute('box');        // 선택된 Box
  
  //화살표 S
  
  
  const MAX:number = 9;
  const MIN:number    = 1;
  if(kCode == 39){        // 오른쪽
    if(targetX != MAX){
      targetX += 1;
    }else if (targetX == MAX && targetY != MAX){
      targetX =   MIN;
      targetY +=  1;
    }else if (targetX == MAX && targetY == MAX){
      targetX = MIN;
      targetY = MIN;
    }
  }else if(kCode == 37){  //왼쪽
    if(targetX != MIN){
      targetX -=  1;
    }else if (targetX == MIN && targetY != MIN){
      targetX =   MAX;
      targetY -=  1;
    }else if (targetX == MIN && targetY == MIN){
      targetX = MAX;
      targetY = MAX;
    }
  }else if(kCode == 38){  //위
    if(targetY != MIN){
      targetY -=  1;
    }else if (targetY == MIN && targetX != MIN){
      targetY =   MAX;
      targetX -=  1;
    }else if (targetX == MIN && targetY == MIN){
      targetX = MAX;
      targetY = MAX;
    }
  }else if(kCode == 40){  //아래
    if(targetY != MAX){
      targetY +=  1;
    }else if (targetY == MAX && targetX != MAX){
      targetY =   MIN;
      targetX +=  1;
    }else if (targetX == MAX && targetY == MAX){
      targetX = MIN;
      targetY = MIN;
    }
  }
  eventDumi.customTarget = document.querySelector("[x='" + targetX + "'][y='" + targetY + "']");
  focusHighlight(eventDumi);
  //화살표 E
  
  //memo,result 입력S;
  
  let divKeyInsert:function = function(targetEle:HTMLElement, insertNum:number, mouseToggleFlag){ // 키 입력 함수 
    if(targetEle.innerHTML == insertNum){
      targetEle.innerHTML = '';
      if(mouseToggleFlag){
        let memoDivEleList:Array<HTMLElement> = targetEle.parentElement.querySelectorAll('.memoDiv');
        for(let memoDivEle:HTMLElement of memoDivEleList){
          memoDivEle.querySelector('p').setAttribute('style', '');
        }
      }
    }else{
      targetEle.innerHTML = insertNum;
      if(mouseToggleFlag){
        let memoDivEleList:Array<HTMLElement> = targetEle.parentElement.querySelectorAll('.memoDiv');
        for(let memoDivEle:HTMLElement of memoDivEleList){
          memoDivEle.querySelector('p').setAttribute('style', 'font-size:0px');
        }
      }
    }
  }
  let resultNum:number = e.keyCode;
  if(resultNum > 0){
    if(resultNum >= 97 && resultNum <= 106){
      resultNum = (resultNum - 96);
    }else if(resultNum >= 49 && resultNum <= 58){
      resultNum = (resultNum - 48);
    }else{
      resultNum = 'x';
    }
  }else{
    resultNum = 'x';
  }

  
  
  
  if(mouseToggleFlag == false){ // 클릭안할시 메모 입력
    if(!isNaN(Number(resultNum)))
    divKeyInsert(targetDIV.childNodes[resultNum-1].querySelector('.memoP'), resultNum, mouseToggleFlag);
  }else{// 클릭시 값 입력
    if(!isNaN(Number(resultNum))) 
    divKeyInsert(targetDIV.querySelector('.resultP'), resultNum, mouseToggleFlag);
  }
  //memo,result 입력E;
  //Delete, Backspace 입력시 S
  if(e.key == 'Delete' || e.key == 'Backspace'){
    for(let ele of targetDIV.querySelectorAll('p')){
      ele.innerHTML = '';
      ele.setAttribute('style','');
    }
  }
  //Delete, Backspace 입력시 E
}
  
  
  