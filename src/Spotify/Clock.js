
import React, { useEffect, useState } from "react";

function Clock() {
    const [clockState, setClockState] = useState();
    const [clockState2, setClockState2] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleTimeString());
            setClockState2(date.toLocaleDateString());
        }, 1000);
    }, []);

    return <div style={{ fontSize: "55px", margin: "60px", backgroundColor: "black" }}><div>{clockState2}</div><div>{clockState}</div></div>;
}

export default Clock;