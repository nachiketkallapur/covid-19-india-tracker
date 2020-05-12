import React from 'react';
import './App.scss';
import Card from './components/card/card.component';
import StatePicker from './components/state-picker/state-picker.component';
import { fetchData } from './api';
import Chart from './components/chart/chart.component';

const totalDataUrl = "https://api.rootnet.in/covid19-in/stats/latest";


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
        this.setState({ stateList: await fetchData("send_state_data", totalDataUrl), cardData: await fetchData("send_card_data", totalDataUrl) });
    }

    handleStateChange = async (state) => {
        await this.setState({ stateChoosen: state });
    }

    render() {
        const { stateChoosen, stateList, cardData } = this.state;

        let changedCardData = {};
        changedCardData = Object.assign(changedCardData, cardData);

        stateList.filter((data) => {
            if (data.state.localeCompare(stateChoosen) === 0) {
                changedCardData = Object.assign(changedCardData, data);
            }
        })

        return (
            <div>
                <Card changedCardData={changedCardData} />
                <StatePicker stateList={stateList} handleStateChange={this.handleStateChange} />
                <Chart stateChoosen={stateChoosen}/>
            </div>
        )
    }
}

export default App;

