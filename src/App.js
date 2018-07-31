import React from 'react';
import axios from 'axios';
import Header from './Components/Header';
import Content from './Components/Content';
import Footer from './Components/Footer';
import generateSeed from './common/generateNum';
import { login, logout } from '~/common/loginService';
import history from '~/common/history';
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
      //account1 : '0x8626cc10af4ae48e97926bbcf3c4f32aadfd5c7d',
      account1 : '',
      account2 : '0xcc1A64c458ba381C593aD92CA651Fb276092A1D3',
      loggedIn : false,
    };
    this.web3;
  }

  handleLogin(doLogin, email, password){
    console.log(email, password);
    if(doLogin){
      return login({ email, password })
      .then((data)=>{
        if(data.error){
          console.log('ERROR - ', data.error);
          return;
        }
        //console.log('THE DATA', data);
        return data;
      })
      .catch((error)=>{
        console.log('log out failure', error);
      });
      
    }else if(doLogin === false){
      return logout()
      .then((data)=>{
        console.log('Data', data);
        if(data.error){
          console.log('ERROR - ', data.error);
          return;
        }
        this.setState(()=>({loggedIn:false, account1: ''}), ()=>{ setTimeout(()=>(history.push('/login')),1000);});
      })
      .catch((error)=>{
        console.log('log out failure', error);
      });
    }
  }

  modifyAppState(state, cb){
    this.setState(()=>(state), ()=>{
      if(cb) cb();
    });
  }


  initWeb3(){
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
        console.log('ally',ally);
        allies.push({dna : ally[0].toNumber()});
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
        allies : [{dna : ally[0].toNumber()}, ...prevState.allies]
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
            let allyDnaString = ally[0].toString();
            if(allyDnaString.length === 15){
              allyDnaString = '0' + allyDnaString;
            }
            //console.log(allyDnaString);
            allies.push({dna : allyDnaString, id : ally[1].toNumber()});
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



  buildAlly(){
    const num = generateSeed();
    this.instance.addAlly(num, {from : this.state.account});
  }

  transferAlly(to, allyIndex = 0){
    const from = this.state.account1;
    if(to !== this.state.account){
      //console.log('going', to, allyIndex);
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
        <Header handleLogin={this.handleLogin.bind(this)} loggedIn={this.state.loggedIn} />
        <Content initWeb3={this.initWeb3.bind(this)} modifyAppState={this.modifyAppState.bind(this)} handleLogin={this.handleLogin.bind(this)} loggedIn={this.state.loggedIn} allies={this.state.allies} buildAlly={this.buildAlly.bind(this)} transferAlly={this.transferAlly.bind(this)} getAlliesOfUser={this.checkForAccountMatch.bind(this)} />
        <Footer />
      </div>
    );
  }
}

export default App;