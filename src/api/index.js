import axios from 'axios';

const totalDataUrl = "https://api.rootnet.in/covid19-in/stats/latest";
const dailyDataUrl = "https://api.rootnet.in/covid19-in/stats/history";

export const fetchData = async () => {
    const response = await axios.get(totalDataUrl);
    const { total, deaths, discharged, confirmedCasesIndian, confirmedCasesForeign } = response.data.data.summary;
    const lastUpdate = response.data.lastOriginUpdate;
    console.log(new Date(lastUpdate).toDateString());
    return {
        infected: total,
        deaths: deaths,
        recovered: discharged,
        casesIndian: confirmedCasesIndian,
        casesForeign: confirmedCasesForeign,
        lastUpdate
    };

}