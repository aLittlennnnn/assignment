import React, { useState } from 'react';
// import React from 'react';
import XAxis from './xAxis';
import YAxis from './yAxis';
import Points from './points';
// console.log("ScatterPlot component rendered with data:", data);


function ScatterPlot(props){
    const { offsetX, offsetY, data, xScale, yScale, height, width, selectedStation, setSelectedStation, setTooltipX, setTooltipY, setTooltipData } = props;

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            <Points data={data} xScale={xScale} yScale={yScale} height={height} width={width} selectedStation={selectedStation}
            setSelectedStation={setSelectedStation} setTooltipX={setTooltipX} setTooltipY={setTooltipY} setTooltipData={setTooltipData}/>
            <YAxis yScale={yScale} height={height} axisLable={"Trip duration end in"} />
            <XAxis xScale={xScale} height={height} width={width} axisLable={"Trip duration start from"} />
        </g>
    );
}

export default ScatterPlot