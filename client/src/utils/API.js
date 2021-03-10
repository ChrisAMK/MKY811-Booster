import axios from "axios";

export default {
    // Returns the result of a get request to the last entry of the Rig
    getLastEntry: (rig, page) => {
        return axios.post(`/api/${rig}/last`, {
            page: page
        })
        .then(result => result.data);
    },

    entryCheck: (rig) => {
        return axios.get(`/api/${rig}/entry`)
        .then(result => result.data)
    },

    getFullDay: (rig, year, month, day) => {
        return axios.post(`/api/${rig}/day`, {
            year: year,
            month: month,
            day: day
        })
        .then(result => result.data)
    },

    getFullHour: (rig, year, month, day, hour,) => {
        return axios.post(`/api/${rig}/day`, {
            year: year,
            month: month,
            day: day,
            hour: hour
        })
        .then(result => result.data)
    },

    getFullMinute: (rig, year, month, day, hour, minute) => {
        return axios.post(`/api/${rig}/minute`, {
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
        })
        .then(result => result.data)
    },

    getExactTime: (rig, page, year, month, day, hour, minute, second) => {
        return axios.post(`/api/${rig}/time`, {
            page: page,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        })
        .then(result => result.data)
    },

    downloadInfo: (rig) => {
        return axios.get(`/api/${rig}/all`)
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