import React from 'react';
import ReactApexChart from 'react-apexcharts';
import  axios from 'axios';
import temp from 'temp';
class ApexChart extends React.Component {
constructor(props) {
super(props);

this.state = {

  series: [{
    name: 'candle',
    data: []
  }],
  chartlive : [],
  options: {
   
    chart: {
      type: 'candlestick',
      height: 100
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled : false
      }
    },
    yaxis: {
      tooltip: {
        enabled: false
      }
    }
  },


};
}
componentDidMount(){
  setInterval(()=>{
    axios({
      url:"https://api.anteagle.tech/chartdata",
      method:"get",
      headers:{
        'Accept' : "application/json" 
      }
    }).then(res=>{
      
      for(let i=0;i<res.data.data.length;i++){
        var temp = []
        var dateStr=res.data.data[i].time; 
        const test = new Date(dateStr)
        
        var a=dateStr.split(" ");
        var d=a[0].split("-");
        var t=a[1].split(":");
        var formatedDate = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);
        temp.push(test.getTime())
        temp.push(res.data.data[i].open)
        temp.push(res.data.data[i].high)
        temp.push(res.data.data[i].low)
        temp.push(res.data.data[i].close)   
        console.log(temp)   
        this.state.series[0].data.push(temp)
      }
    })
   },10000)
}


render() {
  return (
<div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
</div>
          )
        }
      }
export default ApexChart;