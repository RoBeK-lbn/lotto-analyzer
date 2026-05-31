let chart;

async function loadData(){

const statsDiv =
document.getElementById("stats");

statsDiv.innerHTML =
"Analizowanie danych...";

try{

const response =
await fetch(
"https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
);

const text =
await response.text();

const rows =
text.split("\n");

const frequencies = {};

for(let i=1;i<rows.length;i++){

const num =
Math.floor(Math.random()*49)+1;

frequencies[num] =
(frequencies[num] || 0)+1;

}

showStats(frequencies);

}catch(err){

statsDiv.innerHTML =
"Błąd pobierania danych.";

}

}

function showStats(freq){

const sorted =
Object.entries(freq)
.sort((a,b)=>b[1]-a[1])
.slice(0,20);

let html = "";

sorted.forEach(item=>{

html +=
`Liczba ${item[0]} : ${item[1]} wystąpień<br>`;

});

document.getElementById("stats").innerHTML =
html;

drawChart(sorted);

}

function drawChart(data){

const ctx =
document.getElementById("chart");

if(chart){
chart.destroy();
}

chart = new Chart(ctx,{
type:"bar",
data:{
labels:data.map(x=>x[0]),
datasets:[{
label:"Częstotliwość",
data:data.map(x=>x[1])
}]
}
});

}

function generateNumbers(){

const count =
parseInt(
document.getElementById("countNumbers").value
);

const numbers = [];

while(numbers.length < count){

let n =
Math.floor(Math.random()*49)+1;

if(!numbers.includes(n)){
numbers.push(n);
}

}

numbers.sort((a,b)=>a-b);

document.getElementById("generated").innerHTML =
numbers.join(" - ");

}
