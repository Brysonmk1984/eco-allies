// REACT
import React from 'react';
// ASSETS
import './header.scss';


// COMPONENT
const Header = (props) => {
    return <header>{props.children}</header>;
};

export default Header;