import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from 'src/app/contexts/ThemeContext';

const VideoCarousel = () => {
  const arq = [
    '/video1.mp4',
    '/video2.mp4',
    '/video3.mp4',
  ];

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
      console.log("VideoCarousel atualizou");
  }, [theme])

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % arq.length);
    }, 4900);


    return () => clearInterval(interval);
  }, []);  

  return (
    <div className={`container min-h-screen mx-auto max-w-flex max-w-sm grid grid-cols-1 flex place-content-center  place-items-center items-center justify-center justify-self-center content-center self-center
    ${theme === 'dark' ? 'bg-inherit' : 'bg-inherit'}`}>

      {arq.map((video, index) => (
        <Link href="/products">
          <video
            src={video}
            style={{ height: 'auto', width: 'auto' }}
            autoPlay loop muted
            className={index === currentVideoIndex ? 'visible' : 'hidden'}
          />
        </Link>
      ))}
    </div>
  )
}

export default VideoCarousel;
