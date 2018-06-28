import React from 'react';
import { determineAlly, determineSkills, determineImage } from '../common/crackDna';


const Ally = (props) => {
    const ally = determineAlly(props.dna);
    const allySkills = determineSkills(props.dna, ally.character);
    const allyImage = determineImage(props.dna, ally);

    return(
        <aside className="ally">
            <div className="ally-title">
                <h2>{props.name}</h2>
                <h3>{ ally.character }</h3>
            </div>
            <div className="ally-image">
                <img src={ allyImage } />
            </div>
            <div className="ally-skills">
                <ul>
                    { allySkills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                </ul>
            </div>
            <div className="ally-mods">
                <ul>
                    <li>Alignment</li>
                    <li>Sign</li>
                    <li>Color Adjustment</li>
                    <li>Novelty</li>
                </ul>
            </div>
        </aside>
    );
}

export default Ally;