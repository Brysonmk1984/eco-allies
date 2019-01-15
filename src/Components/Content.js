// REACT
import React from 'react';

// COMPONENT
// Displays app content between header and footer depending on the route
const Content = (props) =>{
    return <div className="route-wrapper">{props.children}</div>
}

export default Content;