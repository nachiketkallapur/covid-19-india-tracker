import axios from 'axios';

const totalDataUrl = "https://api.rootnet.in/covid19-in/stats/latest";
const historyDataUrl = "https://api.rootnet.in/covid19-in/stats/history";

export const fetchData = async (value, url) => {
    if (url.localeCompare(totalDataUrl) === 0) {
        const response = await axios.get(url);

        const { total, deaths, discharged, confirmedCasesIndian, confirmedCasesForeign } = response.data.data.summary;
        const lastUpdate = response.data.lastOriginUpdate;
        const stateListFromResponse = response.data.data.regional;

        const stateList = stateListFromResponse.map(({ loc, totalConfirmed, deaths, discharged, confirmedCasesIndian, confirmedCasesForeign }) => {
            return {
                state: loc,
                infected: totalConfirmed,
                deaths: deaths,
                recovered: discharged,
                casesIndian: confirmedCasesIndian,
                casesForeign: confirmedCasesForeign,
                lastUpdate
            }
        })

        if (value === "send_state_data") {
            return stateList;
        }

    }

    else if (url.localeCompare(historyDataUrl) === 0) {
        const response = await axios.get(historyDataUrl);

        const lastUpdate = response.data.lastOriginUpdate;

        console.log(response.data.data[response.data.data.length - 1].regional);
         
        let totalValue = 0, deathsValue = 0, recoveredValue = 0, casesIndianValue = 0, casesForeignValue = 0;

        for(let i=0;i < response.data.data[response.data.data.length - 1].regional.length -1 ; i++ ){
            let item = response.data.data[response.data.data.length - 1].regional[i];
            totalValue = totalValue + item.totalConfirmed;
            deathsValue = deathsValue + item.deaths;
            recoveredValue = recoveredValue + item.discharged;
            casesIndianValue = casesIndianValue + item.confirmedCasesIndian;
            casesForeignValue = casesForeignValue + item.confirmedCasesForeign;
        }
        
        if(value==="send_history"){
            return response.data.data;
        }

        else if (value === "send_card_data") {
            return {
                infected: totalValue,
                deaths: deathsValue,
                recovered: recoveredValue,
                casesIndian: casesIndianValue,
                casesForeign: casesForeignValue,
                lastUpdate
            };
        }
        

    }
}
