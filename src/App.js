import React from 'react';
import './App.scss';
import Card from './components/card/card.component';
import StatePicker from './components/state-picker/state-picker.component';

class App extends React.Component {
    render() {
        return (
            <div>
                <Card />
                <StatePicker />
            </div>
        )
    }
}

export default App;
