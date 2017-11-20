// The list of video previews; start here as it's the parent item > then, we go to video_detail.js

import React from "react";
import VideoListItem from "./video_list_item";

/*
 Functional component
 As it doesn't need state as it doesn't record user interaction or rerender itself in a certain fashion
 Here, in our functional component, the props object is passed as an argument
 But in class-based components, props are available in any method we define as this.props
 So our video list receives props (=videos) via props.videos.length (=number of videos)
 It will show videos: with a thumbnail and a title
 */
const VideoList = props => {
  /*
     + Use map (a property of an array) instead of for loops
     Will return a new array where each index is the return value of the function
     Map will run array.length times
     + Define our arrow function below
     Will return a video list item and we pass video as a property names video
     + We put keys on each list item/video, as a property (key={video.etag}, to make sure React updates the record in a speedy fashion
     + We are taking the prop that's coming from App and passing it video_list item
     */
  const videoItems = props.videos.map(video => {
    return (
      <VideoListItem
        onVideoSelect={props.onVideoSelect}
        key={video.etag}
        video={video}
      />
    );
  });

  return (
    /*
         Add class names to add some styling, here we use bootstrap from index.html
         Instead of class as in CSS, we use className for styling in React (to avoid conflicts with class in class-based const)
         Any props(=videos) we pass in here, we will just record their length (i.e. how many videos there are in our array - the video list)
         {props.videos.length}
         */
    <ul className="col-md-4 list-group">{videoItems}</ul>
  );
};

export default VideoList;
