import React, { useEffect, useState } from 'react';

import './card.styles.scss';
import { fetchData } from '../../api';


const Card = () => {
    const [covidData, setCovidData] = useState({});

    useEffect(()=>{
        const fetchFunction = async () =>{
            setCovidData(await fetchData());
        }
        fetchFunction();
    },[])

    

    console.log(covidData.infected);
    return (
        <h2>Card</h2>
    )
}

export default Card;
    