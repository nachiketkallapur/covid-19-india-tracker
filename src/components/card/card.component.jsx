import React, { useEffect, useState } from 'react';

import './card.styles.scss';
import { fetchData } from '../../api';

import { Grid, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';


const Card = () => {
    const [covidData, setCovidData] = useState(null);

    useEffect(() => {
        const fetchFunction = async () => {
            setCovidData(await fetchData());
        }

        fetchFunction();

    }, [])

    if (!covidData) {
        return (
            <center>
                Loading...
            </center>
        )
    }

    const { infected, recovered, deaths, lastUpdate } = covidData;
    
    return (
        <Grid container className='grid-container'>
            <Grid item className='infected'>
                <CardContent>
                    <Typography><b>Infected</b></Typography>
                    <Typography>
                        <CountUp start={0} end={infected} duration={1.5} separator=',' />
                    </Typography>
                    <Typography>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography>Number of affected from COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item className='recovered'>
                <CardContent>
                    <Typography><b>Recovered</b></Typography>
                    <Typography>
                        <CountUp start={0} end={recovered} duration={1.5} separator=',' />
                    </Typography>
                    <Typography>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography>Number of recoveries from COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item className='deaths'>
                <CardContent>
                    <Typography><b>Deaths</b></Typography>
                    <Typography>
                        <CountUp start={0} end={deaths} duration={1.5} separator=',' />
                    </Typography>
                    <Typography>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography>Number of deaths from COVID-19</Typography>
                </CardContent>
            </Grid>
        </Grid>
    )
}

export default Card;
