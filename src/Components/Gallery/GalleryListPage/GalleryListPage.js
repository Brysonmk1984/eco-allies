// REACT
import React from 'react';
// COMPONENTS
import GalleryAllyTile from '../GalleryAllyTile';
import AllyGalleryModal from '~/Components/AllyModal/AllyGalleryModal';
// COMMON
import history from '~/common/history';
import allyList from '~/common/allyList.json';
import {shuffleArray} from '~/common/helperFunctions';
import { lowercaseDash } from '~/common/helperFunctions';
// ASSETS
import './galleryListPage.scss';

// COMPONENT
export default class Gallery extends React.Component{
    constructor(){
        super();
        this.state = {
            activeAlly : null,
            loading : true
        }
        const listCopy = JSON.parse(JSON.stringify(allyList));
        
        this.allyList = shuffleArray(listCopy);
        this.timeOut;
    }

    openModal(activeAlly){
        document.body.classList.add('ally-modal-open');
        this.setState(() =>({ activeAlly }));
    }

    closeModal(){
        document.body.classList.remove('ally-modal-open');
        this.setState(() =>({ activeAlly : null }));
    }

    navigateToAllyPage(){
        history.push({
            pathname: `${APP_ROOT}gallery/${lowercaseDash(this.state.activeAlly.character)}`,
            state: {
                allyCharacter : this.state.activeAlly.character
            }
        });
    }

    renderAllyModal(){
        if(this.state.activeAlly){
            return <AllyGalleryModal activeAlly={this.state.activeAlly} closeModal={this.closeModal.bind(this)} navigateToAllyPage={this.navigateToAllyPage.bind(this)} />
        }
        return null;
    }

    componentDidMount(){
        this.timeOut = setTimeout(()=>{ return this.setState({loading:false})},250);
    }
    componentWillUnmount(){
        clearTimeout(this.timeOut);
    }

    render(){
        return(
            <div className="page-wrapper gallery-list-page">
                
                {
                    this.state.loading ?
                    <section className="ally-section">
                    <div className={`subsection subsection-loading`}>
                        <strong>Loading...</strong>
                    </div>
                </section>
                :
                <section className="ally-section">
                    <div className={`subsection`}>
                        {
                            
                            this.allyList.map((ally, i) => {
                                if(ally.active){
                                    return (
                                        <GalleryAllyTile key={i} ally={ally} openModal={this.openModal.bind(this)}  />
                                    );
                                }
                            })
                         
                        }
                    </div>
                </section>
                }
                
                { this.renderAllyModal() }
            </div>
        );
    }
   
};