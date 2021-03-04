import axios from "axios";

export default {
    // Returns the result of a get request to the last entry of the Rig
    getLastEntry: (rig) => {
        return axios.get(`/api/${rig}/last`)
        .then(result => result.data);
    },

    setInfo: (hours, temp) => {
        
        return axios.post("/api/booster", {
            hours: hours,
            temp: temp
        })
        .then(result => result.data);
    },

    getLastLog: () => {
        return axios.get("/api/last").then(result => result.data);
    },



}