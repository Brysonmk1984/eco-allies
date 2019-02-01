// REACT
import React from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
// COMPONENTS
import Header from '~/Components/Header/Header';
import Nav from '~/Components/Header/Nav';
import Content from '~/Components/Content';
import About from '~/Components/About/About';
import Gallery from '~/Components/Gallery/Gallery';
import UserCollection from '~/Components/UserCollection/UserCollection';
import RegisterContainer from '~/Containers/Register';
import LoginContainer from '~/Containers/Login';
import AccountContainer from '~/Containers/Account';
import RedeemContainer from '~/Containers/Redeem';
import ProofContainer from '~/Containers/Proof';
import Footer from '~/Components/Footer/Footer';
// COMMON
import generateSeed from '~/common/generateNum';
import { login, logout, loggedIn, accountDetails } from '~/common/loginService';
import { sendRedeemCode, sendProof, checkParamAgainstCode } from '~/common/redeemService';
import { fetchSimpleTokens, insertSimpleToken } from '~/common/tokenService';
import history from '~/common/history';
import getCookie from '~/common/cookie';

// BLOCK CHAIN
import TruffleContract from 'truffle-contract';
  // for testing only
import contractJson from '../../build/contracts/EcoAllyCore.json';
// ASSETS
import '~/assets/scss/styles.scss';
import 'materialize-css/dist/css/materialize.css'
import '~/assets/scss/materialExtended.scss';
import 'materialize-css/dist/js/materialize.js'
// ACTIONS
import { setAllies, setAccountInfo, setAlert, clearAlert, clearAllAllerts, setPathname } from '../actions/index.js';

// COMPONENT
class App extends React.Component {
  constructor(){
    super();
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
        this.props.setAccountInfo({loggedIn:false, publicEthKey: ''});
        setTimeout(()=>(history.push(`${APP_ROOT}login`)),1000);
     
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
    this.getAlliesOfUser(this.props.account.fullAccount);
    
  }

  // Get the Allies of a particular user from the blockchain
  getAlliesOfUser(fullAccount){
    if(fullAccount){
      this.instance.tokensOfOwner.call(this.props.account.publicEthKey).then((tokens)=>{
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
            this.props.setAllies(allies);
        });

      });
    }else{
      fetchSimpleTokens(this.props.account.email)
      .then((data) =>{
        console.log('DATA', data);
        this.props.setAllies(data.tokenArray);
      });
    }
  }

  // Check if a web3 account of the user matches the account saved in our DB
  // Might need to modify this in case user is using multiple web3 accounts on metamask
  checkForAccountMatch(){
    this.web3.eth.getAccounts((err,accounts) =>{
      const publicEthKey = this.props.account.publicEthKey.toLowerCase();
      let metamaskError = null;
      if(err) metamaskError = err;
      if( accounts[0] === publicEthKey){
        this.getAlliesOfUser(this.props.account.fullAccount);
      }else{
        metamaskError = `Please sign into account ${publicEthKey} in metamask!`;
        this.props.setAlert({type : 'error', message : metamaskError});
      }
    });
  }

  // Build a new ally on the blockchain
  buildAlly(){
    const num = generateSeed();
    if(this.props.account.fullAccount){
      this.instance.addAlly(num, {from : this.props.account.publicEthKey});
    }else{console.log('making');
      insertSimpleToken(num, this.props.account.email)
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
    const from = this.props.account.publicEthKey;
    if(to !== this.props.account.publicEthKey){
      //console.log('going', to, allyIndex);
      this.instance.transferEcoAlly(from, to, allyIndex, {from : this.props.account.publicEthKey});
    }else{
      alert('please enter an account that\'s not your own');
    }
    
  }

  // On component mount, if there is a cookie called 'sid' and the user is not logged in,
  // log the user in and initialize web3.
  componentDidMount(){

    //const cookie = APP_ROOT === '/' ? getCookie('sid') : getCookie('__cfduid');
    //console.log('COOKIE', cookie, APP_ROOT);
    if(!this.props.account.loggedIn /*&& cookie*/){
      loggedIn()
      .then((data)=>{
        if(data && data.data.fullAccount){
          this.props.setAccountInfo({ loggedIn : true, fullAccount : data.data.fullAccount, email : data.data.email, username : data.data.username, publicEthKey : data.data.publicEthKey });
        }else{
          this.props.setAccountInfo({ loggedIn : true, fullAccount : data.data.fullAccount, email : data.data.email, username : data.data.username });
        }
      }).catch((e) =>{return;});
    }
  }

  // After a user logs in, or visits the site while already logged in,  get allies of user
  componentDidUpdate(pp,ps){
    if(pp.account.loggedIn === false && this.props.account.loggedIn){
      if(this.props.account.fullAccount){
        this.initWeb3();
      }else{
        this.initSimpleMode();
      }
    }

    // reset alerts and set path in state if user changes page
    if(pp.route !== history.location.pathname){
      this.props.setPathname({pathname : history.location.pathname});
      this.props.clearAllAllerts();
    }
  }

  componentWillUnmount(){
    this.routeUnlisten();
  }
  
  
  render() {
    return (
      <div>
        <Header>
            <Nav handleLogin={this.handleLogin.bind(this)}  loggedIn={this.props.account.loggedIn} />
            <div className="brand">
                <h1>ECO ALLIES</h1>
                <p>Defenders of Gaia</p>
            </div>
            <div className="belt"></div>
        </Header>
        <Content >
          <Switch>
            {/* <Route path={(`${APP_ROOT}`|`${APP_ROOT}about`)} component={About}  /> */}
            <Route path={`${APP_ROOT}proof`} component={() => (<ProofContainer handleProof={this.handleProof.bind(this)} />)} />
            <Route exact path={`${APP_ROOT}redeem`} component={() => (<RedeemContainer handleRedeem={this.handleRedeem.bind(this)}  buildAlly={this.buildAlly.bind(this)} /> )} /> 
            <Route path={`${APP_ROOT}redeem/:qr`} component={({match}) => (<RedeemContainer match={match}  handleRedeem={this.handleRedeem.bind(this)} checkParamAgainstCode={this.checkParamAgainstCode.bind(this)} buildAlly={this.buildAlly.bind(this)} /> )} /> 
            <Route path={`${APP_ROOT}gallery`} component={() => (<Gallery  /> )} />
            <Route path={`${APP_ROOT}user-collection`}  render={() => <UserCollection buildAlly={this.buildAlly.bind(this)}  transferAlly={this.transferAlly.bind(this)} />}   />
            <Route path={`${APP_ROOT}register`} component={() => (<RegisterContainer /> )} />
            <Route path={`${APP_ROOT}login`} component={() => (<LoginContainer handleLogin={this.handleLogin.bind(this)} /> )} /> 
            <Route path={`${APP_ROOT}account`} component={() =>( <AccountContainer /> )}  />
            {/* <Route path="faq" component={Faq} />*/}
          </Switch>
        </Content>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    account : state.account
  }
}

const mapDispatchToProps = {
    setAllies,
    setAccountInfo,
    setAlert,
    clearAlert,
    clearAllAllerts,
    setPathname

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
