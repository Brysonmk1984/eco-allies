import React from 'react';
import AllyTileGallery from './AllyTileGallery';
import './gallery.scss';
import allyList from '~/common/allyList.json';


class Gallery extends React.Component{
    constructor(props){
        super(props);
    }
    buildAllyList(){
        return allyList.map((ally, i) => {console.log('ally', ally.active);
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

export default Gallery;