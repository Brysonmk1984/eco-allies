// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMMON
import history from '~/common/history';
import * as AllyImages from '~/common/includedImages';
import { lowercaseUnderscore , lowercaseDash} from '~/common/helperFunctions';
   


// COMPONENT
export default class GalleryAllyTile extends React.Component{

    // Navigate user to specific ally page on click, passing the allyId as an additional variable
    navigateToAlly(){
        history.push({
            pathname: `${APP_ROOT}gallery/${lowercaseDash(this.props.ally.character)}`,
            state: {
                allyCharacter : this.props.ally.character
            }
        });
    }


    render(){
        return(
            <aside className="ally">
                <div className="ally-title">
                    <h3>{this.props.ally.character}</h3>
                    <h4>{ this.props.ally.description }</h4>
                </div>
                <div className="ally-image">
                    <img src={ AllyImages[lowercaseUnderscore(this.props.ally.character)] }  onClick={this.navigateToAlly.bind(this)} />
                </div>
                
                <div className="ally-skills">
                     <ul>
                        { this.props.ally.skills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                    </ul>
                </div>
                <div className="ally-history">
                    <p>
                        { this.props.ally.history }
                    </p>
                </div>
                
            </aside>
        );
    }
};

// PROP-TYPES
GalleryAllyTile.propTypes = {
    ally : PropTypes.shape({
        active : PropTypes.bool.isRequired,
        character : PropTypes.string.isRequired,
        skills : PropTypes.array.isRequired,
        image : PropTypes.string.isRequired,
        history : PropTypes.string.isRequired,
        description : PropTypes.string.isRequired
    })
};