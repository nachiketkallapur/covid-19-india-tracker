import React from 'react';
import './App.scss';
import { fetchData } from './api';
import { Header, Card, StatePicker, Chart } from './components';
import Tests from './components/tests/tests.component';

const totalDataUrl = "https://api.rootnet.in/covid19-in/stats/latest";
const historyDataUrl = "https://api.rootnet.in/covid19-in/stats/history";

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
        this.setState({ stateList: await fetchData("send_state_data",totalDataUrl), cardData: await fetchData("send_card_data", totalDataUrl) });
    }

    handleStateChange = async (state) => {
        await this.setState({ stateChoosen: state });
    }

    render() {
        const { stateChoosen, stateList, cardData } = this.state;

        console.log(cardData)

        let changedCardData = {};
        changedCardData = Object.assign(changedCardData, cardData);

        stateList.filter((data) => {
            if (data.state.localeCompare(stateChoosen) === 0) {
                changedCardData = Object.assign(changedCardData, data);
            }
        })

        return (
            <div className='component-container'>
                <Header />
                <Tests />
                <Card changedCardData={changedCardData} />
                <StatePicker stateList={stateList} handleStateChange={this.handleStateChange} />
                <Chart stateChoosen={stateChoosen}/>
            </div>
        )
    }
}

export default App;

