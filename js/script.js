'use strict';

var data = new Object();
data.scoreP1 = 0
data.scoreP2 = 0
data.P1select
data.P2select

data.round = 1
data.roundtarget = 1
	
data.items = ["rock.svg","paper.svg","scissors.svg"]
data.DOM
data.buttons

window.onload = function () {
	data.DOM = getElements()
	data.buttons = document.getElementsByClassName("player-move")
	
	data.DOM["start-game"].addEventListener('click', function() {
		game_init()
	})

	for(var key of data.buttons){
		key.addEventListener('click', play);
	}
	
	function game_init(){
		data.scoreP1 = 0
		data.scoreP2 = 0
		data.P1select = 1
		data.P2select = 1
		
		data.round = 1
		data.roundtarget = 1
		data.roundtarget = parseInt(window.prompt("How many rounds you wanna play?\nMax:23",1))
		if(isNaN(data.roundtarget)){
			data.roundtarget=1
		}else{
			data.roundtarget = Math.min(Math.max(data.roundtarget,1),23)
		}
		data.DOM["start-game"].parentNode.hidden=true
		data.DOM["menu-ingame"].hidden=false
		
		update_stats()
		
	}
	
	
	function play(){
		data.round++
		console.log(this)
		data.P1select = this.dataset["move"] == "rock" ? 0 : this.dataset["move"] == "paper" ? 1 : 2
		data.P2select = Math.floor(Math.random()*3)
		
		if(data.P1select==data.P2select){
			
		}else if(data.P1select==0 & data.P2select==2){
			data.scoreP1++
		}else if(data.P1select==1 & data.P2select==0){
			data.scoreP1++
		}else if(data.P1select==2 & data.P2select==1){
			data.scoreP1++
		}else{
			data.scoreP2++
		}
		
		update_stats()
		
		if(data.round>=data.roundtarget){
			data.DOM["round"].innerHTML = data.roundtarget+"/"+data.roundtarget
			if(data.scoreP1>data.scoreP2){
				window.alert("nice you win")
			}else if(data.scoreP1<data.scoreP2){
				window.alert("well... you lose")
			}else{
				window.alert("gg draw")
			}
			data.DOM["start-game"].parentNode.hidden=false
			data.DOM["menu-ingame"].hidden=true
			
		}
		
	}
	
	function update_stats(){
		data.DOM["score"].innerHTML = data.scoreP1+":"+data.scoreP2
		data.DOM["round"].innerHTML = data.round+"/"+data.roundtarget
		
		data.DOM["img1"].src = "images/"+data.items[data.P1select]
		data.DOM["img2"].src = "images/"+data.items[data.P2select]
	}
	
	function getElements(){
		var newarr=[]
		var key
		for (key of ["start-game","menu-ingame","score","round","img1","img2"]){
			newarr[key] = document.getElementById(key)
		}
		return newarr;
	}

}