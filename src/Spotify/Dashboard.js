import React from "react";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import useAuth from "./hooks/useAuth";
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from "./TrackSearchResults";
import Player from "./Player";
//import WeatherMaps from "../About";
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Clock from "./Clock";
import Weather from "./Weather";


const spotifyApi = new SpotifyWebApi({
    clientId: "dc4e82fc9fb246baa4518ad6fb7c8200"
})

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
    }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        },
                        track.album.images[0]
                    )

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                })
            )
        })

        return () => (cancel = true)
    }, [search, accessToken])

    const [currentTime, setCurrentTime] = useState(0);
    const [currentTime1, setCurrentTime1] = useState(0);
    const [currentTime2, setCurrentTime2] = useState(0);
    const [currentTime3, setCurrentTime3] = useState(0);
    const [currentTime4, setCurrentTime4] = useState(0);
    const [currentTime5, setCurrentTime5] = useState(0);
    const [currentTime6, setCurrentTime6] = useState(0);
    const [currentTime7, setCurrentTime7] = useState(0);
    const [currentTime8, setCurrentTime8] = useState(0);
    const [currentTime9, setCurrentTime9] = useState(0);


    useEffect(() => {
        fetch('/time').then(res => res.json()).then(data => {
            //const doubled = data.time.map((number) => number);
            setCurrentTime(data.time[0]);
            setCurrentTime1(data.time[1]);
            setCurrentTime2(data.time[2]);
            setCurrentTime3(data.time[3]);
            setCurrentTime4(data.time[4]);
            setCurrentTime5(data.time[5]);
            setCurrentTime6(data.time[6]);
            setCurrentTime7(data.time[7]);
            setCurrentTime8(data.time[8]);
            setCurrentTime9(data.time[9]);
        });
    }, []);

    useEffect(() => {
        fetch('/weather').then(res => res.json()).then(data => {
            //const doubled = data.time.map((number) => number);
            setCurrentTime(data.time[0]);
            setCurrentTime1(data.time[1]);
            setCurrentTime2(data.time[2]);
            setCurrentTime3(data.time[3]);
            setCurrentTime4(data.time[4]);
            setCurrentTime5(data.time[5]);
            setCurrentTime6(data.time[6]);
            setCurrentTime7(data.time[7]);
            setCurrentTime8(data.time[8]);
            setCurrentTime9(data.time[9]);
        });
    }, []);

    return (
        <div
            style={{ backgroundColor: "black", height: "200vh" }}>
            <Row>
                <Col style={{ paddingLeft: 30, paddingTop: 30 }}>
                    <div style={{ color: '#1db954', fontSize: 40 }}>
                        Here are your list of events lined up!
                    </div>
                    <div style={{ fontSize: 30 }}>
                        <div style={{ color: '#1db954' }}>
                            {currentTime}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime1}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime2}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime3}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime4}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime5}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime6}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime7}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime8}
                        </div>
                        <div style={{ color: '#1db954' }}>
                            {currentTime9}
                        </div>
                    </div>
                </Col>
                <Col>
                    <div style={{ paddingLeft: 500, backgroundColor: "black", color: "#1db954" }}>
                        <Clock></Clock>
                    </div>
                </Col>
            </Row>
            <Weather />
            <Container className="d-flex flex-column py-2" style={{ height: "30vh" }}>
                <div>
                    <Form.Control
                        type="search"
                        placeholder="Search Songs/Artists"
                        color="#1db954"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{ backgroundColor: "black", color: "#1db954", height: 80, fontSize: 40 }}
                    />
                    <div >
                        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
                    </div>
                    <div className="flex-grow-1 my-2" style={{
                        overflowY:
                            "auto"
                    }}>
                        {searchResults.map(track => (
                            <TrackSearchResult
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}