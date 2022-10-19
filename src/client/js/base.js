let n_click = document.getElementById("non_click");

n_click.addEventListener("mouseover",(event)=>{
    event.target.style.color="aqua";
},false);
n_click.addEventListener("mouseout",(event)=>{
    event.target.style.color="black";
},false);
