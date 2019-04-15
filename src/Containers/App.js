// REACT
import React from 'react';
import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
// COMPONENTS
import HeaderContainer from '~/Containers/Header';
import UserCollectionContainer from '~/Containers/UserCollection';
import RegisterContainer from '~/Containers/Register';
import LoginContainer from '~/Containers/Login';
import AccountContainer from '~/Containers/Account';
import SuperRareContainer from '~/Containers/SuperRare';
import RedeemContainer from '~/Containers/Redeem';
import ProofContainer from '~/Containers/Proof';
import ContactContainer from '~/Containers/Contact';
import Content from '~/Components/Content';
import About from '~/Components/About/About';
import FAQ from '~/Components/FAQ/FAQ';
import Gallery from '~/Components/Gallery/Gallery';
import Footer from '~/Components/Footer/Footer';
// COMMON
import history from '~/common/history';
// ASSETS
import '~/assets/scss/styles.scss';
import 'materialize-css/dist/css/materialize.css'
import '~/assets/scss/materialExtended.scss';
import 'materialize-css/dist/js/materialize.js'
// ACTIONS
import { checkLoggedIn, setAccountInfo, clearAllAlerts, setAlert, setPathname, initWeb3, getAlliesOfUser } from '../actions/index.js';

// COMPONENT
class App extends React.Component {
  constructor(){
    super();
    this.routeUnlisten = history.listen((location, action )=>{});
    this.timeout;
  }

  // On component mount, if there is a cookie called 'sid' and the user is not logged in,
  // log the user in and initialize web3.
  componentDidMount(){

    if(!this.props.account.loggedIn){
        //this.props.checkLoggedIn(lsUser);
        this.props.checkLoggedIn();
    }else{
      //this.props.setAlert({type : 'error', message : `You are not logged in!`});
      //this.timeout = setTimeout(() =>{ history.push(`${APP_ROOT}login`); }, 2200)
    }
    // Needed because of the way my rewrite works in htaccess
    if(history.location.pathname === '/'){
      history.push(`${APP_ROOT}about`);
    }
  }

  // After a user logs in, or visits the site while already logged in,  get allies of user
  componentDidUpdate(pp,ps){
    // BK - might be able to combine this with the check below it
    if(pp.account.loggedIn === false && this.props.account.loggedIn){
      if(this.props.account.fullAccount){
        this.props.initWeb3();
      }else{
        this.props.getAlliesOfUser(this.props.account.fullAccount);
      }
    }

    // reset alerts and set path in state if user changes page
    if(pp.route !== history.location.pathname){
      this.props.setPathname({pathname : history.location.pathname});
      //this.props.clearAllAlerts();
    }
  }

  componentWillUnmount(){
    this.routeUnlisten();
    clearTimeout(this.timeout);
  }
  
  render() {
    return (
      <div>
        <HeaderContainer />
        <Content >
          <Switch>
            <Route path={`${APP_ROOT}superrare`} component={() => (<SuperRareContainer />)}  />
            <Route path={`${APP_ROOT}about`} component={() => (<About />)}  />
            <Route path={`${APP_ROOT}proof`} component={() => (<ProofContainer />)} />
            <Route exact path={`${APP_ROOT}redeem`} component={() => (<RedeemContainer /> )} /> 
            <Route path={`${APP_ROOT}redeem/:qr`} component={({match}) => (<RedeemContainer match={match} /> )} /> 
            <Route path={`${APP_ROOT}gallery`} component={() => (<Gallery  /> )} />
            <Route path={`${APP_ROOT}user-collection`}  render={() => <UserCollectionContainer />}   />
            <Route path={`${APP_ROOT}register`} component={() => (<RegisterContainer /> )} />
            <Route path={`${APP_ROOT}login`} component={() => (<LoginContainer /> )} /> 
            <Route path={`${APP_ROOT}account`} component={() =>( <AccountContainer /> )}  />
            <Route path={`${APP_ROOT}faq`} component={() => (<FAQ />)}  />
            <Route path={`${APP_ROOT}contact`} component={() => (<ContactContainer />)}  />
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
    setAccountInfo,
    clearAllAlerts,
    setAlert,
    setPathname,
    initWeb3,
    getAlliesOfUser,
    checkLoggedIn

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));