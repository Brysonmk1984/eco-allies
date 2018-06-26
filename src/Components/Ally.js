import React from 'react';
import { determineAlly, determineSkills } from '../common/crackDna';
import Fred from '../assets/images/fred.png';
import Dave from '../assets/images/sherrif.png';
import Xin from '../assets/images/ninja.png';



// Remove later when pulling in correct image
function imageRandomizer(){
    const arr = [Fred, Dave, Xin];
    return arr[Math.floor(Math.random() * 3) + 0];
}


const Ally = (props) => {
    determineSkills(props.dna);
    return(
        <aside className="ally">
            <div className="ally-title">
                <h2>{props.name}</h2>
                <h3>{determineAlly(props.dna)}</h3>
            </div>
            <div className="ally-image">
                <img src={ imageRandomizer() } />
            </div>
            <div className="ally-skills">
                <ul>
                    { determineSkills(props.dna).map((skill, i)=>(<li key={i}>{skill}</li>)) }
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