var currentPlayer =1; //現在的玩家
var sumPlay1Score=0; //玩家1總分
var sumPlay2Score=0;//玩家2總分
var counter =1;//搖骰子總次數
var isPlayingGame=true;//是否可以繼續玩
//隱藏骰子圖案與冠軍獎杯的圖案
document.querySelector('.dice').style  ='display:none';
document.querySelector('.winner1').style  ='display:none';
document.querySelector('.winner2').style  ='display:none';

//even監聽 新增摇骰子ONCLICK事件
document.querySelector('.roll').addEventListener('click',function(){
	if(isPlayingGame){
		var dice=Math.floor(Math.random()*6)+1;
		console.log(dice);
		document.querySelector('.dice').style  ='display:block';
		document.querySelector('.dice').src  ='dice'+ dice +'.png';
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
		if(counter===7)
		{
			if(sumPlay1Score > sumPlay2Score)
			{
				document.querySelector('.winner1').style  ='display:block';
		document.getElementById('player1Score').style='margin-top:0px';

			}
			else if (sumPlay2Score > sumPlay1Score) {
				document.querySelector('.winner2').style  ='display:block';
				document.getElementById('player2Score').style='margin-top:0px';

			}
			else {
				document.querySelector('.roll').textCotent='平手';

			}
			isPlayingGame=false;
	   }
	}
	else {
	init();
	isPlayingGame=true;
	}
});
//even監聽 新增重設遊戲ONCLICK事件
document.querySelector('.newGame').addEventListener('click',function(){
	init();
	isPlayingGame=true;
});


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