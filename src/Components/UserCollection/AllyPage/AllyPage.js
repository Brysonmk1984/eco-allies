import React from 'react';

// export default class AllyPage extends React.Component{

//     render(){
//         console.log('PROPS', this.props);
//         return(
//             <h1>test</h1>
//         );
//     }
// }

const AllyPage = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );

export default AllyPage;