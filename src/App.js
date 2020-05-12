import React from 'react';
import './App.scss';
import Card from './components/card/card.component';
import StatePicker from './components/state-picker/state-picker.component';
import { fetchData } from './api';

class App extends React.Component {

    constructor() {
        super()

        this.state = {
            stateChoosen: '',
            stateList: [],
            cardData: {}
        }
    }

    async componentDidMount() {
        this.setState({ stateList: await fetchData("send_state_data"), cardData: await fetchData("send_card_data") });
    }

    handleStateChange = async (state) => {
        await this.setState({ stateChoosen: state });
    }

    render() {
        const { stateChoosen, stateList, cardData } = this.state;
        let changedCardData = {};
        changedCardData = Object.assign(changedCardData, cardData);

        // console.log("stateChoosen = " + stateChoosen);

        stateList.map((data) => {
            if (data.state.localeCompare(stateChoosen) === 0) {
                changedCardData = Object.assign(changedCardData, data);
            }
        })

        // console.log(changedCardData);


        return (
            <div>
                <Card changedCardData={ changedCardData } />
                <StatePicker stateList={stateList} handleStateChange={this.handleStateChange} />
            </div>
        )
    }
}

export default App;
