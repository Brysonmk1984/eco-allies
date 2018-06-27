import React from 'react';
import { determineAlly, determineSkills, determineImage } from '../common/crackDna';


const Ally = (props) => {
    const specificAlly = determineAlly(props.dna);

    console.log('!', specificAlly);
    const ally = {
        character : specificAlly.character,
        skills : determineSkills(props.dna, specificAlly.character),
        image : determineImage(props.dna, specificAlly)
    }
    console.log('IMAGE',ally.image);
    return(
        <aside className="ally">
            <div className="ally-title">
                <h2>{props.name}</h2>
                <h3>{ally.character}</h3>
            </div>
            <div className="ally-image">
                <img src={ ally.image } />
            </div>
            <div className="ally-skills">
                <ul>
                    { ally.skills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                </ul>
            </div>
            <div className="ally-history">
                <p>
                    Fred was out defending the farm when the evil dust storm hit and wiped away his house. He came back to life to avenge his loss.
                </p>
            </div>
        </aside>
    );
}

export default Ally;