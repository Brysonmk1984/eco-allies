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
      account1 : '0x8626cc10af4ae48e97926bbcf3c4f32aadfd5c7d',
      account2 : '0xcc1A64c458ba381C593aD92CA651Fb276092A1D3'
    };
    this.web3;
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

    // Get specific Eth Account
    this.web3.eth.getCoinbase((err, account) => {
      this.setState(() => ({account : account}), ()=>{
        this.tContract.deployed().then((instance) => {
          this.instance = instance;
          // let tokenCount = 0;
          // this.getTokenCount().then((tokenCount)=>{  
            //this.getAllAllies(tokenCount -1);
          // });
          
          this.getAlliesOfUser();
          // Watch for when new Allies are created
          //this.watchForCreation();
  
        });

      })
      
    });

  }
  

  getTokenCount(){
    return this.instance.totalSupply.call().then((count) =>{
      return count.toNumber();
    })
  }

  getAllAllies(tokenCount){
    const cachedThis = this;
    const allies = [];
    tokenCount = tokenCount;
    function getAllies(){
      cachedThis.instance.getEcoAlly.call(tokenCount).then((ally) =>{
        //console.log('ally',ally[1], ally[0].toNumber());
        allies.push({name : ally[1], dna : ally[0].toNumber()});
        tokenCount --;
        if(tokenCount > 0){
          getAllies(tokenCount);
        }else{
          cachedThis.setState((()=>({allies})));
        }
      });
    }
    getAllies(tokenCount);
  }

  getLatestAlly(tokenPosition){
    this.instance.getEcoAlly.call(tokenPosition).then((ally) =>{
      //console.log('ally',ally[1], ally[0].toNumber());
      this.setState((prevState)=>({
        allies : [{name : ally[1], dna : ally[0].toNumber()}, ...prevState.allies]
      }));
    });
  }

  getAlliesOfUser(){
    
    this.instance.tokensOfOwner.call(this.state.account).then((tokens)=>{
      
      const tokenPositions = tokens.map((token) =>{
        //console.log('TOKENS',token.toNumber());
        return token.toNumber();
      });
      
      const allies = [];
      const tokenPromises = tokenPositions.map((tp) => {
        return this.instance.getEcoAlly(tp);
      });


      Promise.all(tokenPromises).then((values) =>{
          values.forEach((ally,i)=>{
            console.log('ally', ally[2].toNumber());
            allies.push({name : ally[1], dna : ally[0].toNumber(), id : ally[2].toNumber()});
          });
        
          this.setState((()=>({allies})));
      });

    });
  }

  checkForAccountMatch(){
    if (web3.eth.accounts[0] && web3.eth.accounts[0] !== this.state.account) {
      this.setState(() =>({account : web3.eth.accounts[0]}), () => {
          this.getAlliesOfUser();
      });
    }
  }

  // watchForCreation(){
  //   const creationEvent = this.instance.Creation();
        
  //   creationEvent.watch((error, result) =>{
  //     if(error){
  //       console.log('ERROR', error);
  //     }else{

  //       if(result.args.owner === this.state.account){
  //         // Get new token count and fetch latest token
  //         this.getTokenCount().then((tokenCount)=>{
  //           this.getLatestAlly(tokenCount);
  //         });
  //       }
  //     }
  //   });

  // }

  buildAlly(e, name){
    e.preventDefault();
    const num = generateSeed();
    this.instance.addAlly(name, num, {from : this.state.account});
  }

  transferAlly(to, allyIndex = 0){
    const from = this.state.account1;
    if(to !== this.state.account){
      console.log('going', to, allyIndex);
      this.instance.transferEcoAlly(from, to, allyIndex, {from : this.state.account});
    }else{
      alert('please enter an account that\'s not your own');
    }
    
  }

  componentDidUpdate(){

  }

  render() {
    return (
      <div>
        <Header />
        <Content allies={this.state.allies} buildAlly={this.buildAlly.bind(this)} transferAlly={this.transferAlly.bind(this)} getAlliesOfUser={this.checkForAccountMatch.bind(this)} />
        <Footer />
      </div>
    );
  }
}

export default App;