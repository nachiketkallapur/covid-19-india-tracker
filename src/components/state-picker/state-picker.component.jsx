import React from 'react';
import { FormControl, NativeSelect, InputLabel } from '@material-ui/core';
import './state-picker.styles.scss'; 

const StatePicker = ({ handleStateChange, stateList }) => {

    if(stateList.length === 0){
        return (
            <>
            </>
        )
    }
        
    return (
        <center className='form-control'>
            <FormControl >
            <InputLabel >Select any one State/U T</InputLabel>
            <NativeSelect defaultValue="India" onChange={(event) => handleStateChange(event.target.value)} className='native-select' >
                <option value="India">India</option>
                {
                    stateList.map(({state}, index) => (index < stateList.length - 1) ? <option key={index} value={state}>{state}</option> : null) 
                }
            </NativeSelect>
        </FormControl>
        </center>
        
    )
}

export default StatePicker;
                
                

   