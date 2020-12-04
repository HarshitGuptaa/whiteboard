  
let toolButton = document.querySelector(".tool-button");
let toolbox = document.querySelector(".toolbox");
let cross = document.querySelector("#close-tool");
let bars = document.querySelector("#open-tool");

toolButton.addEventListener("click" , function(){
    if(toolbox.classList.contains("hide")){
        toolbox.classList.remove("hide");
        //if(cross.classList.contains("hide")){
            cross.classList.remove("hide");
            bars.classList.add("hide");
        //}
    }
    else{
        toolbox.classList.add("hide");

        cross.classList.add("hide");
        bars.classList.remove("hide");

    }
})