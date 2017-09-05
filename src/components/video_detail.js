// Video player and the title and description below it
// We don't need to maintain any type of state, we will be using YT embed
// We will need description etc, so those are all properties that will be passed down as props in App (index.js)
// So, we'll write a functional component

// + Set {video} as props and that will pull off our video
// + url: ES6 syntax: swap concatenation with template strings -> inject a JS variable like VideoId into our string which is the url, via ``
// So, we swap this url =https://www.youtube.com/embed/ + videoId; with the below ES6 template string
// Provide iframe with src which is our url so iframe can show just any video
// + Some parent elements cannot handle the needs of child elements;React wants to render instantly -> add an check

import React from 'react';

const VideoDetail = ({video}) => {
    // A check to make sure the video has been provided in the props before it tries to render the component (video detail)
    if (!video) {
        return <div>Loading...</div>;
    }
    const videoId = video.id.videoId;
    const url =`https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail;