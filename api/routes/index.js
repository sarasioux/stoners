const express = require('express');

// Constants

// Start the router
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({msg:'Fuck Off'});
});

/* GET all claimable badges. */
router.get('/uri/:id', function(req, res, next) {
    const id = req.params.id;
    const allIds = generateIds();
    res.json(allIds[id]);
    
    // Generate appropriate image
  
    // Upload it to IPFS
  
    // Return the CID
});

const generateIds = function() {
  let ids = [];
  let id = {
    Backgrounds: 0,
    Eyes: 0,
    Mouths: 0,
    Nose: 0
  };
  for(let b=0;b<9;b++) {
      for(let e=0; e<9; e++) {
          for(let m=0; m<10; m++) {
              for(let n=0; n<7; n++) {
                  id = {
                    Backgrounds: b,
                    Eyes: e,
                    Mouths: m,
                    Nose: n
                  }
                  ids.push(id);
              }
          }
      }
  }
  return ids;
};

module.exports = router;
