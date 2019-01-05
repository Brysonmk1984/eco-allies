const express = require('express');
const router = express.Router(); 
const RetrievalCode = require('../db').RetrievalCode;

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

  console.log(req.body, req.files);
  console.log('FILES - ', req.files);
  //  let imageFile = req.files;

  //  // Display the key/value pairs
  //  for (var pair of imageFile.entries()) {
  //   console.log('first ', pair[0]+ ', ' + pair[1]); 
  // }

  //  // Display the key/value pairs
  //  for (var pair of req.body.entries()) {
  //   console.log('second ',pair[0]+ ', ' + pair[1]); 
  // }
  res.json({
    success : true,
    requestType : 'POST'
  });
});

module.exports = router;