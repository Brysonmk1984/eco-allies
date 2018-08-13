// REACT
import React from 'react';
// COMPONENTS
import AllyTileGallery from './AllyTileGallery';
// COMMON
import allyList from '~/common/allyList.json';
// ASSETS
import './gallery.scss';

// COMPONENT
export default class Gallery extends React.Component{
    constructor(props){
        super(props);
    }
    buildAllyList(){
        return allyList.map((ally, i) => {
            if(ally.active){
                return (
                    <AllyTileGallery key={i} ally={ally}  />
                );
            }
        });
    }

    render(){
        return(
            <div className="page-wrapper gallery-page">
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