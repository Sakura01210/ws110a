# 參考資料
[複製資料](https://github.com/chrislai0621/dice)完全複製


以dice.html做出網頁的主體，再以style.css做出網站整體的風格，最後再將遊戲已dice.js寫出。

先寫出現在的玩家，玩家1、2的總分，搖骰子總次數，是否可以繼續玩。
```html
var currentPlayer =1;
var sumPlay1Score=0; 
var sumPlay2Score=0;
var counter =1;
var isPlayingGame=true;
```
隱藏骰子圖案與冠軍獎杯的圖案
```html
document.querySelector('.dice').style  ='display:none';
document.querySelector('.winner1').style  ='display:none';
document.querySelector('.winner2').style  ='display:none';
```
even監聽 新增摇骰子ONCLICK事件
```html
document.querySelector('.roll').addEventListener('click',function(){
```
修改玩家1分數與總分
```html
if(currentPlayer===1)
		{
			sumPlay1Score+= dice;
			//修改玩家1分數
			//document.querySelector('#player'+ currentPlayer +'Score').innerHTML='<h1>'+ dice +'</h1>'; //#為ID .為CLASS 修改值
			document.getElementById('player'+ currentPlayer +'Score').textContent=dice; //#為ID .為CLASS 修改值
			//修改玩家1總分分數
			document.getElementById('total'+ currentPlayer +'Score').textContent=sumPlay1Score;
			//移除玩家active的class
			document.querySelector('.panel-'+ currentPlayer).classList.remove('active');
			currentPlayer=2;
			//add玩家active的class
			document.querySelector('.panel-'+ currentPlayer).classList.add('active');
			document.getElementById('player'+ currentPlayer +'Score').textContent=0; //#為ID .為CLASS 修改值

		}
		else {
			sumPlay2Score+= dice;
			//修改玩家1分數
			document.getElementById('player'+ currentPlayer +'Score').textContent=dice; //#為ID .為CLASS 修改值
			//修改玩家1總分分數
			document.getElementById('total'+ currentPlayer +'Score').textContent=sumPlay2Score;
			document.querySelector('.panel-'+ currentPlayer).classList.remove('active');
			currentPlayer=1;
			//add玩家active的class
			document.querySelector('.panel-'+ currentPlayer).classList.add('active');
			document.getElementById('player'+ currentPlayer +'Score').textContent=0; //#為ID .為CLASS 修改值
		}
		counter +=1;
```
even監聽 新增重設遊戲ONCLICK事件
```html
document.querySelector('.newGame').addEventListener('click',function(){
	init();
	isPlayingGame=true;
});
```
遊戲重新起動
```html
function init()
{
	currentPlayer =1; //現在的玩家
	sumPlay1Score=0; //玩家1總分
	sumPlay2Score=0;//玩家2總分
	counter =1;//搖骰子總次數
	//隱藏骰子圖案與冠軍獎杯的圖案
	document.querySelector('.dice').style  ='display:none';
	document.querySelector('.winner1').style  ='display:none';
	document.querySelector('.winner2').style  ='display:none';
	//修改玩家1分數為0
	document.getElementById('player1Score').textContent=0; //#為ID .為CLASS 修改值
	//修改玩家1總分分數為0
	document.getElementById('total1Score').textContent=0;
	//修改玩家2分數為0
	document.getElementById('player2Score').textContent=0; //#為ID .為CLASS 修改值
	//修改玩家2總分分數為0
	document.getElementById('total2Score').textContent=0;
	document.querySelector('.panel-1').classList.add('active');
	document.querySelector('.panel-2').classList.remove('active');
	document.querySelector('.roll').textCotent='搖骰子';
	document.getElementById('player1Score').style='margin-top:55px';
	document.getElementById('player2Score').style='margin-top:55px';

}
```
