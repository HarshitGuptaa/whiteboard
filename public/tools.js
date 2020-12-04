let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let penColors = document.querySelectorAll(".pencil-colors div");
let pencilSize = document.querySelector("#pencilSize");
let eraserSize = document.querySelector("#eraserSize");

// ctx.lineWidth = 40;

// let activeTool = "pencil";
let pencilWidth = 1;
let eraserWidth = 1;


pencilSize.addEventListener("change" , function(e){
    let size = e.target.value;
    pencilWidth = size;
    ctx.lineWidth = pencilWidth;
})

eraserSize.addEventListener("change" , function(e){
   let size = e.target.value;
   eraserWidth = size;
   ctx.lineWidth = eraserWidth;
})

pencil.addEventListener("click" , function(){
    // canvas.style.cursor = "pointer";
    if( !pencil.classList.contains("active-tool")){
        eraser.classList.remove("active-tool");
        eraserOptions.classList.add("hide");
        pencil.classList.add("active-tool");
        ctx.strokeStyle = "black";
        ctx.lineWidth = pencilWidth;
    }
    else{
        // already active hai tool
        if(pencilOptions.classList.contains("hide")){
            pencilOptions.classList.remove("hide");
        }
        else{
            pencilOptions.classList.add("hide");
        }
    }
})





//pencolor
for(let i=0;i<penColors.length;i++){
    penColors[i].addEventListener("click",function(){
        if(penColors[i].classList.contains("red")){
            ctx.strokeStyle = "red";
        }else if(penColors[i].classList.contains("yellow")){
            ctx.strokeStyle = "yellow";
        }else if(penColors[i].classList.contains("blue")){
            ctx.strokeStyle = "blue";
        }else{
            ctx.strokeStyle = "black";
        }
    })
}


eraser.addEventListener("click" , function(){
    // canvas.style.cursor = URL(eraser.png);
    if(  !eraser.classList.contains("active-tool") ){
        pencil.classList.remove("active-tool");
        pencilOptions.classList.add("hide");
        eraser.classList.add("active-tool");
        ctx.strokeStyle = "white";
        ctx.lineWidth = eraserWidth;
    }
    else{
        // already active hai tool
        if(eraserOptions.classList.contains("hide")){
            eraserOptions.classList.remove("hide");
        }
        else{
            eraserOptions.classList.add("hide");
        }
    }
})




undo.addEventListener("click",function(){
    if(pointsDB.length){
        let latestLine = pointsDB.pop();
        redoPoints.push(latestLine);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawPoints();
    }
});


redo.addEventListener("click",function(){
    if(redoPoints.length){
        let line = redoPoints.pop();
        pointsDB.push(line);

        for(let i=0 ; i<line.length ; i++){
            
            ctx.lineWidth = line[i].lineWidth;
            ctx.strokeStyle = line[i].strokeStyle;
            
            if(line[i].id == "md"){
                ctx.beginPath();
                ctx.moveTo(line[i].x , line[i].y);
            }
            else{
                ctx.lineTo(line[i].x , line[i].y);
                ctx.stroke();
            }
        }  
    }
});


function drawPoints() {
    for (let i = 0; i < pointsDB.length; i++) {
      let line = pointsDB[i];
      for(let j=0 ; j<line.length ; j++){
       
        ctx.lineWidth = line[j].lineWidth;
        ctx.strokeStyle = line[j].strokeStyle;
       
        if(line[j].id == "md"){
              ctx.beginPath();
              ctx.moveTo(line[j].x , line[j].y);
          }
          else{
              ctx.lineTo(line[j].x , line[j].y);
              ctx.stroke();
          }
      }
    }
}