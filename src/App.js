import React from 'react';
import axios from 'axios';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import TruffleContract from 'truffle-contract';
// for testing only
import contractJson from '../build/contracts/EcoAllyCore.json';
import './assets/scss/styles.scss';
import 'materialize-css/dist/css/materialize.css'
import './assets/scss/materialExtended.scss';
import 'materialize-css/dist/js/materialize.js'

class App extends React.Component {
 
  constructor(){
    super();
    this.state = {
      allies : ['asd'],
      account : '',
    };
    this.web3;
  }





  componentDidMount(){
    // Check if Web 3 has been injected by the browser
    if(typeof web3 !== 'undefined'){
      // Use Browser/metamask version
      this.web3Provider = web3.currentProvider
      
    }else{
      //console.log('Sorry, you need metamask to use this application.');
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    this.web3 = new Web3(this.web3provider);

    //const contractAddress = '0xb73c64abdf3387aa4837c4af31ab82b5fdf74979';
    console.log(contractJson);
     // instantiate a new truffle contract
     this.tContract = TruffleContract(contractJson);
     this.tContract.setProvider(this.web3Provider);



     // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.tContract.deployed().then((instance) => {
        this.instance = instance;




        
        this.instance.totalSupply.call().then((count)=>{
          console.log(count.toNumber());
        });


        
        //this.watchEvents();


        // this.instance.candidatesCount().then((candidatesCount) => {
        //   for (var i = 1; i <= candidatesCount; i++) {
        //     this.electionInstance.candidates(i).then((candidate) => {
        //       const candidates = [...this.state.candidates]
        //       candidates.push({
        //         id: candidate[0],
        //         name: candidate[1],
        //         voteCount: candidate[2]
        //       });
        //       this.setState({ candidates: candidates })
        //     });
        //   }
        // })
        // this.electionInstance.voters(this.state.account).then((hasVoted) => {
        //   this.setState({ hasVoted, loading: false })
        // })
      })
})
  }


  render() {
    return (
        <div>
            <Header />
            <Content />
            <Footer />
        </div>
    );
  }
}
export default App;