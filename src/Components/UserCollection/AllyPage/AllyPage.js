import React from 'react';

export default class AllyPage extends React.Component{

    render(){
        console.log('PROPS', this.props.match.params);
        return(
            <h1>test</h1>
        );
    }
}
// const renderAllyPage = function(m){
//     console.log('WC', m);
//     return <div>test</div>
// }
// const AllyPage = ({ match }) => (
//     <div>
//       {renderAllyPage(match)}
//     </div>
//   );

// export default AllyPage;