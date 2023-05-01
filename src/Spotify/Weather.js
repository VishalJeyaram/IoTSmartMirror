import { useState } from "react";

const api = {
    key: "f49f744b773835aaa779317ef1712279",
    base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [defaultWeather, setDefaultWeather] = useState({});

    /*
      Search button is pressed. Make a fetch call to the Open Weather Map API.
    */
    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then((res) => res.json())
            .then((result) => {
                setWeather(result);
            });
    };


    return (
        <div style={{ paddingLeft: 20 }}>
            <header style={{ color: '#1db954' }}>
                {/* HEADER  */}
                <div style={{ fontSize: 40, color: "#0000FF" }}>Check the weather!</div>

                {/* Search Box - Input + Button  */}
                <div style={{ paddingTop: 4 }}>
                    <input
                        type="text"
                        placeholder="Enter city/town..."
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ height: 80, fontSize: 40 }}
                    />
                    <button style={{ height: 80, fontSize: 40 }} onClick={searchPressed}>Search</button>
                </div>

                {/* If weather is not undefined display results from API */}
                {typeof weather.main !== "undefined" ? (
                    <div style={{ paddingTop: 4, fontSize: 40 }}>
                        {/* Location  */}
                        <p>City: {weather.name}</p>

                        {/* Temperature Celsius  */}
                        <p>Temperature: {weather.main.temp}°C</p>

                        {/* Condition (Sunny ) */}
                        <p>Condition: {weather.weather[0].main}</p>
                        <p>Description: ({weather.weather[0].description})</p>
                    </div>
                ) : (
                    <div style={{ paddingTop: 4, fontSize: 40 }}>
                        {/* Location  */}
                        <p>City: </p>

                        {/* Temperature Celsius  */}
                        <p>Temperature: </p>

                        {/* Condition (Sunny ) */}
                        <p>Condition: </p>
                        <p>Description: </p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Weather;
