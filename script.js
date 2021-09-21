
//api request

//chart FETCH

const chartProperties = {
    width:300,
    height: 300,
    timeScale:{
        timeVisible: true,
        secondsVisible: false
    }
}

const tvChart = document.getElementById('tvchart');

const chart = LightweightCharts.createChart(tvChart, chartProperties);

const candleSeries = chart.addBarSeries();

const getChart = async () =>{
    
    try{
        const response = await fetch('https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=1000')
        if(response.ok){
            const jsonResponse = await response.json();
            const mappedData = await jsonResponse.map( d =>{
                return {time: d[0]/1000, open: parseFloat(d[1]), high: parseFloat(d[2]), low: parseFloat(d[3]), close: parseFloat(d[4])};
                })
            price = parseFloat(mappedData[999].close).toFixed(2)
            
            candleSeries.setData(mappedData)}

        }   catch(err){
            console.log(err)
        }
    };


//EMA


    const emaDom = document.getElementById('emadiv');
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbWlkZXZlbG9wc0BnbWFpbC5jb20iLCJpYXQiOjE2MzE2NjAwMDIsImV4cCI6NzkzODg2MDAwMn0.ta682GMYRX6brX2AKB4sI1fM5OUfhhZmItW4QKZ8eDU'
    const urlToFetch = `https://api.taapi.io/ema?secret=${apiKey}&exchange=binance&symbol=ETH/USDT&interval=1d&optInTimePeriod=50`;

    let emavalue;

    const getEma = async ()=>{

        try{
        const response = await fetch(urlToFetch)
        if(response.ok){
            const jsonResponse = await response.json();
            emavalue = jsonResponse.value.toFixed(2);
            emaDom.innerHTML = jsonResponse.value.toFixed(2);
        }
    }catch(err){
        console.log(err)
    }
};


const comparison =(price, emaPrice) =>{


    const comparisonDom = document.getElementById('comparison');


    if(price<emaPrice){
        comparisonDom.innerHTML = `assets actual price is <span style="color:red"><b>below</b></span> the 50EMA. A downtrend is expected. Play at your own risk.`
    } else {
        comparisonDom.innerHTML = `assets actual price is <span style="color:green"><b>above</b></span> the 50EMA. Asset should be longed. Keep risk management in mind.`
    }
    
};


const execute = async()=>{
    await getChart();
    await getEma();
    comparison(price, emavalue);
}

execute();