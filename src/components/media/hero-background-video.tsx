"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const HERO_VIDEO_PLAYBACK_RATE = 0.65;

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
    }
  }, []);

  function slowVideo() {
    if (videoRef.current) {
      videoRef.current.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/mas-borras-home.png"
        aria-hidden="true"
        onLoadedMetadata={slowVideo}
      >
        <source
          src="/videos/mas-borras-home-mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source src="/videos/mas-borras-home-desktop.mp4" type="video/mp4" />
      </video>
      <Image
        src="/images/mas-borras-home.png"
        alt="El Mas de Borràs entre montañas y árboles de otoño al atardecer"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover motion-reduce:block"
      />
    </>
  );
}
