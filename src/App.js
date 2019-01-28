// REACT
import React from 'react';
import { Route, Switch } from 'react-router';
// COMPONENTS
import Header from './Components/Header/Header';
import Nav from './Components/Header/Nav';
import Content from './Components/Content';
import About from './Components/About/About';
import Gallery from './Components/Gallery/Gallery';
import UserCollection from './Components/UserCollection/UserCollection';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Account from './Components/Account/Account';
import Redeem from './Components/Redeem/Redeem';
import Proof from './Components/Proof/Proof';
import Footer from './Components/Footer/Footer';
// COMMON
import generateSeed from './common/generateNum';
import { login, logout, loggedIn, accountDetails } from '~/common/loginService';
import { sendRedeemCode, sendProof, checkParamAgainstCode } from '~/common/redeemService';
import { fetchSimpleTokens, insertSimpleToken } from '~/common/tokenService';
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
      publicEthKey : '',
      email : '',
      fullAccount : false,
      loggedIn : false,
      alerts : [
        // {
        //   type : 'error',
        //   message : 'Some error Message'
        // }
      ],
      route : '/'
    };
    this.web3;
    this.routeUnlisten = history.listen((location, action )=>{
      //console.log('hist', location, action);
    });
  }

  // Handle login to node backend on heroku
  handleLogin(doLogin, email, password){
    //console.log(email, password);
    if(doLogin){
      return login({ email, password })
      .then((data)=>{
        console.log('THE DATA', data);
        return data;
      });
      
    }else if(doLogin === false){
      return logout()
      .then((data)=>{
        console.log('Data', data);
        if(data.error){
          console.log('ERROR - ', data.error);
          return;
        }
        this.setState(()=>({loggedIn:false, publicEthKey: ''}), ()=>{ setTimeout(()=>(history.push(`${APP_ROOT}login`)),1000);});
      })
      .catch((error)=>{
        console.log('log out failure!!', error);
      });
    }
  }

  // Handle redeem
  handleRedeem(code, email){
    return sendRedeemCode({code, email})
    .then((data)=>{
      return data;
    });
  }

  // Handle redeem
  handleProof(formData){
    return sendProof(formData)
    .then((data)=>{
      return data;
    });
  }

  checkParamAgainstCode(param){
    return checkParamAgainstCode(param)
    .then((data)=>{
      return data;
    });
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

  // Initialize Web 3 to communicate with the blockchain
  initWeb3(){
    // Check if Web 3 has been injected by the browser
    if(typeof web3 !== 'undefined'){
      // Use Browser/metamask version
      this.web3Provider = web3.currentProvider;
      this.web3Provider.enable();
    }else{
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }

    this.web3 = new Web3(this.web3Provider);
    // instantiate a new truffle contract
    this.tContract = TruffleContract(contractJson);
    this.tContract.setProvider(this.web3Provider);

    // Deploy smart Contract
    this.tContract.deployed().then((instance) => {
      this.instance = instance;
      this.checkForAccountMatch();
    });

  }

  initSimpleMode(){
    this.getAlliesOfUser(this.state.fullAccount);
    
  }

  // Get the Allies of a particular user from the blockchain
  getAlliesOfUser(fullAccount){
    if(fullAccount){
      this.instance.tokensOfOwner.call(this.state.publicEthKey).then((tokens)=>{
        const tokenPositions = tokens.map((token) =>{
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
            this.setState({allies});
        });

      });
    }else{
      fetchSimpleTokens(this.state.email)
      .then((data) =>{
        console.log('DATA', data);
        this.setState({allies : data.tokenArray});
      });
    }
  }

  // Check if a web3 account of the user matches the account saved in our DB
  // Might need to modify this in case user is using multiple web3 accounts on metamask
  checkForAccountMatch(){
    let index;
    const matchingEthAccount = this.web3.eth.accounts.find((acc, i)=>{
      if(acc === this.state.publicEthKey.toLowerCase()){
        index = i;
        return true;
      }
    });

    // user is logged into correct meta mask account
    if(matchingEthAccount){
      this.getAlliesOfUser(this.state.fullAccount);
    }else{
      console.log(`Please sign into account ${this.state.publicEthKey} in metamask!`);
    }
  }

  // Build a new ally on the blockchain
  buildAlly(){
    const num = generateSeed();
    if(this.state.fullAccount){
      this.instance.addAlly(num, {from : this.state.publicEthKey});
    }else{console.log('making');
      insertSimpleToken(num, this.state.email)
      .then((data)=>{
        console.log('new inserted token', data);
      })
      .catch((err) =>{
        console.log('EEERR', err);
      })
    }

  }

  // Transfer ally from one address to another
  transferAlly(to, allyIndex = 0){
    const from = this.state.publicEthKey;
    if(to !== this.state.publicEthKey){
      //console.log('going', to, allyIndex);
      this.instance.transferEcoAlly(from, to, allyIndex, {from : this.state.publicEthKey});
    }else{
      alert('please enter an account that\'s not your own');
    }
    
  }

  dismissAlert(i){
    const alerts = this.state.alerts;
    alerts.splice(i,1);
    this.setState({alerts})
  }

  // On component mount, if there is a cookie called 'sid' and the user is not logged in,
  // log the user in and initialize web3.
  componentDidMount(){

    const cookie = APP_ROOT === '/' ? getCookie('sid') : getCookie('__cfduid');
    console.log('COOKIE', cookie, APP_ROOT);
    if(!this.state.loggedIn /*&& cookie*/){
      loggedIn()
      .then((data)=>{
        console.log('D', data);
        if(data && data.data.fullAccount){
          this.setState(() => ({ loggedIn : true, fullAccount : data.data.fullAccount, email : data.data.email, publicEthKey : data.data.publicEthKey }) );
        }else{
          this.setState(() => ({ loggedIn : true, fullAccount : data.data.fullAccount, email : data.data.email }) );
        }
      }).catch((e) =>{return;});
    }
  }

  // After a user logs in, or visits the site while already logged in,  get allies of user
  componentDidUpdate(pp,ps){
    if(ps.loggedIn === false && this.state.loggedIn){
      if(this.state.fullAccount){
        this.initWeb3();
      }else{
        this.initSimpleMode();
      }
    }

    // reset alerts if user changes page
    if(ps.route !== history.location.pathname){
      this.setState({route : history.location.pathname, alerts : []});
    }
  }

  componentWillUnmount(){
    this.routeUnlisten();
  }
  
  
  render() {
    return (
      <div>
        <Header>
            <Nav handleLogin={this.handleLogin.bind(this)}  loggedIn={this.state.loggedIn} />
            <div className="brand">
                <h1>ECO ALLIES</h1>
                <p>Defenders of Gaia</p>
            </div>
            <div className="belt"></div>
        </Header>
        <Content alerts={this.state.alerts} dismissAlert={this.dismissAlert.bind(this)} modifyAppState={this.modifyAppState.bind(this)} >
          <Switch>
            {/* <Route path={(`${APP_ROOT}`|`${APP_ROOT}about`)} component={About}  /> */}
            <Route path={`${APP_ROOT}proof`} component={() => (<Proof handleProof={this.handleProof.bind(this)} modifyAppState={this.modifyAppState.bind(this)}  alerts={this.state.alerts} />)} />
            <Route exact path={`${APP_ROOT}redeem`} component={() => (<Redeem handleRedeem={this.handleRedeem.bind(this)} getAccountDetails={this.getAccountDetails.bind(this)}  buildAlly={this.buildAlly.bind(this)} modifyAppState={this.modifyAppState.bind(this)}  alerts={this.state.alerts} /> )} /> 
            <Route path={`${APP_ROOT}redeem/:qr`} component={(props) => (<Redeem {...props}  handleRedeem={this.handleRedeem.bind(this)} checkParamAgainstCode={this.checkParamAgainstCode.bind(this)} getAccountDetails={this.getAccountDetails.bind(this)}  buildAlly={this.buildAlly.bind(this)} modifyAppState={this.modifyAppState.bind(this)}  alerts={this.state.alerts} /> )} /> 
            <Route path={`${APP_ROOT}gallery`} component={() => (<Gallery  /> )} />
            <Route path={`${APP_ROOT}user-collection`}  render={() => <UserCollection loggedIn={this.state.loggedIn} allies ={this.state.allies}  buildAlly={this.buildAlly.bind(this)}  transferAlly={this.transferAlly.bind(this)} />}   />
            <Route path={`${APP_ROOT}register`} component={() => (<Register  modifyAppState={this.modifyAppState.bind(this)} loggedIn={this.state.loggedIn} alerts={this.state.alerts} /> )} />
            <Route path={`${APP_ROOT}login`} component={() => (<Login modifyAppState={this.modifyAppState.bind(this)} handleLogin={this.handleLogin.bind(this)} loggedIn={this.state.loggedIn} alerts={this.state.alerts}   /> )} /> 
            <Route path={`${APP_ROOT}account`} component={() =>( <Account allies={this.state.allies} getAccountDetails={this.getAccountDetails.bind(this)} /> )}  />
            {/* <Route path="faq" component={Faq} />*/}
          </Switch>
        </Content>
        <Footer />
      </div>
    );
  }
}

