import React, { useEffect } from 'react';
import './chart.styles.scss';
import { fetchData } from '../../api';
import { Line } from 'react-chartjs-2';

const historyDataUrl = "https://api.rootnet.in/covid19-in/stats/history";
let responseData = [];

const Chart = ({ stateChoosen }) => {

    useEffect(() => {

        const fetchfunction = async () => {
            responseData = await fetchData("send_history", historyDataUrl);
        }

        fetchfunction();
    }, []);

    if (responseData.length > 0) {
        let summaryArray = responseData.map(({ summary }) => summary);
        summaryArray = summaryArray.reverse();
        let consizedSummaryArray = summaryArray.filter((item, index) => index <= 19).map(item => item);
        consizedSummaryArray = consizedSummaryArray.reverse();

        let regionalArray = responseData.map(({ regional }) => regional);
        regionalArray = regionalArray.reverse();
        let consizedRegionalArray = regionalArray.filter((item, index) => index <= 19).map((item) => item);
        consizedRegionalArray = consizedRegionalArray.reverse();

        let tempArray = [], k = 0;

        for (let i = 0; i < 20; i++) {
            tempArray[i] = {};
        }

        for (let i = 0; i < consizedRegionalArray.length; i++) {
            for (let j = 0; j < consizedRegionalArray[i].length; j++) {
                if (consizedRegionalArray[i][j].loc.localeCompare(stateChoosen) === 0) {
                    tempArray[k] = Object.assign(tempArray[k], consizedRegionalArray[i][j]);
                    k++;
                }
            }
        }

        const stateChoosenArray = (stateChoosen === '' || stateChoosen === 'India') ? consizedSummaryArray : tempArray;

        console.log(stateChoosenArray);

        let dateArray = responseData.map(({ day }) => day)
        dateArray = dateArray.reverse();
        let consizedDateArray = dateArray.filter((item, index) => index <= 19).map(item => item);
        consizedDateArray = consizedDateArray.reverse();

        const data = {
            labels: consizedDateArray,
            datasets: [
                {
                    label: "Infected",
                    data: (stateChoosen === '' || stateChoosen === 'India') ? consizedSummaryArray.map((item) => item.total) : stateChoosenArray.map(item => item.totalConfirmed),
                    pointHoverRadius: 5,
                    borderColor: ['rgba(0,0,255,0.2)'],
                    backgroundColor: ['rgba(0,0,255,0.2)'],
                    pointBorderColor: ['rgba(0,0,255,0.2)'],
                    pointBackgroundColor: ['rgba(0,0,255,0.2)']
                },
                {
                    label: "Active",
                    data: (stateChoosen === '' || stateChoosen === 'India') ? consizedSummaryArray.map((item) => item.total - item.deaths - item.discharged) : stateChoosenArray.map(item => item.totalConfirmed - item.deaths - item.discharged),
                    pointHoverRadius: 5,
                    borderColor: ['rgba(0,0,255,0.5)'],
                    backgroundColor: ['rgba(0,0,255,0.5)'],
                    pointBorderColor: ['rgba(0,0,255,0.5)'],
                    pointBackgroundColor: ['rgba(0,0,255,0.5)']

                },
                {
                    label: "Recovered",
                    data: (stateChoosen === '' || stateChoosen === 'India') ? consizedSummaryArray.map((item) => item.discharged) : stateChoosenArray.map(item => item.discharged),
                    pointHoverRadius: 5,
                    borderColor: ['rgba(0,255,0,0.5)'],
                    backgroundColor: ['rgba(0,255,0,0.5)'],
                    pointBorderColor: ['rgba(0,255,0,0.5)'],
                    pointBackgroundColor: ['rgba(0,255,0,0.5)']

                },
                {
                    label: "Deaths",
                    data: (stateChoosen === '' || stateChoosen === 'India') ? consizedSummaryArray.map((item) => item.deaths) : stateChoosenArray.map(item => item.deaths),
                    pointHoverRadius: 5,
                    borderColor: ['rgba(255,0,0,0.8)'],
                    backgroundColor: ['rgba(255,0,0,0.8)'],
                    pointBorderColor: ['rgba(255,0,0,0.8)'],
                    pointBackgroundColor: ['rgba(255,0,0,0.8)']
                }
            ]
        };

        const options = {
            title: {
                display: true,
                text: "COVID-19 Data Analytics for last 20 days"
            },
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of cases'
                        },
                        ticks: {
                            min: 0,
                        }
                    }
                ],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Last 20 Days'
                    }
                }]
            }
        }

        return (
            <center>
                <div className='chart-container'>
                    <Line data={data} options={options} />
                </div>
            </center>

        )
    }

    else {
        return (
            <center>
                <big>
                    Loading... App Please Wait!<br/>
                    If the problem persists refresh the page
                </big>
            </center>
        )
    }
}

export default Chart;







