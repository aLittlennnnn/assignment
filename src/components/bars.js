import React, { useState } from 'react';

function Bars(props) {
    const {data, xScale, yScale, height, selectedStation, setSelectedStation} = props;

    const getColor = (station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };

    const handleMouseEnter = (station) => {
        setSelectedStation(station);
    };
    const handleMouseOut = () => {
        setSelectedStation(null);
    };
    
    if(data) {
        return (
            <g>
                {data.map((d, i) => (
                    <rect
                        key={i}
                        x={xScale(d.station)} 
                        y={yScale(d.start)} 
                        height={height - yScale(d.start)}
                        width={xScale.bandwidth()}
                        fill={getColor(d.station)}
                        stroke="black"
                        strokeWidth={1}
                        onMouseEnter={() => handleMouseEnter(d.station)}
                        onMouseOut={handleMouseOut}
                    />
                ))}
            </g>
        );
    } else {
        return <g></g>
    }
}

export default Bars