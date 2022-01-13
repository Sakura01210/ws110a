function Dice(){
    this.x = 100;
    this.y = 100;
    this.num = 3;
    this.showNum = function(){
    alert(this.num);
    };
    this.play = function(){
    // 去除小數點(隨機取數1~6)
    var n = Math.floor(Math.random()*6)+1;
    //去除小數點
    console.log( "點數:" + n);
    this.num=n;
    };
    
    }