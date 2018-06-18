const Core = artifacts.require('EcoAllyCore');

contract('READ', (accounts) => {
    // before((done) => {  
    //     Core.deployed().then(function(instance){
    //         instance.addAlly('bill');
    //         instance.addAlly('david', {from:web3.eth.accounts[1]});
    //         instance.addAlly('jim');
    //         done();
    //     });
    // });

    // xit('Should read all allies belonging to one address', async () =>{
    //     let instance = await Core.deployed();
    //     let allies = await instance.tokensOfOwner.call(accounts[0]);
    //     console.log('allies',allies);

    //     assert.equal(allies.length, 2, 'Expected to get 2 allies');
    // });

    // xit('should get total ally count', async () =>{
    //     let instance = await Core.deployed();
    //     let totalCount = await instance.totalSupply.call();
    //     assert.equal(Number(totalCount.toString()),3, 'count did not match expectation');
    // });

    // xit('should get first ally', async () =>{
    //     let instance = await Core.deployed();
    //     let firstAlly = await instance.getEcoAlly.call(0);
    //     let expectedValue = '7355578640648812,bill';

    //     expect(firstAlly.toString()).to.equal(expectedValue);
    // });

    // xit('should get DNA of first ally', async () =>{
    //     let instance = await Core.deployed();
    //     let firstAllyDna = Number(await instance.getEcoAllyDnaOnly.call(0));
    //     let expectedValue = 7355578640648812;
    //     assert.equal(firstAllyDna, expectedValue, "DNA didn't match");
    // });
    
});