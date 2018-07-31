import React from 'react';
import Ally from './Ally';
import TransferModal from './TransferModal';
import AddModal from './AddModal';
import './userCollection.scss';



class UserCollection extends React.Component{
    constructor(props){
        super(props);
        this.buildAlly = this.props.buildAlly.bind(this);
        this.transferAlly = this.props.transferAlly.bind(this);
    }
    buildAllyList(){
        return this.props.allies.map((ally, i) => {
            return (
                <Ally key={i} dna={ally.dna} id={ally.id} sign={ally.sign} toggleModal={this.toggleModal.bind(this)} />
            );
        });
    }

    toggleModal(id){
        this.child.toggleModal(id);
    }

    componentDidMount(){
        // Needed because settings state after AJAX call was causing problems, so doing it on this page load instead
        this.props.toggleLogInStatus();
        // Check to see if user changed metamask account, if they did, get allies
        setInterval(() => {
            this.props.getAlliesOfUser();
        }, 1000);
        
        
    }

    

    render(){
        return(
            <div className="page-wrapper user-collection-page">
                <section className="title-section">
                    <div className="subsection">
                        <h1>Eco Alliess</h1>
                        <p>Defenders of Gaia</p>
                    </div>
                </section>
                <section className="ally-section">
                    <h2>Your Team</h2>
                    <div className="subsection">
                        {this.buildAllyList()}
                    </div>
                </section>
                <section className="bottom-section">
                </section>
                <TransferModal onRef={ref => (this.child = ref)} toggleModal={this.toggleModal.bind(this)} transferAlly={this.props.transferAlly} />
                <AddModal buildAlly={this.buildAlly.bind(this)} />
            </div>
        );
    }
   
};

export default UserCollection;