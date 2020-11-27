import React, { useRef, useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from "../utils/API";


// Renders when the user navigates to the Search page
function Search() {

    // setting up state for the searched books
    // eslint-disable-next-line
    const [hours, setHours] = useState("");
    // eslint-disable-next-line
    const [temp, setTemp] = useState("");

    // useRef allows us to get the value of the input from the user and search with that value
    const tempRef = useRef("");
    const hoursRef = useRef("");

    useEffect(() => {
        
        const getRigInfo = async () => {
            const rigInfo = await API.getBoosterInfo();
            const newArray = rigInfo.slice(-1).pop()
            console.log(newArray)
            setHours(newArray.hours)
            setTemp(newArray.temp)
        }

        getRigInfo()

    }, [])

    // getBook function uses the API get book function that uses the Google Books API and searches with the useRef value that the user sets
    const setBoosterInfo = () => {
        API.setInfo(hoursRef.current.value ,tempRef.current.value)
        .then(res => console.log(res))
        // .then(res => setTemp(res.data))
        .catch(err => console.log(err));
    }

    const refresh = async () => {
        const rigInfo = await API.getBoosterInfo();
        const newArray = rigInfo.slice(-1).pop()
        setHours(newArray.hours)
        setTemp(newArray.temp)
    }

    const handleSubmit = () => {
        setBoosterInfo()
    }

    const handleRefresh = () => {
        refresh()
    }

    return(
        <React.Fragment>
            <div className="row bannerBox text-center">
                <div className="col-12 col-sm-6">
                    <h1>Rig Hours</h1>
                    <h1>{hours}</h1>
                </div>
                <div className="col-12 col-sm-6">
                    <h1>Rig Temp</h1>
                    <h1>{temp}°</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-5 bannerBox text-center submitPanel">
                    <Typography id="discrete-slider" gutterBottom>
                        Select Engine Hours
                    </Typography>
                    <TextField
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputRef={hoursRef}
                    />
                    <br></br><br></br>
                    <Button variant="contained" color="primary" className="userBtn" onClick={handleRefresh}>
                        Refresh
                    </Button>
                </div>
                <div className="col-0 col-sm-2"></div>
                <div className="col-12 col-sm-5 bannerBox text-center submitPanel">
                <Typography id="discrete-slider" gutterBottom>
                        Select Engine Temperature
                    </Typography>
                    <TextField
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputRef={tempRef}
                    />
                    <br></br><br></br>
                    <Button variant="contained" color="primary" className="userBtn" onClick={handleSubmit}>
                        Submit Hours
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Search;