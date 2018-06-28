import React from 'react';
import GenericAlly from './GenericAlly';
import './gallery.scss';
import allyList from '~/common/allyList.json';


class Gallery extends React.Component{
    constructor(props){
        super(props);
    }
    buildAllyList(){
        return allyList.map((ally, i) => {
            return (
                <GenericAlly key={i} ally={ally}  />
            );
        });
    }

    render(){
        return(
            <div className="page-wrapper trade-page">
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