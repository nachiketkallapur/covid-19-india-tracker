import React,{useEffect} from 'react';
import axios from 'axios';
import './tests.styles.scss';

const testDataUrl = "https://api.rootnet.in/covid19-in/stats/testing/latest";
let totalSamplesTested;

const Tests = () =>{
    useEffect(() => {
        const fetchFunction = async () =>{
            const response = await axios.get(testDataUrl);
            totalSamplesTested = response.data.data.totalSamplesTested;
        }

        fetchFunction();
    } )

    return(
        <div className = 'tests'>
            <marquee><big>India has tested {totalSamplesTested} samples till today</big></marquee>
        </div>
    )
}

export default Tests;