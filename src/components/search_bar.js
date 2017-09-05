// Import React into all the components that use JSX and pull off a property component
import React, { Component } from 'react';

// Define your component first
// This one is a functional component as it's a function
// Start off with a functional component and if you need additional functionality, create a class-based one
// Arrow function (ES6 syntax) replaces 'function'
// const SearchBar = () => {
//     We don't have to close input because we will not insert anything inside it
//     Just create an input
//     Below ris the same as React.createElement(), so make sure you import React into this component (JSX use ~ React import)*/
//     return <input type='text'/>;
// };

// Now create your class-based component in place of functional component
// Class-based = has the concept of state; use when data changes,
// Functional component is just a function we call and spits out JSX
// Define a new class called SearchBar (create a search bar) and give it access to all functionality from React.Component class
// ES6 syntax: replace React.Component with Component and pull the Component property off in import above
class SearchBar extends Component {
    // The constructor is the ony function called automatically whenever we create a new class / new instance of search bar
    // Reserved for setting up in our class like initialising the state
    constructor(props) {
        // Calling a parent of Component with super
        super(props);
        // State is a plain JS object; each class based component has a state
        // and so does each instance of the class-based component
        // We initialise our state via constructor method and this.state inside of it
        // This state equals object - only inside our constructor object do we define state like this
        // Everywhere else in our component we will manipulate our state with setState.
        this.state = { term: '' };
    }
    // Must define a render method (!) inside a class
    // In place of our function in the functional method
    // Whenever we call a render function we must return some JSX
    render() {
        // Structure of the browser event : "On + "name of the event: Change" = {reference to the event handler/ this.OnInputChange)
        // Whenever we write JSX and we use JS variables (this.OnInputChange), we wrap them in {}
        // Reads as "Property "onChange" changes with the value of this.onInputChange"
        // 2-step event process: create an event handler (below) and pass the event into the element we watch for an event (input)
        // return <input onChange={this.onInputChange()}/>;
        // Rewrote with arrow functions + comment out the event handler to condense the code
        // Now reads as "define an input handler which is a function {event => console.log(event.target.value)} />;
        // and we pass it to the property OnChange" inside the JSX tag </>;
        return (
            // setState to inform React: "hey the state is changed, here is the new state -> user entered a new term"
            // And we cause the entire component to rerender! See below:
            /*<input onChange={event => this.setState({ term: event.target.value })} />;*/
            // But, we then turned input into a controlled component,
            // It has its value defined by state (value ={this.state.term}; this.setState causes the component to rerender
            // and when it rerenders,the value of the state is the value of this.state.term
            // So, when the user inputs some text, they don't actually change the input value;
            // they only trigger an event (event.target.value), because we updated the state (via setState) with this event (({ term: event.target.value })} - which too causes the input to change
            // So it's not that the input changed the value, like the commented out state option above
            // The value  of the input is equal to the state
            // Controlled components are useful if we want some starting value as our initial state & read our value out more easilyrun
            <div className="search-bar">
                <input
                    value ={this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    // 1. function of onInput Change: set the state of this component
    // 2. function: Fires off the onSearchTermChange callback
    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
    // Define an event handler as a method on the class: "on + name of the element you're watching + event"
    // Reads as "whenever the input changes run this code inside"
    // Insert an event object; to get access to the value of the input: what was the text that the user changed
    // onInputChange(event) {
    //     console.log(event.target.value);
    // }
}

// React components show other components, so we can use index.js to show our search_bar.js
// But all of our files are siloed from each other unless we explicitly declare the connection between them
// So we export a subset of the code
// Make sure it matches the import in index.js
export default SearchBar;
