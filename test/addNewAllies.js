const Core = artifacts.require('EcoAllyCore');

// contract('WRITE', async (accounts) =>{
//     xit('Should add a new EcoAlly to the main array and return the address of the sender', async () => {
//         let instance = await Core.deployed();
//         let owner = await instance.addAlly.call('Dave');
//         const sendingAddress = accounts[0];
//         assert.equal(owner, sendingAddress, 'Should be first sending address');
//     });

//     xit('Should add a new Ally for the second account and return his address', function(){
//         let instance = Core.deployed();
//         instance.then(function(val){
//             return val.addAlly.call('Tim', {from:web3.eth.accounts[1]});
//         }).then(function(owner){
//             const sendingAddress = accounts[1];
//             assert.equal(owner, sendingAddress, 'addresses did not match');
//         });
//     });

// });