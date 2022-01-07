/*
 * @Author: CSU_XZY
 * @Date: 2020-10-17 12:38:26
 * @LastEditors: CSU_XZY
 * @LastEditTime: 2020-10-18 22:40:24
 * @FilePath: \第二天\snake\snake.js
 * @Description: just to play
 */

window.onload = function(){
    var snake = function(width,height,snakeId,speed){
     this.width = width || 10;
     this.height = height || 10;
     this.snakeId = snakeId || "snake";
     this.goX = 0;
     this.goY = 0;
     this.speed = this.oldSpeed = speed || 10;
     this.Grid = []; //存放td的二維陣列
     this.snakeGrid = []; //存放蛇的陣列
     this.foodGrid = [];
     this.snakeTimer = null;
     this.derectkey = 39;
     this.stop = true;
     this.init();
     document.getElementById("myAudio").play();
     box.style.animationPlayState = 'running'
    }
   
    snake.prototype = {
     //建立二維陣列
     multiArray : function(m,n)
     {
      var array = new Array(m); //長
      for(let i = 0; i < m; i++)
      {
       array[i] = new Array(n); //寬
      }
      return array;
     },//函式修正this
     bind : function(fn,context)
     {
      return function(){
    return fn.apply(context,arguments);
    }
     },//移動的主函式
     move:function(){
    var _this = this;
    if(_this.snakeTimer){clearInterval(_this.snakeTimer);}
    _this.snakeTimer = setInterval(_this.bind(_this.main,_this),Math.floor(3000/this.speed));
     },//重來
     reset()
     {
      this.goX = 0;
      this.goY = 0;
      this.speed = this.oldSpeed;
      this.derectkey = 39;
      this.stop = true;
      this.init();
     },//確定鍵盤事件
     keyDown : function(e)
     { 
      var e = e || window.event;
      var keycode = e?e.keyCode:0;
      if(keycode == 116 )
      window.location.reload();
      if(keycode == 32)
      {
       if(this.stop)
       {
        this.move();
        this.stop = false;
       }
       else{
        if(this.snakeTimer)
        clearInterval(this.snakeTimer);
        this.stop = true;
       }
      }
      if(keycode>=37 && keycode <= 40)
       {
        if(!this.stop)
        this.derectkey = keycode;
       }
      return false;
     },//建立地圖
     creatMap : function()
     {
      var table = document.createElement("table");
      var tbody = document.createElement("tbody");
      for(let i = 0; i < this.width; i++)
      {
       var tr = document.createElement("tr");
       for(let j = 0; j < this.height; j++)
       {
        var td = document.createElement("td");
        this.Grid[i][j] = tr.appendChild(td);
       }
       tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      table.id = this.snakeId;
      document.body.appendChild(table);
     },//產生隨機點
     randomPoint : function(initX,initY,endX,endY)
     {
      var p = []; //用來存放產生的隨機點的陣列
      var initX = initX || 0;
      var initY = initY || 0;
      var endX = endX || this.width;
      var endY = endY || this.height;
      p[0] = Math.floor(Math.random()*(endX - initX)) + Math.floor(initX);
      p[1] = Math.floor(Math.random()*(endY - initY)) + Math.floor(initY)
      return p;
     },//初始化食物的位置
     initFood : function()
     {
      this.foodGrid = this.randomPoint();
   
      if(this.isInSnake(this.foodGrid))
      {
       this.initFood();
       return false;
      }
      this.Grid[this.foodGrid[0]][this.foodGrid[1]].className = "food";
     },//判斷點是否在蛇身上
     isInSnake : function(point,pos)
     {
      var snakeGrid = this.snakeGrid;
      if(point instanceof Array)
      {
       let n = snakeGrid.length;
       for(let i = pos || 0; i < n; i++)
       {
        if(point[0] == snakeGrid[i][0] && point[1] == snakeGrid[i][1])
        return true;
       }
      }
      return false;
     },//給蛇塗顏色
     paintSnake : function(){
      var snakeGrid = this.snakeGrid;
      for(let i = 0; i < snakeGrid.length; i++)
      {
       this.Grid[snakeGrid[i][0]][snakeGrid[i][1]].className = "snake_body";
      }
     },//初始化蛇的位置
     initSnake : function()
     {
      this.snakeGrid = [];
   
      this.snakeGrid.push([1,3]);
      this.snakeGrid.push([1,2]);
      this.snakeGrid.push([1,1]);
   
      this.paintSnake();
   
      this.Grid[this.snakeGrid[0][0]][this.snakeGrid[0][1]].className = "snake_head";
      this.Grid[this.snakeGrid[this.snakeGrid.length-1][0]][this.snakeGrid[this.snakeGrid.length-1][1]].className = "snake_tail";
     },//判斷蛇是否撞牆
     isInWall : function(point){
      if(point instanceof Array){
       if(point[0] < 0 || point[0] > this.width1 - 1 || point[1] < 0 || point[1] > this.height - 1)
       return true;
      } 
      return false;
     },//初始化條件
     
     //控制函式執行的主函式
     main : function(){
      var snakeGrid = this.snakeGrid;
      var temp = snakeGrid[snakeGrid.length-1],isEnd = false;
       headX = snakeGrid[0][0];
       headY = snakeGrid[0][1];
       msg = "";
      switch(this.derectkey)
      {
       case 37:
     if(this.goY!=1){this.goY=-1;this.goX=0} //防止控制蛇往相反反方向走
     break;
    case 38:
     if(this.goX!=1){this.goX=-1;this.goY=0}
     break;
    case 39:
     if(this.goY!=-1){this.goY=1;this.goX=0}
     break;
    case 40:
     if(this.goX!=-1){this.goX=1;this.goY=0}
      }
      headX += this.goX;
      headY += this.goY;
   
      if(headX == this.foodGrid[0] && headY == this.foodGrid[1])
      {
       this.snakeGrid.unshift(this.foodGrid);
       this.initFood();
       if(this.snakeGrid.length>4){ //控制蛇加速
     if(this.snakeGrid.length==5){
     this.speed += 5;
     }
     else if(this.snakeGrid.length==10){
     this.speed += 3;
     }
     else if(this.snakeGrid.length==20){
     this.speed += 3;
     }
     else if(this.snakeGrid.length==30){
     this.speed += 3;
     }
     this.move();
    }
      }
      else
      {
       for(var i=this.snakeGrid.length-1;i>0;i--){
     this.snakeGrid[i] = this.snakeGrid[i-1] ;
    }
       this.snakeGrid[0] = [headX,headY]; 
       if(this.isInSnake(this.snakeGrid[0],1)){
     isEnd=true;
     msg = "哈皮，吃到自己啦!!";
    }
    //判斷是否撞牆
    else if(this.isInWall(this.snakeGrid[0])){
     isEnd =true;
     msg = "撒比偉哥，撞牆了!!";
       }
       if(isEnd)
       {
        if(this.snakeTimer)
        clearInterval(this.snakeTimer);
        var score;
        let len = this.snakeGrid.length;
        if(len <= 5)
        score = len-3;
        else if(len>5 && len<=10)
        {
         score = 2 + 2*(len-5)
        }
        else if(len>10 && len <= 20)
        score = 12 + 3*(len-10);
        else
        score = 27 + 5*(len - 15);
        if(confirm(msg+"你的分數是:"+score+"! 是否重新開始？")){
     this.reset();
     }
     return false;
       }
       this.Grid[temp[0]][temp[1]].className = "notSnake";
      }
      this.paintSnake();
      this.Grid[headX][headY].className = "snake_head";
      this.Grid[this.snakeGrid[this.snakeGrid.length-1][0]][this.snakeGrid[this.snakeGrid.length-1][1]].className = "snake_tail";
     },init : function(){
      var _this = this;
      snake_id = document.getElementById(_this.snakeId)||0 ;
    if(snake_id){
    document.body.removeChild(snake_id);
    }
      _this.Grid = _this.multiArray(_this.width,_this.height);
      _this.creatMap();
      _this.initSnake();
      _this.initFood();
      document.onkeydown = _this.bind(_this.keyDown,_this);
     }
    }
    new snake(20,20,"snake",10);
   }