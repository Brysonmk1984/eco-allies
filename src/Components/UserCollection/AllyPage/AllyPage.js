// REACT
import React from 'react';
// LIBRARIES
import PropTypes from 'prop-types';
// COMPONENTS
import AllyMenu from '../AllyMenu';
import VariantBar from '../VariantBar';
import TransferModal from '../TransferModal';
// COMMON
import { decodeAlly } from '~/common/crackDna';
// ASSETS
import fist from '~/assets/images/fist.png';

// COMPONENT
export default class AllyPage extends React.Component{
    constructor(){
        super();
        this.state = {
            allyName : '',
            allyDescription : '',
            allySkills : [],
            allyImage : '',
            allyId : null,
            allySign : '',
            allyAlignment : '',
            allyColor : null,
            allyPower : 0
        }
    }

    // Opens Transfer modal
    toggleModal(id){
        this.child.toggleModal(id);
    }

    // On component mount, decode the ally dna from the param passed 
    // and update the state with the new info 
    componentDidMount(){
        const ally = decodeAlly(this.props.match.params.allyDna);
        this.setState(() =>({allyName : ally.basics.character, allyDescription : ally.basics.description, allySkills:ally.skills,allyImage:ally.image,allyId : this.props.location.state.allyId, allySign:ally.sign, allyAlignment:ally.alignment, allyColor:ally.color, allyPower:ally.power}));
    }

    render(){
        return(
            <div className="ally-page">
                <div className="ally-actions">
                    <AllyMenu anchorEl={this.state.anchorEl} toggleModal={() => {this.toggleModal(this.state.allyId)}} />
                </div>
                <div className="ally-title">
                    <h3>{this.state.allyName}</h3>
                    <h4>{ this.state.allyDescription }</h4>
                </div>
                <VariantBar color={this.state.allyColor} alignment={this.state.allyAlignment} sign={this.state.allySign} />
                <div className="ally-image">
                    <img src={ `/${this.state.allyImage}` } />
                </div>
                <div className="ally-skills">
                    <ul>
                        { this.state.allySkills.map((skill, i)=>(<li key={i}>{skill}</li>)) }
                    </ul>
                </div>
                <div className="ally-power">
                        <img className="fist" src={fist} /> <strong>{this.state.allyPower}</strong>
                </div>
                <TransferModal onRef={ref => (this.child = ref)} toggleModal={this.toggleModal.bind(this)} transferAlly={this.props.transferAlly} />
            </div>
        );
    }
}

// PROP-TYPES
AllyPage.propTypes = {
    transferAlly : PropTypes.func.isRequired,
    // history api
    history : PropTypes.object.isRequired,
    location : PropTypes.shape({
        hash : PropTypes.string,
        key : PropTypes.string,
        search : PropTypes.string,
        pathname : PropTypes.string.isRequired,
        state : PropTypes.shape({
            allyId : PropTypes.number.isRequired
        })
    }),
    match : PropTypes.shape({
        isExact : PropTypes.bool.isRequired,
        params : PropTypes.shape({
            allyDna : PropTypes.string.isRequired
        }),
        path : PropTypes.string.isRequired,
        url : PropTypes.string.isRequired
    }),
    staticContext : PropTypes.object
};