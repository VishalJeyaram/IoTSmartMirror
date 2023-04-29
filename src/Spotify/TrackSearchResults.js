import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <div
            className="d-inline-flex m-2 align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handlePlay}
        >
            <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
            <div className="ml-3" style={{ paddingLeft: 10, color: "#1DB954" }}>
                <div> {track.title}</div>
                <div className="text-muted" >{track.artist}</div>
            </div>
        </div>
    )
}