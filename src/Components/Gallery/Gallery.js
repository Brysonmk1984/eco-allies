// REACT
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import GalleryListPage from './GalleryListPage/GalleryListPage';
import GalleryAllyPage from './GalleryAllyPage/GalleryAllyPage';

// COMPONENT
const UserCollection = function(){
    
    // One of two different views is rendered depending on if a user navigates
    // to /gallery or /gallery/{{allyCharacter}} (allyCharacter will only reference the allylist.json file)
    // withRouter(component) grants browser history functionality
    return(
        <div className="page-wrapper gallery-page">
            <Route exact path={`${APP_ROOT}gallery/`}  render={() => (
                <GalleryListPage  />
            )} />
            <Route path={`${APP_ROOT}gallery/:allyCharacter`}  render={
                withRouter((props) => ( <GalleryAllyPage {...props} /> ))
            } />
        </div>
    );
}

export default UserCollection;
