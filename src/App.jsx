import { useState, useRef, useEffect } from "react";
import axios from "axios"; 
import Spinner from "./components/Spinner";
import teamLogo from "./assets/logo.png"
import bg from "./assets/background.png";
import themeMusic from "./assets/music.mp3";

function App() {
  const [names, setNames] = useState([
  "Anas Anas",
  "Ahmed Sayed",
  "Menna Hashem",
  "Gemy Abd Al Fattah",
  "Mariam Hussein",
  "Abdelrahman Ahmed",
  "Mahitab M. Hammoda",
  "Mohamed Mofeed",
  "Yara Sayed"
]);
  const [winner, setWinner] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAsImZuYW1lIjoiTW9hdGF6IiwibG5hbWUiOiJBaG1lZCIsImVtYWlsIjoibW9hdGF6YWhtZWQ2OTZAZ21haWwuY29tIiwidXNlcm5hbWUiOiJNT0FUQVpfQUhNRUQiLCJyb2xlIjoidGVjaG5pY2FsIiwiZXZlbnRfaWQiOiI1LTE4IiwiY3JlYXRlZEF0IjoiMjAyNS0wOC0xNlQxODozNToxMS4wMDBaIiwiaWF0IjoxNzU3OTE4Mzk4LCJleHAiOjE3NTgwMDQ3OTh9.fCe6acSOnF4kAN7lH7EpiCHkAy4NUQ97ztoQf54pQo0"; 
  const audioRef = useRef(null);

//   useEffect(() => {
//     const fetchNames = async () => { 
//       try {
//         const res = await axios.get("https://api.180daraga.com/api/event/newstage18/attendance/?date=2025-9-15", {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });
//         setNames(res.data.message.map(user => user.name));
//       } catch (error) {
//         console.error("Failed to fetch names:", error);
//       }
//     };

//     fetchNames();
//   }, []);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const pickRandomName = () => {
    startMusic();

    if (winner) {
      setNames((prev) => prev.filter((name) => name !== winner));
      setWinner("");
    }

    setIsLoading(true);
    setWinner("");
    setShowCelebration(false);

    let interval;
    let cycleCount = 0;
    const maxCycles = 15;

    interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      setWinner(names[randomIndex]);
      cycleCount++;

      if (cycleCount >= maxCycles) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
        }, 100);
      }
    }, 300);
  };

  return (
    <>
      <audio ref={audioRef} src={themeMusic} loop />

      <div className="min-h-screen bg-cover bg-center bg-no-repeat flex" style={{ backgroundImage: `url(${bg})` }}>  
        {/* Main Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="font-Harry tracking-[4px] text-[6rem] text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              NEW STAGE 18
            </h1>
            <p className="text-[1rem] text-[#ff9d69] -my-3">
              Click the button below to randomly select a winner!
            </p>
          </div>

          {/* Winner Display */}
          {winner && (
            <div className={`mb-8 text-center transition-all ${showCelebration ? "scale-110" : "scale-100"}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-[1.1rem] text-white/80">✨Winner✨</span>
                </div>
                <h2 className={`text-[2rem] font-bold text-white transition-all duration-300 ${isLoading ? "blur-lg" : "blur-none"}`}>
                  {winner}
                </h2>
              </div>
            </div>
          )}

          {/* Pick Button */}
          <button
            onClick={pickRandomName}
            disabled={names.length === 0 || isLoading}
            className={`group relative px-10 py-4 text-[1.3rem] font-bold rounded-2xl transition-all duration-300 transform shadow-xl ${
              names.length === 0
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : isLoading
                ? "bg-[#850000] text-white scale-95 cursor-wait shadow-xl"
                : "bg-[#850000] text-white shadow-lg hover:scale-110 hover:bg-[#5e0000] hover:shadow-xl"
            }`}
          >
            <span className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}>
              {names.length === 0 ? "No Names Found" : "Wingardium Leviosa!"}
            </span>
            {isLoading && <Spinner />}
          </button>

          <img src={teamLogo} alt="Team Logo" className="w-[12%] absolute bottom-4 left-4 " />
        </div>
      </div>
    </>
  );
}

export default App;
