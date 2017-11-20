// Video preview

import React from "react";
// const VideoListItem = (props) => {
//     const video = props.video;

// + ES6 alternative which says "this first object has a property video, please grab the video and declare a new variable called video"
// + The below template has space for an image (snippet) and heading, so we access these properties via imageUrl
// + Pass the prop Video Select from App down to VideoListItem; in ({video, onVideoSelect}) and <li>
const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    // + Li reads as 'whenever I get clicked, call that function with the video I was passed -> we end up with the right video '
    <li onClick={() => onVideoSelect(video)} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>

        <div className="media-body">
          <div className="media-heading">{video.snippet.title}</div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
