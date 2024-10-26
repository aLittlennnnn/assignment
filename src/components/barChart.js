import React from 'react';
import XAxis from './xAxis';
import YAxis from './yAxis';
import Bars from './bars';
//test
function BarChart(props){
    const {offsetX, offsetY, data, xScale, yScale, height, width, selectedStation, setSelectedStation} = props;
    //task1: transform the <g> with the offsets so that the barchart can show properly 
    //task2: import the components needed and uncomment the components in the return 
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        <Bars data={data} xScale={xScale} yScale={yScale} height={height} selectedStation={selectedStation}
            setSelectedStation={setSelectedStation} />
        <YAxis yScale={yScale} height={height} axisLable={"Bikers start from"} />
        <XAxis xScale={xScale} height={height} width={width} />
    </g>
}

export default BarChart