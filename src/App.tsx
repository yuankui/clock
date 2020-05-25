import React, {useEffect, useState} from 'react';
import './App.css';
import Clock from "./clock/Clock";

function App() {

    const [[hour, minute], setTime] = useState([0, 0]);

    useEffect(() => {
        setInterval(() => {
            const time = new Date();
            setTime([time.getHours(), time.getMinutes() + time.getSeconds() / 60]);
        }, 20);
    }, []);

    return (
        <div className="App">
            <Clock hour={hour % 12} minute={minute}/>
        </div>
    );
}

export default App;
