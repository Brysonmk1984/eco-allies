// REACT
import React from 'react';
// COMPONENTS
import GalleryAllyTile from '../GalleryAllyTile';
// COMMON
import allyList from '~/common/allyList.json';
import {shuffleArray} from '~/common/helperFunctions';
// ASSETS
import './galleryListPage.scss';

// COMPONENT
export default class Gallery extends React.Component{
    constructor(props){
        super(props);
    }
    buildAllyList(){
        const randomizedAllies = shuffleArray(allyList);

        return randomizedAllies.map((ally, i) => {
            if(ally.active){
                return (
                    <GalleryAllyTile key={i} ally={ally}  />
                );
            }
        });
    }

    render(){
        return(
            <div className="page-wrapper gallery-list-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>ECO ALLIES</h1>
                        <p>Defenders of Gaia</p>
                        
                    </div>
                </section>
                <section className="ally-section">
                    <div className="subsection">
                        {this.buildAllyList()}
                    </div>
                </section>
                <section className="bottom-section">
                </section>
            </div>
        );
    }
   
};