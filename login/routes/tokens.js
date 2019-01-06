const express = require('express');
const router = express.Router(); 
const RetrievalCode = require('../db').RetrievalCode;
const sendMail = require('../mail.js');

// LOGIN TO EXISTING ACCOUNT
router.post('/retrieval-code', function(req, res, next){
  console.log('RRR',req.body);
  // Manually establish the session...
  RetrievalCode.find({
    where : {
      code : req.body.code
    },
    attributes:['code', 'claimed', 'claimedBy']
  }).then((codeData, err) => {
    console.log('!!! getting ready to send code data', err);
    if(codeData){
      if(codeData.claimed){
        res.json({
          error: 'Invalid Code',
          claimedBy : codeData.claimedBy,
          requestType : 'POST',
          success : false
        });
      }else{
        res.json({
          code : codeData.code,
          claimed : codeData.claimed,
          claimedBy : codeData.claimedBy,
          requestType : 'POST',
          success : true
        });
      }
    }else{
      res.json({
        error: 'Invalid Code',
        requestType : 'POST',
        success : false
      });
    }
    next();
  });
});

router.post('/proof', function(req, res, next){
  console.log('body - ', req.body);
  console.log('FILES - ', req.files);
  
  new Promise((resolve, reject) =>{
    sendMail({filename : req.files.file.name, message : req.body.message, file : req.files.file.data}, resolve, reject);
  }).then((data) =>{
    //console.log('INFO', data);
    res.json({
      success : true,
      requestType : 'POST',
      info : data
    });
  });

    
  
});

module.exports = router;