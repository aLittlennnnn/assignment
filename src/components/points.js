// import React from 'react';

import React, { useState } from 'react';

function Points(props) {
    const {data, xScale, yScale, height, width, setSelectedStation, selectedStation, setTooltipX, setTooltipY, setTooltipData } = props;

    const getColor = (station) => {
        return station === selectedStation ? 'red' : 'steelblue';
    };
    const getRadius = (station) => {
        return station === selectedStation ? 10 : 5;
    };
    const handleMouseEnter = (event, station) => {
        setSelectedStation(station.station);
        setTooltipX(event.pageX);
        setTooltipY(event.pageY);
        setTooltipData(station);
    };
    const handleMouseOut = () => {
        setSelectedStation(null);
        setTooltipX(null);
        setTooltipY(null);
        setTooltipData(null);
    };
    
    if (data) {
        const points = data.map((d, i) => {
            const cx = xScale(d.tripdurationS);
            const cy = yScale(d.tripdurationE);
            return (
                <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={getRadius(d.station)}
                    fill={getColor(d.station)}
                    stroke="black"
                    strokeWidth={1}
                    onMouseEnter={(event) => handleMouseEnter(event, d)}
                    onMouseOut={handleMouseOut}
                />
            );
        });

        return (
            <g>
                {points}
                {selectedStation && (
                    <rect
                        x={0}
                        y={0}
                        width={width}
                        height={height}
                        fill="yellow"
                        opacity={0.5}
                        pointerEvents="none"
                    />
                )}

                {selectedStation && data.map((d, i) => {
                    if (d.station === selectedStation) {
                        const cx = xScale(d.tripdurationS);
                        const cy = yScale(d.tripdurationE);
                        return (
                            <circle
                                key={`highlight-${i}`}
                                cx={cx}
                                cy={cy}
                                r={10}
                                fill="red"
                                stroke="black"
                                strokeWidth={1}
                                style={{ pointerEvents: 'none' }}
                            />
                        );
                    }
                    return null;
                })}
            </g>
        );
    }  else {
        return <g></g>
    }
}

export default Points