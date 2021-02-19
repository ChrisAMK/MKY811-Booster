import axios from "axios";

export default {
    // Returns the result of a get request to the Google Books API
    getLastEntry: (query) => {
        return axios.get("/api/rig021/last")
        .then(result => result.data);
    },

    // Performs a get request to the server to get all the saved books in the database
    getBoosterInfo: () => {
        return axios.get("/api/booster").then(result => result.data);
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