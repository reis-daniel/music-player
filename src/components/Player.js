import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  // UseEffect
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
  }, [currentSong]);
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

  // Async Event Handler damit die Music erst abgespielt wird, wenn setCurrentSong fertig ist.
  async function skipTrackHandler(direction) {
    // Position des aktuellen Liedes im songs-Array finden.
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // Bei onClick wird die direction mitgegeben.
    if (direction === "skip-forward") {
      // Auf setCurrentSong warten.
      await setCurrentSong(
        songs[currentIndex + 1 === songs.length ? 0 : currentIndex + 1]
      );
      if (isPlaying) audioRef.current.play();
    }
    if (direction === "skip-back") {
      await setCurrentSong(
        songs[currentIndex === 0 ? songs.length - 1 : currentIndex - 1]
      );
      if (isPlaying) audioRef.current.play();
    }
  }

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
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faBackward}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faForward}
        />
      </div>
    </div>
  );
};

export default Player;
