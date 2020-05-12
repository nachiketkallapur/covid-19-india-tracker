import React from 'react';
import { FormControl, NativeSelect, InputLabel } from '@material-ui/core';
import './state-picker.styles.scss'; 

const StatePicker = ({ handleStateChange, stateList }) => {

    if(stateList.length === 0){
        return (
            <center>
                <big>Please Wait!</big>
            </center>
        )
    }
        
    return (
        <center className='form-control'>
            <FormControl>
            <InputLabel >Select any one state </InputLabel>
            <NativeSelect defaultValue="India" onChange={(event) => handleStateChange(event.target.value)} className='native-select' >
                <option value="India">India</option>
                {
                    stateList.map(({state}, index) => <option key={index} value={state}>{state}</option>) 
                }
            </NativeSelect>
        </FormControl>
        </center>
        
    )
}

export default StatePicker;
                
                

   