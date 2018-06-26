import React from 'react';
import axios from 'axios';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import generateSeed from './common/generateNum';
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
      allies : [],
      account : '',
    };
    this.web3;
    this.imageArray = ['Fred.png', 'ninja.png', 'sherrif.png'];
  }




  buildAlly(){
    const num = generateSeed();
    console.log('NUM', num, this.web3.eth.accounts);
    this.instance.addAlly('bill', num, {from : this.web3.eth.accounts[0]});
  }



  componentDidMount(){
    // Check if Web 3 has been injected by the browser
    if(typeof web3 !== 'undefined'){
      // Use Browser/metamask version
      this.web3Provider = web3.currentProvider;
      
    }else{
      //console.log('Sorry, you need metamask to use this application.');
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    this.web3 = new Web3(this.web3Provider);

     // instantiate a new truffle contract
     this.tContract = TruffleContract(contractJson);
     this.tContract.setProvider(this.web3Provider);



    
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.tContract.deployed().then((instance) => {
        this.instance = instance;



        let tokenCount = 0;
        const allies = [];

        instance.totalSupply.call().then((count) =>{
          tokenCount = count.toNumber();
        }).then(()=>{
          console.log('TOKEN COUNT',tokenCount);
          const cachedThis = this;
          
          // Get each ally in existence
          function getAlly(tokenCount, _this){
            instance.getEcoAlly.call(tokenCount).then((ally) =>{
              //console.log('ally',ally[1], ally[0].toNumber());
              allies.push({name : ally[1], dna : ally[0].toNumber()});
              tokenCount --;

              if(tokenCount >= 0){
                getAlly(tokenCount);
              }else{
                cachedThis.setState((()=>({allies})));
              }
            });
            
          }
          
          getAlly(tokenCount -1, this);

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
      });
    });


  }


  componentDidUpdate(){
    console.log(this.state, generateSeed());
  }

  render() {

    return (
        <div>
            <Header />
            <Content allies={this.state.allies} buildAlly={this.buildAlly.bind(this)}  />
            <Footer />
        </div>
    );
  }
}
export default App;