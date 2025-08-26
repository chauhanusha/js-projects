const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");  //will return a nodelist of both from and to selects
// console.log(dropdown);

let but=document.querySelector("form button");
let fromCurr= document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg= document.querySelector(".msg");

//to add all countries in select
for(let select of dropdown){
    for(let currCode in countryList){
        //newoption to add it into dropdown select
        let newoption=document.createElement("option");
        //newoption's text will be the code of currency
        newoption.innerText=currCode;

        //for usd in from and inr in to
        if(select.name==="from" && currCode==="USD"){
            newoption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newoption.selected="selected";
        }
        //now this newoption will be appended to existing options in select
        select.append(newoption);
    }

    //this basically prints the changes when changing the select option
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

//this is a function which is basically to fetch data from api and using it to calculate rate.
const updateRate = async()=>{
    let amount= document.querySelector(".amount input");  //will return the input from the amount div
    // console.log(amount); 
    let amtval=amount.value;  //as the value is the entered text in input
    // console.log(amtval);

    if(amtval === " "|| amtval < 1){
        amtval=1;
        amount.value="1";  //the input type is text thats why
    }

    // console.log(fromCurr.value, toCurr.value);  //this will print the values of both selects 
    const url=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;  //using this url we can fetch data

    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];  //in api data is a object with 2 properties one is date and second is value
    // console.log(rate);f

    let finalamt = amtval * rate;  
    msg.innerText=` ${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`; //will print the final output to the msg
};


//flag changes according to country
const updateFlag = (element)=>{
    // console.log(element);//it prints the element selected
    let currCode=element.value;
    let countryCode=countryList[currCode];  //will have the code of country such as for currency code INR country code be IN and so on
    //now we have to access the flags here, we are using that image api
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;  //this will print flag according to the countryCode which is basically select
    let img=element.parentElement.querySelector("img");
    //now we are changing the image src because now we have flags according to selected element
    img.src=newsrc;
    // console.log(currCode,countryCode);
};


//by clicking the button exchange rate should be printed
but.addEventListener("click", (evt)=>{
    evt.preventDefault();   //this is written because a button in a form has its own behavior which we want to disable and write our own work.  
    updateRate();
});

//this event listener is used so whenever the document is open it shows the exchange rate.
window.addEventListener("load",()=>{
    updateRate();
});

