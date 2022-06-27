var express = require('express');
var router = express.Router();
var getSailingData=require('../models/getCheapestSailingData');
var getCheapestData=require('../models/getCheapestDirectData');

 //api call to get Cheapest direct sailing data
 router.get('/getCheapestDirectSailingData', function(req,res){
  getCheapestData.getCheapestDirectSailingData(function(data,err){
      if (err){
        res.json(err);
      }else {
          res.json ({data});
      }
    });
  });


  //api call to get Cheapest direct or indirect sailing data
 router.get('/getCheapestSailingData', function(req,res){
  getSailingData.getCheapestSailingData(function(alldata,err){
      if (err){
        res.json(err);
      }else {
          res.json ({alldata});
      }
    });
  });
 


module.exports=router;
