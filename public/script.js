const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d'); // getContext("2d") => context dega jisse drawing ho skti hai


//let obj = canvas.getBoundingClientRect();
//let top = obj.top 
//we used topOffSet variable as top is already present

let { top : topOffSet} = canvas.getBoundingClientRect(); //has many attr,gives us dist from top

canvas.height = window.innerHeight - topOffSet;
canvas.width = window.innerWidth;

window.addEventListener("resize" , function(){
    canvas.height = window.innerHeight - topOffSet;
    canvas.width = window.innerWidth;
    drawPoints();
})

let pointsDB = [];
let redoPoints = [];

let line = [];



let isPenDown = false;

canvas.addEventListener("mousedown",function(e){
    if(redoPoints.length){   //if we draw after undo,redo cant b done
        redoPoints = [];
    }
    isPenDown = true;
    let x = e.clientX;   //prop of canvas
    let y= e.clientY-topOffSet;
    ctx.beginPath();
    ctx.moveTo(x,y);
    let point = {
        id:"md",
        x : x,
        y : y,
        strokeStyle : ctx.strokeStyle,
        lineWidth : ctx.lineWidth
    }
    socket.emit("mousedown" , point);
    line.push(point);
});


canvas.addEventListener("mousemove",function(e){
    if(isPenDown){
        let x = e.clientX;
        let y= e.clientY-topOffSet;
        ctx.lineTo(x,y);
        ctx.stroke();
        let point = {
            id:"mm",
            x : x,
            y : y,
            strokeStyle : ctx.strokeStyle,
            lineWidth : ctx.lineWidth
        }
        socket.emit("mousemove" , point);
        line.push(point);
    }
});


canvas.addEventListener("mouseup",function(e){
    isPenDown = false;
    pointsDB.push(line);
    line=[];
})
