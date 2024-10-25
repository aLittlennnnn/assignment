//`<XAxis />` has the following properties,
// - xScale: the scale of the x-axis
// - height: the height of the scatter plot
// - width: the width of the scatter plot
// - axisLabel: the name of the axis
// - `<YAxis />` has the following properties,
// - yScale: the scale of y-axis
// - height: the height of the scatter plot
// - axisLabel: the name of the axis
// - **`<Points />`**: it is defined in the module points.js. The radius of each `<circle />` is 5 and the color is `steelblue`, and the `<Points />` has the following properties,
// - data: the data items
// - xScale: the scale for the x coordinate
// - yScale: the scale for the y coordinate
// import React, { useState } from 'react';
import React from 'react';
import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

function XAxis(props){
    const { xScale, height, width, axisLable } = props;
    //Note:
    //1. XAxis works for two cases: the xScale is linear (i.e., scatter plot) and the xScalse is discrete (i.e., bar chart)
    //2. you can use typeof(xScale.domain()[0]) to decide the return value
    //3. if typeof(xScale.domain()[0]) is a number, xScale is a linear scale; if it is a string, it is a scaleBand.
    
    if(xScale) {
        return <g>
        {typeof xScale.domain()[0] === 'number' ? (
            <>
                <g ref={ref => ref && select(ref).call(axisBottom(xScale))} transform={`translate(0, ${height})`} />
                <text
                    style={{ textAnchor: 'end', fontSize: '15px' }}
                    x={width} 
                    y={height - 10} 
                    dy="-0.5em"
                >
                    {axisLable}
                </text>
                    </>
        ) : (
            <>
                <g
                            ref={ref => {
                                if (ref) {
                                    const axis = axisBottom(xScale).ticks(0);
                                    select(ref).call(axis);
                                    select(ref).selectAll("line").remove();
                                    select(ref).selectAll("text")
                                        .attr("transform", "rotate(60)")
                                        .style("text-anchor", "start");
                                }
                            }}
                            transform={`translate(0, ${height})`}
                        />
                        <text
                            style={{ textAnchor: 'middle', fontSize: '15px' }}
                            x={xScale(xScale.domain()[0]) + xScale.bandwidth() / 2}
                            y={height + 20}
                        >
                            {axisLable}
                        </text>
            </>
        )}
        </g>
    }else {
    return <g></g>
}
}

export default XAxis