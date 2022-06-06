import {mockData} from './mockData.js';

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}




function showHigh(value){
    let maxHigh;
    for(let i=0; i<= value.length ; i++){
        if(value[i].high > maxHigh){
            maxHigh = value[i].high
        }
    }
    console.log(maxHigh)
    return maxHigh;
    }


async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    const apiKey = '2c488f6c2ce84e0493c0071c18d68154'
    let symbols = 'GME,MSFT,DIS,BNTX'
    let url = 'https://api.twelvedata.com/time_series?symbol='+ symbols +'&interval=1min&apikey='+ apiKey

    // let res = await fetch(url)
    // let data = await res.json();
    const {GME,MSFT,DIS,BNTX} = mockData;
    const stocks = [GME,MSFT,DIS,BNTX];

// stocks.forEach( stock => stock.values.reverse())

// Time Chart
new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.reverse().map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            data: stock.values.reverse().map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
        }))
    }
});

new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks.map(value => value.meta.symbol),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            data: stock.values.reverse().map(value => parseFloat(showHigh(value))),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
        }))
    }
});


}

main()





