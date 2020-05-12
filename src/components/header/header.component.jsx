import React from 'react';
import './header.styles.scss';
import covid_img from '../../assets/covid-19-india-tracker(1).jpg';

const Header = () => {
    return (
        <center className='header'>
            <img src={covid_img} alt="covid-image" className='covid-image'/>
            COVID-19_INDIA_TRACKER
            <img src={covid_img} alt="covid-image" className='covid-image'/>
        </center>
    )
}

export default Header;
            