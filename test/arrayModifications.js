


const Core = artifacts.require('EcoAllyCore');

contract('Core - Array Interactions', async (accounts) =>{
    it('Should add a new EcoAlly to the main array and return the address of the sender', async () => {

        let instance = await Core.deployed();
 
        let owner = await instance.addAlly.call();
        //console.log('ID', Number(id));
        console.log('Owner', owner);
        const sendingAddress = '0x8626cc10af4ae48e97926bbcf3c4f32aadfd5c7d';
        //assert.equal(id, 0, 'ID should be 0');
        assert.equal(owner, sendingAddress, 'Should be first sending address');
       

    });

});