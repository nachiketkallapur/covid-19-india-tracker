import React from 'react';
import './card.styles.scss';
import { Grid, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';


const Card = ({ changedCardData }) => {
    if (Object.keys(changedCardData).length === 0) {
        return (
            <></>
        )
    }

    console.log(changedCardData);

    const { infected, recovered, deaths, lastUpdate } = changedCardData;

    return (
        <div xs={12} md={3}>
            <Grid container className='grid-container'>
            <Grid item className={`infected common-to-card`}>
                <CardContent>
                    <Typography><b>Infected</b></Typography>
                    <Typography>
                        <CountUp start={0} end={infected} duration={1.5} separator=',' />
                    </Typography>
                    <Typography>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography>Number of affected by COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item className={`active common-to-card`}>
                <CardContent>
                    <Typography><b>Active</b></Typography>
                    <Typography>
                        <CountUp start={0} end={infected - recovered - deaths} duration={1.5} separator=',' />
                    </Typography>
                    <Typography>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography>Number of active cases of COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item className={`recovered common-to-card`}>
                <CardContent>
                    <Typography><b>Recovered</b></Typography>
                    <Typography>
                        <CountUp start={0} end={recovered} duration={1.5} separator=',' />
                    </Typography>
                    <Typography>{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography>Number of recoveries from COVID-19</Typography>
                </CardContent>
            </Grid>
            <Grid item className={`deaths common-to-card`}>
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
        </div>
    )
}

export default Card;
