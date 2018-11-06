//Author: Shemar Ennis
//ID#:620111861

window.onload =() =>

{
	let p_area = document.getElementById("puzzlearea");
	let children = document.querySelectorAll("#puzzlearea div")


	let x=0;
	let y =0;
	let count =0;

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
			children[i].addEventListener("mouseover",red);
			children[i].addEventListener("mouseout",black);
			
		  }

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
}
