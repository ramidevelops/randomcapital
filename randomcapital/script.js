
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

let price;

fetch('https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=1000')
.then(res => res.json())
.then(data => {


    const mappedData = data.map( d =>{
        price = parseFloat(data[999][4]).toFixed(2)
            return {time: d[0]/1000, open: parseFloat(d[1]), high: parseFloat(d[2]), low: parseFloat(d[3]), close: parseFloat(d[4])};
    })
    
    candleSeries.setData(mappedData)
}).catch(err => console.log(err));

//EMA


    const emaDom = document.getElementById('emavalue');
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhbWlkZXZlbG9wc0BnbWFpbC5jb20iLCJpYXQiOjE2MzE2NjAwMDIsImV4cCI6NzkzODg2MDAwMn0.ta682GMYRX6brX2AKB4sI1fM5OUfhhZmItW4QKZ8eDU'
    const urlToFetch = `https://api.taapi.io/ema?secret=${apiKey}&exchange=binance&symbol=ETH/USDT&interval=1d&optInTimePeriod=50`;

    const getEma = async ()=>{

        try{
        const response = await fetch(urlToFetch)
        if(response.ok){
            const jsonResponse = await response.json();
            emaDom.innerHTML = jsonResponse.value.toFixed(2);//`<br>${price}`;
        }
    }catch(err){
        console.log(err)
    }
}

getEma();