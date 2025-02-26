// import React from 'react'
import React, { useState } from 'react';
import * as d3 from "d3"
import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col, Container } from 'react-bootstrap'
import ScatterPlot from '../components/scatterPlot'
import BarChart from '../components/barChart'
import Tooltip from '../components/tooltips'


const csvUrl = 'https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv'

function useData(csvPath) {
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        d3.csv(csvPath).then(data => {
            data.forEach(d => {
                d.start = +d.start;
                d.tripdurationS = +d.tripdurationS;
                d.end = +d.end;
                d.tripdurationE = +d.tripdurationE;
            });
            setData(data);
        });
    }, [csvPath]);
    return dataAll;
}

const Charts = () => {
    const [month, setMonth] = React.useState('4');
    const [selectedStation, setSelectedStation] = React.useState(null);
    const [tooltipX, setTooltipX] = useState(null);
    const [tooltipY, setTooltipY] = useState(null);
    const [tooltipData, setTooltipData] = useState(null);

    const dataAll = useData(csvUrl);
    if (!dataAll) {
        return <pre>Loading...</pre>;
    };
    
    const WIDTH = 600;
    const HEIGHT = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 35 };
    const innerHeightScatter = HEIGHT - margin.top - margin.bottom;
    const innerHeightBar = HEIGHT - margin.top - margin.bottom - 120;
    const innerWidth = WIDTH - margin.left - margin.right;
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = dataAll.filter(d => {
        return d.month === MONTH[month];
    });

    const xScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationS)])
        .range([0, innerWidth])
        .nice();

    const yScaleScatter = d3.scaleLinear()
        .domain([0, d3.max(dataAll, d => d.tripdurationE)])
        .range([innerHeightScatter, 0])
        .nice();

    const reversedData = [...data].reverse();
    const xScaleBar = d3.scaleBand()
        .domain(reversedData.map((d, i) => d.station))
        .range([0, innerWidth]);

    const maxStarts = d3.max(dataAll, d => +d.start);
    const yScaleBar = d3.scaleLinear()
        .domain([0, maxStarts])
        .range([innerHeightBar, 0])
        .nice();

    const changeHandler = (event) => {
        setMonth(event.target.value);
    };

    return (
        <Container >
            <Row>
                <Col lg={3} md={2}>
                    <input key="slider" type='range' min='0' max='11' value={month} step='1' onChange={changeHandler} />
                    <input key="monthText" type="text" value={MONTH[month]} readOnly />
                </Col>
            </Row>
            <Row className='justify-content-md-center'>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <ScatterPlot
                            offsetX={margin.left}
                            offsetY={margin.top}
                            data={data}
                            xScale={xScaleScatter}
                            yScale={yScaleScatter}
                            height={innerHeightScatter}
                            width={innerWidth}
                            selectedStation={selectedStation}
                            setSelectedStation={setSelectedStation}
                            setTooltipX={setTooltipX}
                            setTooltipY={setTooltipY}
                            setTooltipData={setTooltipData}
                        />
                    </svg>
                </Col>
                <Col>
                    <svg width={WIDTH} height={HEIGHT}>
                        <BarChart
                            offsetX={margin.left}
                            offsetY={margin.top}
                            data={data}
                            xScale={xScaleBar}
                            yScale={yScaleBar}
                            height={innerHeightBar}
                            width={innerWidth}
                            selectedStation={selectedStation}
                            setSelectedStation={setSelectedStation}
                        />
                    </svg>
                </Col>
            </Row>
            <Tooltip x={tooltipX} y={tooltipY} d={tooltipData} />
        </Container>
    )
}

export default Charts;
