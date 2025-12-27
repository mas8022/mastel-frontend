"use client";
import "plyr-react/plyr.css";
import { Plyr } from "plyr-react";

const VideoPlayer = ({ src = "", auto = false }) => {
  return (
    <div className="w-full h-full">
      <Plyr
        source={{
          type: "video",
          sources: [{ src, type: "video/mp4" }],
        }}
        options={{
          autoplay: auto,
          controls: [
            "play",
            "current-time",
            "mute",
            "fullscreen",
          ],
        }}
      />
    </div>
  );
};

export default VideoPlayer;
