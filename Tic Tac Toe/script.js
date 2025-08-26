let boxes=document.querySelectorAll(".but");  //array of all buttons
let resetbut=document.querySelector("#reset");
let newbut=document.querySelector("#newgame");
let turnX=true;   //assume playerX is playing
let msgcont=document.querySelector(".msgcontainer");
let msg=document.querySelector("#msg");

//winning patterns
let winArr=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//to check the winning patterns
const checkWinner=()=>{
    for(let win of winArr){
        //to compare the values for output
        let pst1=boxes[win[0]].innerText;
        let pst2=boxes[win[1]].innerText;
        let pst3=boxes[win[2]].innerText;
        // console.log(boxes[win[0]],boxes[win[1]],boxes[win[2]]);

        if(pst1!=""&&pst2!=""&&pst3!=""){
            if(pst1===pst2 && pst2===pst3){
                showWinner(pst1);   //the position 1 value will be winner as it will match the win array.
                // console.log("winner")
            }
        }
    }
    //after getting our first winner all buttons will disabled.
    boxes.disabled="true";  
}

const reset=()=>{
    for(let box of boxes){
        box.innerText='';
        msgcont.classList.add("hide");
    }
    enableboxes();
}

//for enabling all boxes again
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled= false;
    }
}

//for disabling the buttons
const diableboxes=()=>{
    for(let box of boxes){
        box.disabled= true;
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations to the Winner ${winner}`;
    msg.style.color="white";
    diableboxes();
    msgcont.classList.remove("hide");   //this will remove the hide class from msgcount and msg will appear.

}

//event listener to each box from boxes array
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){
            turnX=false;
            box.innerText="X";
            box.style.color="white";
            console.log("x is playing");
        }else{
            turnX="true";
            box.innerText="O";
            box.style.color="black";
            console.log("o is playing");
        }
        box.disabled="true";

        checkWinner();
    });    
    // console.log(box); 
});

resetbut.addEventListener("click",reset);
newbut.addEventListener("click", reset);

