//Author: Shemar Ennis
//ID#:620111861

window.onload =() =>

{
	let p_area = document.getElementById("puzzlearea");
	let children = document.querySelectorAll("#puzzlearea div")

	let shufflebutton = document.getElementById("shufflebutton")


	let x=0;
	let y =0;
	let count =0;
	let space1= '300px';
	let space2= '300px';
	var b_ground;
	var restartbutton = document.createElement("input")
		restartbutton.type ="submit"
		restartbutton.value ="Restart Game"

	for (let i=0; i< children.length; i++)
		{

			children[i].classList.add("puzzlepiece");

			children[i].style.left = x+"px";  
			children[i].style.top = y+"px";
			children[i].style.backgroundPosition = `${-x}px ${-y}px`;
			x +=100;
			count +=1;

			if (count%4==0){

				y+=100;
				x=0;
			}
			children[i].addEventListener("mouseover",red_zone);
			children[i].addEventListener("mouseout",black_zone);
			children[i].addEventListener("click",slide);
			
		  }

		  	shufflebutton.addEventListener("click",shuffle);


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

	function restart()
	{
		location.reload();
	}


	function Gamewin()
	{
		let body = document.getElementsByTagName('body');
		body[0].style.backgroundColor = "grey";
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
	        text[1].innerHTML = "CONGRATULATION YOU WIN";
	        stoptime();
	        return;
	    }
	    if (b_ground % 2)
	    {
	        var body = document.getElementsByTagName('body');
	        body[0].style.backgroundColor = "grey";    
	    }
	    else
	    {
        	var body = document.getElementsByTagName('body');
        	body[0].style.backgroundColor = "green";
    	}
    	timer = setTimeout(change, 100);
	}


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

	function swap (pos)
	{
		let temp = children[pos].style.top;
		children[pos].style.top= space2;
		space2 = temp;

		temp=children[pos].style.left;
		children[pos].style.left = space1;
		space1 = temp;
	}


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
	        for (var i =0; i<children.length; i++){
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
