import React, { useState, useEffect } from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';
import { fetchData } from '../../api';

const StatePicker = () => {

    const [stateList, setStateList] = useState('');

    useEffect(() => {
        const fetchFunction = async () => {
            setStateList(await fetchData());
        }

        fetchFunction();
        
    }, []);

    return (
        <FormControl className='form-control'>
            <NativeSelect defaultValue="India"  >
                <option value="India">India</option>

            </NativeSelect>
        </FormControl>
    )
}

export default StatePicker;