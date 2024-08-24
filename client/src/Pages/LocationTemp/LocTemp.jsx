import React from 'react'
import { WiCelsius } from 'react-icons/wi'
import './LocTemp.css'

const LocTemp = ({ setlocbtn }) => {
    const displayData = (weather) => {
        document.getElementById('temp').innerText = `${weather?.main?.temp}`
        document.getElementById('desc').innerText = `${weather?.weather[0]?.description}`
        document.getElementById('city').innerText = `${weather?.name}, ${weather?.sys?.country}`
        console.log(weather)
    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(ShowPos)
        }
        else {
            alert("GeoLocation Not Supported in your Device")
        }
    }
    function ShowPos(position) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=c11ef6bb5b19aebc55d38c97e77a3a55`)
            .then(res => res.json())
            .then(displayData)
            .catch(err => alert("City Not Found"))
    }
    getLocation()

    function ShowTemp() {
        setlocbtn(false)
    }

    return (
        <div className="Loc_container" onClick={ShowTemp}>
            <div className="Loc_container2">
                <div className="Temperature">
                    <p id='temp'></p><WiCelsius style={{ scale: "1", position: "relative", bottom: "5px", right: "14px" }} />
                </div>
                <div className="City_Details" id='city'></div>
                <div className="weather_description" id='desc'></div>
            </div>
        </div>
    )
}

export default LocTemp
