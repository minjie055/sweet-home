// JavaScript Document
var score=0;
var board=new Array();
for(var i=0;i<4;i++){
	board[i]=new Array();
}
for(i=0;i<4;i++){
	   for(var j=0;j<4;j++){
	   board[i][j]=0;
	   }
	}
function show_board(){
	alert(board);
	}
function show_score(){
	$("#score").text(score);
	}
function init(){
	for(i=0;i<4;i++){
	   for(var j=0;j<4;j++){
	   board[i][j]=0;
	   }
	}
	score=0;
	updateBoardView()
	generate_number();
}
function generate_number(){
	var randx=parseInt(Math.floor(Math.random()*4));	
	var randy=parseInt(Math.floor(Math.random()*4));
	
	while(true){
		if(board[randx][randy]==0)
		break;
		randx=parseInt(Math.floor(Math.random()*4));	
		randy=parseInt(Math.floor(Math.random()*4));
	}
	//alert(randx+" "+randy);
	var randNumber=Math.random()>0.5?2:4;
	//alert(randNumber);
	board[randx][randy]=randNumber;
	show_number(randx,randy,randNumber);	
}
function show_number(i,j,randNumber){
	var numcell=$("#number-cell-"+i+"-"+j);
	numcell.css("background-color",getNumberBackgroundColor(randNumber));
	numcell.css("color",getNumberColor(randNumber));
	numcell.text(randNumber);
	numcell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},100);
		//alert(numcell.css("left"));
}
function canMoveLeft(){
for(var i=0;i<4;i++)
    for(var j=1;j<4;j++)
	   if(board[i][j]!=0)
	      if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
	         return true;}
   return false;
}
function canMoveRight(){
for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
	   if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
	     return true;
	}
   return false;
}
function canMoveUp(){
for(var i=0;i<4;i++)
    for(var j=1;j<4;j++)
	   if(board[j][i]!=0)
	      if(board[j-1][i]==0||board[j-1][i]==board[j][i]){
	         return true;}
   return false;
}
function canMoveDown(){
for(var i=0;i<4;i++)
    for(var j=0;j<3;j++)
	   if(board[j][i]!=0)
	      if(board[j+1][i]==0||board[j+1][i]==board[j][i]){
	         return true;}
   return false;
}
function nomove(board){
    if(canMoveLeft(board)||canMoveRight(board)||canMoveUp()||canMoveDown()){
	    return false;
	}
	return true;
}
function nospace(board){
   for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
	   if(board[i][j]==0){
	     return false;
	}
   return true; 
}
//判断水平方向是否有障碍物
function noBlockHorizontal(row,col1,col2,board){
	//alert("noBlockHorizontal");
	if(col1>col2){
	for(var i=col2;i<col1;i++){
	   if(board[row][i]!=0&&board[row][i]!=board[row][col1]){return false;}
	}
	}
	else if(col2>col1){
	for(var i=col1;i<col2;i++){
	   if(board[row][i]!=0&&board[row][i]!=board[row][col1]){return false;}
	}
	}
	return true;
}
 
//判断竖直方向是否有障碍物
function noBlockVertical(col,row1,row2,board){
	//alert("noBlockHorizontal");
	if(row1>row2){
	for(var i=row2;i<row1;i++){
		//alert(board[i][col]+" "+board[row1][col]);
	   if(board[i][col]!=0&&board[i][col]!=board[row1][col]){return false;}
	}
	}
	else if(row2>row1){
	for(var i=row1;i<row2;i++){
		//alert(board[i][col]+" "+board[row1][col]);
	   if(board[i][col]!=0&&board[i][col]!=board[row1][col]){return false;}
	}
	}
	return true;
}
function isgameover(board){
	if(nomove(board)&&nospace(board)){
		alert("Game Over");
	}
}
function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0;i<4;i++){
        for ( var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('hegiht','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //NumberCell覆盖
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//返回背景色
                theNumberCell.css('color',getNumberColor(board[i][j]));//返回前景色
                theNumberCell.text(board[i][j]);
            }
        }
    }
}
function showMoveAnimation(fromx,fromy,tox,toy){
    var numbercell=$("#number-cell-"+fromx+"-"+fromy);
    var x=getPosTop(tox,toy);
	var y=getPosLeft(tox,toy);
	//alert("showMoveAnimation:   "+tox+"  "+toy+"  "+getPosTop(tox,toy)+"  "+getPosLeft(tox,toy));
    //alert(numbercell.css("top"));
	numbercell.animate({
	top:x,
	left:y
	},300);	
	//alert("2018");
}
function moveLeft(){
	if(!canMoveLeft()){
	   return false;	
	}
	var flag=[0,0,0,0];
	for(var i=0;i<4;i++){
	  for(var j=1;j<4;j++){
	    for(var k=0;k<j;k++){
		if(board[i][j]!=0){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(i,j,k,board));
		if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(i,j,k,board));
			showMoveAnimation(i,j,i,k);
			board[i][k]=board[i][j];
			board[i][j]=0;
			}  
	    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&flag[k]==0){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(i,j,k,board));
			flag[k]=1;
			showMoveAnimation(i,j,i,k);
			score+=board[i][j]*2;
			board[i][k]=board[i][j]*2;
			//$("#number-cell-"+i+"-"+j).text(board[i][k]);
			board[i][j]=0;
			}
	    }
		}
	  }
	  flag=[0,0,0,0];
	}
	
	setTimeout("show_score()",200);
	setTimeout("updateBoardView()",200);
	return true;
}
function moveRight(){
	if(!canMoveRight()){
	   return false;	
	}
	var flag=[0,0,0,0];
	for(var i=0;i<4;i++){
	  for(var j=2;j>-1;j--){
	    for(var k=3;k>j;k--){
		if(board[i][j]!=0){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(i,j,k,board));
		if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(i,j,k,board));
			showMoveAnimation(i,j,i,k);
			board[i][k]=board[i][j];
			board[i][j]=0;
			}  
	    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&flag[k]==0){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(i,j,k,board));
			flag[k]=1;
			showMoveAnimation(i,j,i,k);
			score+=board[i][j]*2;
			board[i][k]=board[i][j]*2;
			//$("#number-cell-"+i+"-"+j).text(board[i][k]);
			board[i][j]=0;
			}
	    }
		}
	  }
	  flag=[0,0,0,0];
	}
	setTimeout("show_score()",200);
	setTimeout("updateBoardView()",200);
	return true;
}
function moveUp(){
	if(!canMoveUp()){
	   return false;	
	}
	var flag=[0,0,0,0];
	for(var j=0;j<4;j++){
	  for(var i=1;i<4;i++){
		for(var k=0;k<i;k++){
		if(board[i][j]!=0){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(j,i,k,board));
		if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(j,i,k,board));
			showMoveAnimation(i,j,k,j);
			board[k][j]=board[i][j];
			board[i][j]=0;
			}  
	    else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&flag[k]==0){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(j,i,k,board));
			flag[k]=1;
			showMoveAnimation(i,j,k,j);
			score+=board[i][j]*2;
			board[k][j]=board[i][j]*2;
			//$("#number-cell-"+i+"-"+j).text(board[i][k]);
			board[i][j]=0;
			}
	    }
		}
	  }
	  flag=[0,0,0,0];
	}
	setTimeout("show_score()",200);
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown(){
	if(!canMoveDown()){
	   return false;	
	}
	var flag=[0,0,0,0];
	for(var j=0;j<4;j++){
	  for(var i=2;i>-1;i--){
		for(var k=3;k>i;k--){
			if(board[i][j]!=0){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(j,i,k,board));
		if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(j,i,k,board));
			showMoveAnimation(i,j,k,j);
			board[k][j]=board[i][j];
			board[i][j]=0;
			}  
	    else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&flag[k]==0){
			//alert(i+"  "+j+"  "+k+"  "+noBlockHorizontal(j,i,k,board));
			flag[k]=1;
			showMoveAnimation(i,j,k,j);
			score+=board[i][j]*2;
			board[k][j]=board[i][j]*2;
			//$("#number-cell-"+i+"-"+j).text(board[i][k]);
			board[i][j]=0;
			}
	    }
		}
	  }
	  flag=[0,0,0,0];
	}
	setTimeout("show_score()",200);
	setTimeout("updateBoardView()",200);
	return true;
}
$(document).keydown(function(event){
//document.addEventListener("keydown",function(event){
	//alert(event.keyCode);
	event.preventDefault();  
	switch(event.keyCode){
	case 37://left
      //alert(moveLeft());
	  if(moveLeft()){
		  generate_number();
		  isgameover(board);
	  }
	  
	 break;	
	 case 38://up
	  if(moveUp()){
		  generate_number();
		  isgameover(board);
	  }
	 break;
	 case 39://right
	  if(moveRight()){
		  generate_number();
		  isgameover(board);
	  }
	 break;
	 case 40://down
	 if(moveDown()){
		  generate_number();
		  isgameover(board);
	  }
	 break;
	}
	
});


function getPosTop(i,j){
    return $("#grid-cell-"+i+"-"+j).css("top");
}
function getPosLeft(i,j){
    return $("#grid-cell-"+i+"-"+j).css("left");
}
function getNumberBackgroundColor(randNumber){
	switch(randNumber){
	case 2:
	return "#eee4da";	
	break;
	case 4:
	return "#eee4da";	
	break;
	case 8:
	return "#f26179";	
	break;
	case 16:
	return "#f59563";	
	break;
	case 32:
	return "#f67c5f";	
	break;
	case 64:
	return "#f65e36";	
	break;
	case 128:
	return "#edcf72";	
	break;
	case 256:
	return "#edcc61";	
	break;
	case 512:
	return "#9c0";	
	break;
	case 1024:
	return "#3365a5";	
	break;
	case 2048:
	return "#09c";	
	break;
	case 4096:
	return "#a6bc";	
	break;
	case 8192:
	return "#93c";	
	break;
	}
	return "black";
}
function getNumberColor(randNumber){
	if(randNumber<=4){return "#776e65";}
	return "white";
}

