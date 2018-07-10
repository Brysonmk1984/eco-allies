import React from 'react';
import Ally from './Ally';
import TransferModal from './TransferModal';
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
                <Ally key={i} name={ally.name} dna={ally.dna} />
            );
        });
    }

    componentDidMount(){
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
                <section className="input-section">
                    <h2>Create New Ally</h2>
                    <div className="subsection">
                        <form onSubmit={(e) =>{this.buildAlly(e, this.refs.name.value)}}>
                            <div>
                                <input ref="name" type="text" placeholder="Enter Name" maxLength="20" />
                            </div>
                            <div>
                                <button type="submit">Build Ally</button>
                            </div>
                            <div>
                                <button type="button" onClick={this.props.transferAlly}>Transfer Ally</button>
                            </div>
                        </form>
                    </div>
                </section>
                <section className="ally-section">
                    <h2>Your Ally List</h2>
                    <div className="subsection">
                        {this.buildAllyList()}
                    </div>
                </section>
                <section className="bottom-section">
                </section>
                <TransferModal />
            </div>
        );
    }
   
};

export default UserCollection;