// Literally: Go into the node modules folder and get react
// Module concept: modules create a silo, so the code that we write in other files will not have access
// to what's inside this module - unless we explicitly say hey, we want access to some code in that file there (its variables)
// Module concept in React: so, even though we installed React as a dependency before, we need to say:
// I want access to React inside this file - so we import React at the top of this file
// import React from node modules: 'hey can I get Reach from my install modules (node_modules), go get React and give me access in this file.
// Read the line as: 'go find the library called react installed in my application as dependency, and assign it to the variable React
// Webpack will say 'oh the want access to this file, I'll make sure this file has access to React'
import React, { Component} from 'react';
import _ from 'lodash';
// To render React in the DOM, we use React DOM (used to interact with the DOM),
// not the React library above (used to create and manage our components)
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
/// Now search bar will be equal to the component in search_bar.js
// Need to add a relative path if it's not a library like React we are importing
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
// Const as API key isn't going to change
const API_KEY = 'AIzaSyCe-j1Bmf1d6sm9LZ790MnqUJsAtpohiGg';


// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
//
// import App from './components/app';
// import reducers from './reducers';
//
// const createStoreWithMiddleware = applyMiddleware()(createStore);

// Make a new component. Component is an object or a function that returns HTML;
// so each component has a diff. functions or purposes: easy to resuse and you isolate the component's functionality
// Always make 1 component per file.
// Const is an ES6 syntax, like var it's declaring a variable.
// The difference from var is that const is never going to change - it's contact:
// we will never reassign App down the line, like we could with var
// - After trying to render the app in the DOM: it shows we passed the app class not the instance of the component
// So, we we have to instantiate our components before we pass into, and render in the DOM
// const App = function () {
//     // This HTML is JSX, a dialect of JS that allows us to write that looks like HTML but is behind the scenes JS
//     // Its purpose is to make our components a lot more legible and clean, see the vanilla equivalent in babel tool
//     // Webpack and babel will transpile JSX into vanilla JS that the browser can understand and render it in the browser
//     // So div will not look like div in the browser, it's a JSX tag
//     return <div>Hi!</div>;
// }

// Syntax 2: arrow function (ES6 syntax) is an alternative to function keyword, but 'this' is different
// // Define a base component: App. This functional component produces HTML.
// // We have our App and the search bar is its first child
// const App = () => {
//     // If multiple lines, put the JSX inside ()
//     return (
//         <div>
//             <SearchBar />
//         </div>
//     );
// }

// It will record state (as some amount of data will change over time), e.g. lists of videos will change over time
// We we set the new search results (by user) to state
// Hence we will transform the functional component into a class-based one
class App extends Component {
    constructor(props) {
        super(props);

        // Our state with initialisers
        // Includes an array as it's going to be a list of videos
        // + Add a concept of selected video to the app component state, i.e. a video object that will always be passed in the video detail
        this.state = ({
            videos: [],
            selectedVideo: null
        });

        // We have out search term, which will kick off in videoSearch(term)
        this.videoSearch('surfboards');
    }

    // We pass in term = whatever term the user will input
    videoSearch(term) {
        // Pop it here as whenever our app starts we don't want an empty list
        // We want the user to see some data
        // The callback function (arrow function) will be called, an opportunity to update this.state with a new list of videos
        // Resembles AJAX & jQuery: you pass configuration options ({key, term}) and a callback function - here, arrow function (data = videos)
        // + term in videoSearch and TY search should match and user input will change the content dynamically
        YTSearch({key: API_KEY, term: term}, (videos) => {
            // The object we are passing to set.State has key of videos and value of data (=videos)
            // this.setState({videos: videos});
            // ES6 syntax: When we have a key and value that is the same string, we can just write ({videos})
            // + Add selected video to the below state: here, we kick off our request to go grab our list of videos
            // when this request this completed, the first video will be passed in
            // as this is a state, this will rerender --> so make sure to add selectedVideo into the below <VideoDetail video={} />
            // and we will be shown the first video in lieu of Loading/ null prop!
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    // + First, import components like video list and search bar in the first lines of index.js
    // + Second, add them into the render method below
    // Below, pass props = videos to the video list
    // Thus we pass data from the parent App (includes videos) to its child Video List
    // Then, props (=videos) will be passed into our functional const as an argument (in video_list.js)
    // + Pass a prop to our component to see if it's working, e.g. <VideoDetail video={this.state.videos[0]}/>, then replaced by selectedVideos
    // + Implement a callback, i.e. function that we will pass from App to video_list.js and video_item.js
    // We will pass props like onVideoSelect; make sure you add them in the components that are to be manipulated by these callbacks.
    // + Use lodash, to throttle user input. Create a function that will only run after 300 ms, useful for search bars and loading.
   render() {
     const videoSearch= _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState ({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

// Show the component on the page: take this component's generated HTML and put it on the page / in the DOM
// We need an existing HTML node to render this into; what you want rendered is in ()
// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//       /*// Put a JSX tag around the app will create an instance of the app, needed to render the app in the browser*/
//       /*// Whenever you try to make use of a component, just wrap it in the JSX tags, self-closing tag < /> and you're good to go*/
//       <App />
//   </Provider>
//   , document.querySelector('.container'));

// Our App will be rendered in the class container
ReactDOM.render(<App />, document.querySelector('.container'));

