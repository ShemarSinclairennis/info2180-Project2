//Author: Shemar Ennis
//ID#:620111861

window.onload =() =>

{
	//Variables added for tile pieces
	let p_area = document.getElementById("puzzlearea");
	let children = document.querySelectorAll("#puzzlearea div")
	//Variable added for shuffle button 
	let shufflebutton = document.getElementById("shufflebutton")

	//Wariables added to act as axis for tiles
	let x=0;
	let y =0;
	let count =0;

	//Space variables added to assist move function 
	let space1= '300px';
	let space2= '300px';

	//Variable added to assist game win and change function
	var b_ground;

	//Variable added to add a restart button to web page
	var restartbutton = document.createElement("input")
		restartbutton.type ="submit"
		restartbutton.value ="Restart Game"
	//Appends the restartbutton created to web page
		document.body.appendChild(restartbutton);


	//For loop created to help positioning of tiles 
	for (let i=0; i< children.length; i++)
		{

			children[i].classList.add("puzzlepiece");

			children[i].style.left = x+"px";  
			children[i].style.top = y+"px";
			//Line of code to help position of image in each tile
			children[i].style.backgroundPosition = `${-x}px ${-y}px`;
			x +=100;
			count +=1;

			if (count%4==0){

				y+=100;
				x=0;
			}

			//Event listeners added for hovering operations
			children[i].addEventListener("mouseover",red_zone);
			children[i].addEventListener("mouseout",black_zone);

			//Event listener added to move tiles on click
			children[i].addEventListener("click",slide);
			
		  }
		  	//Event listners added to allow shuffle and restart button to operate
		  	shufflebutton.addEventListener("click",shuffle);
		  	restartbutton.addEventListener("click",restart);


	//Red_zone and Black_zone functions added for hovering effect
	function red_zone()
			{
				if(move(parseInt(this.innerHTML)))
				{
					this.style.border = "2px solid red";
					this.style.color = "#006600";
				}
			};

	function black_zone()
			{
				this.style.border = "2px solid black";
				this.style.color = "#000000";
			};


	//Restart function added to restart game
	function restart()
	{
		location.reload();
	}

	//Functions added to help extra feature (changing background)
	function Gamewin()
	{
		let body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "#D3D3D3";
		b_ground = 10;
		timer = setTimeout(change,100);
	}


	function finish()
	{
		let flag = true;
		for (let i = 0; i<children.length; i++)
		{
			let a = parseInt(children[i].style.top);
			let b = parseInt(children[i].style.left);

			if (b !=(i%4*100) || a != parseInt(i/4)*100)
			{
				flag=false;
				break;
			}
		}
		return flag;
	}

	function change()
	{
    	let text = document.getElementsByClassName("explanation");
   	 	b_ground --;
   		if (b_ground == 0)
	    {
	        var body = document.getElementsByTagName('body');
	        body[0].style.backgroundColor = "#FFFFFF";
	        text[0].innerHTML = "CONGRATULATION YOU WIN";
	        text[1].innerHTML = "If you would like to play again ,select Restart Game";
	        stoptime();
	        return;
	    }
	    if (b_ground % 2)
	    {
	        var body = document.getElementsByTagName('body');
	        body[0].style.backgroundColor = "#D3D3D3";    
	    }
	    else
	    {
        	var body = document.getElementsByTagName('body');
        	body[0].style.backgroundColor = "#01FEED";
    	}
    	timer = setTimeout(change, 100);
	}

	//Extra feature functions end here

	//Function to allow tiles to chagned their position
	function slide ()
			{
				if(move(parseInt(this.innerHTML)))
				{
					swap(this.innerHTML-1);
					if(finish())
					{
						Gamewin();
					}
					return;
				}
			};

	//Shuffle allowinng functions to randomly chagne position 
	function shuffle()
	{
		for (var i=0; i<250; i++)
        {
            let rand = parseInt(Math.random()* 100) %4;
            if (rand == 0)
            {
                let mve = UP(space1,space2);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }
            if (rand == 1)
            {
                let mve = DOWN(space1,space2);
                if ( mve != -1) 
                {
                    swap(mve);
                }
            }

            if (rand == 2)
            {
                let mve = LEFT(space1,space2);
                if ( mve != -1)
                {
                    swap(mve);
                }
            }

            if (rand == 3)
            {
                let mve = RIGHT(space1,space2);
                if (mve != -1)
                {
                    swap(mve);
                }
            }
        }
	}

	//Helper function for slide and shuffle
	function swap (pos)
	{
		let temp = children[pos].style.top;
		children[pos].style.top= space2;
		space2 = temp;

		temp=children[pos].style.left;
		children[pos].style.left = space1;
		space1 = temp;
	}



	//Main movement function 
	function move(pos)
	{
		if (LEFT(space1,space2) == (pos-1))
		{
			return true;
		}

		if(DOWN(space1,space2) == (pos-1))
		{
			return true;
		}

		if(UP(space1,space2) == (pos-1))
		{
			return true;
		}

		if(RIGHT(space1,space2) == (pos-1))
		{
			return true;
		}
	}


	function UP (x, y)
	{
	    var xx = parseInt(x);
	    var yy = parseInt(y);
	    if (yy > 0)
	    {
	        for (var i=0; i<children.length; i++)
	        {
	            if (parseInt(children[i].style.top) + 100 == yy && parseInt(children[i].style.left) == xx) 
	            {
	                return i;
	            }
	        } 
	    }
	    else 
	    {
	        return -1;
	    }
	}

	function DOWN (x, y)
	{
	    var xx = parseInt(x);
	    var yy = parseInt(y);
	    if (yy < 300)
	    {
	        for (var i=0; i<children.length; i++)
	        {
	            if (parseInt(children[i].style.top) - 100 == yy && parseInt(children[i].style.left) == xx) 
	            {
	                return i;
	            }
	        }
	    } 
	    else
	    {
	        return -1;
	    } 
	}

	function LEFT(x, y)
	{
	    var xx = parseInt(x);
	    var yy = parseInt(y);

	    if (xx > 0)
	    {
	        for (var i = 0; i < children.length; i++) 
	        {
	            if (parseInt(children[i].style.left) + 100 == xx && parseInt(children[i].style.top) == yy)
	            {
	                return i;
	            } 
	        }
	    }
	    else 
	    {
	        return -1;
	    }
	}

	function RIGHT (x, y)
	{
	    var xx = parseInt(x);
	    var yy = parseInt(y);
	    if (xx < 300)
	    {
	        for (var i =0; i<children.length; i++)
	        {
	            if (parseInt(children[i].style.left) - 100 == xx && parseInt(children[i].style.top) == yy) 
	            {
	                return i;
	            }
	        }
	    }
	    else
	    {
	        return -1;
	    } 
	}
}
