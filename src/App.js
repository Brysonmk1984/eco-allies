// REACT
import React from 'react';
// COMPONENTS
import Header from './Components/Header/Header';
import Content from './Components/Content';
import Footer from './Components/Footer/Footer';
// COMMON
import generateSeed from './common/generateNum';
import { login, logout, loggedIn, accountDetails } from '~/common/loginService';
import history from '~/common/history';
import getCookie from '~/common/cookie';
// BLOCK CHAIN
import TruffleContract from 'truffle-contract';
  // for testing only
import contractJson from '../build/contracts/EcoAllyCore.json';
// ASSETS
import './assets/scss/styles.scss';
import 'materialize-css/dist/css/materialize.css'
import './assets/scss/materialExtended.scss';
import 'materialize-css/dist/js/materialize.js'

// COMPONENT
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      allies : [],
      account : '',
      account1 : '0x8626cc10af4ae48e97926bbcf3c4f32aadfd5c7d',
      account2 : '0xcc1A64c458ba381C593aD92CA651Fb276092A1D3',
      loggedIn : false,
    };
    this.web3;
  }

  // Handle login to node backend on heroku
  handleLogin(doLogin, email, password){
    //console.log(email, password);
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
        //console.log('Data', data);
        if(data.error){
          console.log('ERROR - ', data.error);
          return;
        }
        this.setState(()=>({loggedIn:false, account: ''}), ()=>{ setTimeout(()=>(history.push('/login')),1000);});
      })
      .catch((error)=>{
        console.log('log out failure', error);
      });
    }
  }

  // Get account details from node backend, returns a promise
  getAccountDetails(){
      return accountDetails();
  }

  // Helper method to set state and call a callback function if it exists
  // Used for some child components to update the state without throwing a react memory leak error
  modifyAppState(state, cb){
    this.setState(()=>(state), ()=>{
      if(cb) cb();
    });
  }

  // Initialize Web 3
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

      this.tContract.deployed().then((instance) => {
        this.instance = instance;
        // let tokenCount = 0;
        // this.getTokenCount().then((tokenCount)=>{  
          //this.getAllAllies(tokenCount -1);
        // });
        
        this.checkForAccountMatch();
        // Watch for when new Allies are created
        //this.watchForCreation();

      });


    });

    

  }
  
  // Get the token count of a particular account on the block chain, returns a promise
  getTokenCount(){
    return this.instance.totalSupply.call().then((count) =>{
      return count.toNumber();
    })
  }

  // Gets all allies on the blockchain (not currently used)
  // getAllAllies(tokenCount){
  //   const cachedThis = this;
  //   const allies = [];
  //   tokenCount = tokenCount;
  //   function getAllies(){
  //     cachedThis.instance.getEcoAlly.call(tokenCount).then((ally) =>{
  //       //console.log('ally',ally);
  //       allies.push({dna : ally[0].toNumber()});
  //       tokenCount --;
  //       if(tokenCount > 0){
  //         getAllies(tokenCount);
  //       }else{
  //         cachedThis.setState((()=>({allies})));
  //       }
  //     });
  //   }
  //   getAllies(tokenCount);
  // }

  // Get latest ally added (not currently being used)
  // getLatestAlly(tokenPosition){
  //   this.instance.getEcoAlly.call(tokenPosition).then((ally) =>{
  //     //console.log('ally',ally[1], ally[0].toNumber());
  //     this.setState((prevState)=>({
  //       allies : [{dna : ally[0].toNumber()}, ...prevState.allies]
  //     }));
  //   });
  // }

  // Get the Allies of a particular user from the blockchain
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
            allies.push({dna : allyDnaString, id : ally[1].toNumber()});
          });
          //console.log('As',allies);
          this.setState({allies});
   
      });

    });
  }

  // Check if a web3 account of the user matches the account saved in our DB
  // Might need to modify this in case user is using multiple web3 accounts on metamask
  checkForAccountMatch(){
    let index;
    const matchingEthAccount = web3.eth.accounts.find((acc, i)=>{
      if(acc === this.state.account){
        index = i;
        return acc === this.state.account;
      }
    });

    // user is logged into correct meta mask account
    if(matchingEthAccount){
      this.getAlliesOfUser();
    }else{
      alert(`Please sign into account ${this.state.account} in metamask!`);
    }
  }

  // Watch for creation of new allies and update the UI
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

  // Build a new ally on the blockchain
  buildAlly(){
    const num = generateSeed();
    this.instance.addAlly(num, {from : this.state.account});
  }

  // Transfer ally from one address to another
  transferAlly(to, allyIndex = 0){
    const from = this.state.account;
    if(to !== this.state.account){
      //console.log('going', to, allyIndex);
      this.instance.transferEcoAlly(from, to, allyIndex, {from : this.state.account});
    }else{
      alert('please enter an account that\'s not your own');
    }
    
  }

  // On component mount, if there is a cookie called 'sid' and the user is not logged in,
  // log the user in and initialize web3.
  componentDidMount(){
    const cookie = getCookie('sid');

    if(!this.state.loggedIn && cookie){
      loggedIn()
      .then((data)=>{

        if(data){
          this.setState(() => ({account : data.data.publicEthKey, loggedIn : true}), ()=>{
            this.initWeb3();
          })
        }
      })
      .catch((err) =>{
        console.log('EEERR', err);
      })
    }
  }
  
  render() {
    return (
      <div>
        <Header handleLogin={this.handleLogin.bind(this)} loggedIn={this.state.loggedIn} />
        <Content appState={this.state} getAccountDetails={this.getAccountDetails.bind(this)} modifyAppState={this.modifyAppState.bind(this)} handleLogin={this.handleLogin.bind(this)} buildAlly={this.buildAlly.bind(this)} transferAlly={this.transferAlly.bind(this)} loggedIn={this.state.loggedIn}  />
        <Footer />
      </div>
    );
  }
}