import React, { useState, useRef } from "react";

// Import Styles
import "./styles/app.scss";

// Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data from "./data";

function App() {
  // Ref:
  // !useRef -> to get HTML Audio Element
  const audioRef = useRef(null);

  // Event Handler um songInfo zu aktualisieren -> currentTime + duration setzen.
  const timeUpdateHandler = (e) => {
    // !e.target ist hier das Audio-Tag!
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Via Spread werden die aktuellen Daten des Objektes beibehalten
    // currentTime und duration werden aktualisiert.
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  // States:
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // State erhält Array aus data.js, indem alle Songs als Objekt hinterlegt sind.
  const [songs, setSongs] = useState(data());
  // Aktuelle Song sollte songs mit active = true sein.
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // Ist ein Song aktiv am laufen? Default auf false!
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        // !OnLoadedMetadata wird genutzt, damit
        // !die duration beim Laden der Seite direkt gesetzt wird!
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
