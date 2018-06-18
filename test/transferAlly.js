const Core = artifacts.require('EcoAllyCore');

contract('TRANSFER', async (accounts) => {
    let contractInstance;
    // before((done) => {  
    //     Core.deployed().then(function(instance){
    //         console.log(web3.eth.accounts[0]);
    //         contractInstance = instance;
    //         contractInstance.addAlly('bill', {from:'0x8626cC10AF4AE48e97926BbCF3c4F32AAdfD5c7D'});
    //         contractInstance.addAlly('david', {from:'0x8626cC10AF4AE48e97926BbCF3c4F32AAdfD5c7D'});
    //         contractInstance.addAlly('jim', {from:'0xcc1A64c458ba381C593aD92CA651Fb276092A1D3'});
    //         contractInstance.addAlly('jim', {from:'0xcc1A64c458ba381C593aD92CA651Fb276092A1D3'});
    //         done();
    //     });
    // });

    it('Should transfer bill to account 1', () =>{
        
        return Core.deployed().then(function(instance){
            console.log(web3.eth.accounts[0]);
            contractInstance = instance;
            return contractInstance.addAlly('bill', {from:'0x8626cC10AF4AE48e97926BbCF3c4F32AAdfD5c7D'});
            //contractInstance.addAlly('david', {from:'0x8626cC10AF4AE48e97926BbCF3c4F32AAdfD5c7D'});
            //contractInstance.addAlly('jim', {from:'0xcc1A64c458ba381C593aD92CA651Fb276092A1D3'});
            //contractInstance.addAlly('jim', {from:'0xcc1A64c458ba381C593aD92CA651Fb276092A1D3'});
            
        }).then(function(){
            contractInstance.transferEcoAlly.call('0x8626cC10AF4AE48e97926BbCF3c4F32AAdfD5c7D', '0xcc1A64c458ba381C593aD92CA651Fb276092A1D3', 0)
            .then(function(){
                contractInstance.balanceOf.call('0x8626cC10AF4AE48e97926BbCF3c4F32AAdfD5c7D').then(function(bal){
                    console.log('account 0 count - ', bal.toNumber());
                });
    
                contractInstance.balanceOf.call('0xcc1A64c458ba381C593aD92CA651Fb276092A1D3').then(function(bal){
                    console.log('account 1 count -', bal.toNumber());
                });
                
                contractInstance.tokensOfOwner.call('0xcc1A64c458ba381C593aD92CA651Fb276092A1D3').then(function(tokenArray){
                    console.log('TA', tokenArray);
                })
                
                //assert.equal(1,2,'test');
            });
                
            
        });
            
    });
    
});