import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  // Event Handlers
  const playSongHandler = () => {
    /* .play() und pause() -> Funktionen von <audio>.
    1. Wenn der State isPlaying = true -> pause(). 
    2. Wenn isPlaying=false -> play(). 
    !Wichtig ist, dass wir den State in beiden Conditions aktualisieren! */

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // Event Handler um Zeiten zu formattieren.
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  // Event Handler für das Range-Input
  const dragHandler = (e) => {
    // !e.target.value besitzt den ausgewählten input-value
    // audioRef mit dem Wert aktualisieren, damit der Song auch zu der entsprechenden Stelle springt.
    audioRef.current.currentTime = e.target.value;
    // State ändern: songInfo -> setSongInfo der currentTime wird auf e.target.value gesetzt.
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faBackward} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faForward} />
      </div>
    </div>
  );
};

export default Player;
