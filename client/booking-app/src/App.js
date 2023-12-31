import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Gallery } from './components/Gallery/Gallery';
import { Footer } from './components/Footer/Footer';
import { TheIsland } from './components/TheIsland/TheIsland';
import video from './assets/video.mp4'
import { Villas } from './components/Villas/Villas';
function App() {
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);


  return (
    <div className={`body ${isHomePage ? 'home-background' : 'background'}`}>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/theIsland' element={<TheIsland />} />
        <Route path='/villas' element={<Villas />} />
      </Routes>
    </main>
    <Footer/>
    {isHomePage && (
      <div className="video-background">
        <video src={video} autoPlay loop muted>
          
        </video>
      </div>
    )}
  </div>
  );
}

export default App;
