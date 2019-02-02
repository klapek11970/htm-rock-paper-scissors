'use strict';
window.onload = function () {

	var scoreP1 = 0
	var scoreP2 = 0
	var P1select
	var P2select

	var round = 1
	var roundtarget = 1
	
	var items = ["rock.svg","paper.svg","scissors.svg"]
	
	var DOM = getElements()

	DOM["start-game"].addEventListener('click', function() {
		game_init()
	})

	DOM["rock"].addEventListener('click', function() {
		play(0)
	})
	DOM["paper"].addEventListener('click', function() {
		play(1)
	})
	DOM["scissors"].addEventListener('click', function() {
		play(2)
	})
	
	
	function game_init(){
		scoreP1 = 0
		scoreP2 = 0
		P1select = 1
		P2select = 1
		
		round = 1
		roundtarget = 1
		roundtarget = parseInt(window.prompt("How many rounds you wanna play?\nMax:6",1))
		if(isNaN(roundtarget)){
			roundtarget=1
		}else{
			roundtarget = Math.min(Math.max(roundtarget,1),6)
		}
		DOM["start-game"].parentNode.hidden=true
		DOM["menu-ingame"].hidden=false
		
		update_stats()
		
	}
	
	
	function play(a){
		round++
		P1select = a
		P2select = Math.floor(Math.random()*3)
		
		if(P1select==P2select){
			
		}else if(P1select==1 & P2select==0){
			scoreP1++
		}else if(P1select==0 & P2select==2){
			scoreP1++
		}else if(P1select==2 & P2select==0){
			scoreP1++
		}else{
			scoreP2++
		}
		
		update_stats()
		
		if(round>=roundtarget){
			DOM["round"].innerHTML = roundtarget+"/"+roundtarget
			if(scoreP1>scoreP2){
				window.alert("nice you win")
			}else if(scoreP1<scoreP2){
				window.alert("well... you lose")
			}else{
				window.alert("gg draw")
			}
			DOM["start-game"].parentNode.hidden=false
			DOM["menu-ingame"].hidden=true
			
		}
		
	}
	
	function update_stats(){
		DOM["score"].innerHTML = scoreP1+":"+scoreP2
		DOM["round"].innerHTML = round+"/"+roundtarget
		
		DOM["img1"].src = items[P1select]
		DOM["img2"].src = items[P2select]
	}
	
	function getElements(){
		var newarr=[]
		var key
		for (key of ["start-game","menu-ingame","rock","paper","scissors","score","round","img1","img2"]){
			newarr[key] = document.getElementById(key)
		}
		return newarr;
	}

}