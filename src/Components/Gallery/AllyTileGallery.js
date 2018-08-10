import React from 'react';

const Ally = (props) => {
    return(
        <aside className="ally">
            <div className="ally-title">
                <h3>{props.ally.character}</h3>
                <h4>{ props.ally.description }</h4>
            </div>
            <div className="ally-image">
                <img src={ `/assets/images/${props.ally.image}` } />
            </div>
            
            <div className="ally-skills">
                 <ul>
                    { props.ally.skills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                </ul>
            </div>
            <div className="ally-history">
                <p>
                    { props.ally.history }
                </p>
            </div>
            
        </aside>
    );
}

export default Ally;