'use strict';

var data = new Object();
data.nick = ""
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
		//data.roundtarget = parseInt(window.prompt("How many rounds you wanna play?\nMax:23",1))
		data.roundtarget = parseInt(data.DOM["roundinput"].value)
		data.nick = data.DOM["nickinput"].value || "Player"

		if(isNaN(data.roundtarget)){
			data.roundtarget=1
		}else{
			data.roundtarget = Math.min(Math.max(data.roundtarget,1),23)
		}
		
		data.DOM["menu-start"].hidden=true
		data.DOM["menu-ingame"].hidden=false
		
		update_stats()
		
	}
	
	
	function play(){
		data.round++
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
		
		if(data.round>data.roundtarget){
			data.DOM["round"].innerHTML = data.roundtarget+"/"+data.roundtarget
			/*
			if(data.scoreP1>data.scoreP2){ 
				window.alert("nice you win")
			}else if(data.scoreP1<data.scoreP2){
				window.alert("well... you lose")
			}else{
				window.alert("gg draw")
			}
			*/
			
			//var modaltwo = document.getElementById("modal-two").getElementsByClassName("content")[0]
			var modaltwo = document.getElementById("modal-two")
			modaltwo.children[1].remove()
			
			var div = document.createElement("div")
			div.className = "content"
			div.innerHTML = data.scoreP1>data.scoreP2 ? "Nice! "+ data.nick +" Wins" : data.scoreP1<data.scoreP2 ? "Well... "+ data.nick +" Lose" : "GG "+ data.nick +" draw with PC"
			div.innerHTML += "<p>Your Score: " + data.scoreP1+"</p>"
			div.innerHTML += "<p>PC Score: " + data.scoreP2+"</p>"
			div.innerHTML += "<p>Total rounds: " + data.roundtarget+"</p>"
			
			modaltwo.appendChild(div)
			/*
			<p>meh</p>
			<p>Your Score: </p>
			<p>PC Score: </p>
			<p>Total rounds:</p>
			*/
			data.DOM["trigger-modal-two"].click()
			
			data.DOM["menu-start"].hidden=false
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
		for (key of ["trigger-modal-two","menu-start","start-game","menu-ingame",
		"score","round","img1","img2","nickinput","roundinput","modal-two"]){
			newarr[key] = document.getElementById(key)
		}
		return newarr;
	}
	
	
	
	//modal
	
	var modals = document.getElementsByClassName("modal")
	
	var showModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.add('show');
		
		var key
		for(key of document.getElementsByClassName("modal")){
			key.classList.remove("show")
		}
		document.querySelector(this.dataset["modal"]).classList.add("show")
	};
	

	var modalLinks = document.querySelectorAll('.show-modal');
	
	for(var i = 0; i < modalLinks.length; i++){
		modalLinks[i].addEventListener('click', showModal);
	}
	

	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);

	var modals = document.querySelectorAll('.modal');
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}
	
	
}