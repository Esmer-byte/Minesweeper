	var firstClick = 0;
	var deployedBombs = [], deployedSafe = [100];
	var bombs = 1, number = 1;
	var win = 30 - bombs;
	var matrix = [];
      for(var i = 1; i <= 6; i++) {
         matrix[i] = [];
         for(var j = 1; j <= 5; j++) {
            matrix[i][j] = number;
            number++;
         }
      }
	function startGame() {
		
		deployBombs();
		deploySafe();
		var buttonNumber = 1, flagNumber, bombNumber, safeNumber;
		while (buttonNumber <= 30) {
			$('#list').append(`
               <button id = "`+ buttonNumber +`" type = "button" onclick = "return takeSpot(` + buttonNumber + `);" onmousedown = " return checkWhich(` + buttonNumber + `); " class = "btn btn-primary btn-lg wrapper1"><i class="las la-stop"></i></button>
				`);
			flagNumber = buttonNumber + 100;
			bombNumber = buttonNumber + 200;
			safeNumber = buttonNumber + 300;
			$('#list').append(`
               <button id = "`+ flagNumber +`" type = "button" onmousedown = " return checkReverse(` + flagNumber + `); " class = "btn btn-warning btn-lg wrapper1"><i class="las la-radiation-alt"></i></button>
				`);
			$('#list').append(`
               <button id = "`+ bombNumber +`" type = "button"  class = "btn btn-danger btn-lg wrapper1"><i class="las la-bomb"></i></button>
				`);
			$('#list').append(`
               <button id = "`+ safeNumber +`" type = "button" class = "btn btn-success btn-lg wrapper1"> (` + deployedSafe[buttonNumber] + `) </button>
				`);
			$('#' + flagNumber).hide();
			$('#' + bombNumber).hide();
			$('#' + safeNumber).hide();
			if(buttonNumber % 5 == 0) {
				$('#list').append(`
					<div> </div>
					`);
			}
			buttonNumber++;
		}
	}
	
	function takeSpot(buttonNumber) {
		var bombNumber = buttonNumber + 200;
		var safeNumber = buttonNumber + 300;
		$('#' + buttonNumber).hide();
		if(deployedBombs.indexOf(buttonNumber) != -1) {
			$('#' + bombNumber).show();
			detonate();
		} else {
			$('#' + safeNumber).show();
			win--;
		}
		defuse();
		return false;	
	}
	
	function detonate() {
		var bombNumber, flagNumber;
		for(var i = 0; i < 8; i++) {
			bombNumber = deployedBombs[i] + 200;
			flagNumber = deployedBombs[i] + 100;
			$('#' + bombNumber).show();
			$('#' + deployedBombs[i]).hide();
			$('#' + flagNumber).hide();
		}
		alert("You lost!");
	}

	function defuse() {
		if(win == 0) {
			alert("You woon!");
		}
	}

	function deployBombs() {
		var maximum = 31, minimum = 1, ok = 0;
		var bomb = Math.floor(Math.random() * (maximum - minimum) + minimum);
		while(bombs != 0) {
			while(ok == 0) {
				if(deployedBombs.indexOf(bomb) == -1) {
					deployedBombs.push(bomb);
			      for(var i = 1; i <= 6; i++) {
			         for(var j = 1; j <= 5; j++) {
			            if(matrix[i][j] == bomb) {
			            	matrix[i][j] = bomb + 100;
			            }
			         }
			      }
					ok = 1;	
				} else {
					bomb = Math.floor(Math.random() * (maximum - minimum) + minimum);
				}
			}
			ok = 0;
			bombs--;
			
		}
		for(var i = 1; i <= 6; i++) {
			  for(var j = 1; j <= 5; j++) {
			  	if(matrix[i][j] < 99) {
			  		matrix[i][j] = 0;
			  	}
			  }
			}
		
	}

	function deploySafe() {
		for(var i = 1; i <= 6; i++) {
			for(var j = 1; j <= 5; j++) {
				if(matrix[i][j] > 99) {
					if(i - 1 != 0) {
						matrix[i - 1][j]++;
					}
					if(i + 1 <= 6) {
						matrix[i + 1][j]++;
					}
					if(j - 1 != 0) {
						matrix[i][j - 1]++;
					}
					if(j + 1 <= 5) {
						matrix[i][j + 1]++;
					}


					if(i - 1 != 0 && j - 1 != 0) {
						matrix[i - 1][j - 1]++;
					}
					if(i + 1 <= 6 && j + 1 <= 5) {
						matrix[i + 1][j + 1]++;
					}
					if(j - 1 != 0 && i + 1 <= 6) {
						matrix[i + 1][j - 1]++;
					}
					if(j + 1 <= 5 && i - 1 != 0) {
						matrix[i - 1][j + 1]++;
					}	
				} 
			}
	    
		  
		}
		for(var i = 1; i <= 6; i++) {
		  for(var j = 1; j <= 5; j++) {
		  	 if(matrix[i][j] < 99) {
		  	 	deployedSafe.push(matrix[i][j]);
		  	 } else {
		  	 	deployedSafe.push(-1);
		  	 }
		  }
	    }
		
	  }


    function checkWhich(buttonNumber) {
    flagNumber = buttonNumber + 100;
	if (event.which == 3) {
		  alert("You marked the button!");
	      $('#' + buttonNumber).hide();
	      $('#' + flagNumber).show();
	    }
	    return false;
	}

   	function checkReverse(flagNumber) {
    buttonNumber = flagNumber - 100;
	if (event.which == 3) {
		  alert("You unmarked the button!");
	      $('#' + buttonNumber).show();
	      $('#' + flagNumber).hide();
	    }
	    return false;
	} 