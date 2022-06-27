var sailingList= [];
var helper=require('../models/helper');

//Retrieve the data from JSON from store for further processing
var {freightData}=require('./jsonconfig');
var data=freightData();

//function to get teh cheapest direct sailing data
var getCheapestDirectData={
      getCheapestDirectSailingData:function(callback){    
        for(let val of data.sailings) 
        {  
            helper.getRatesVal(val.sailing_code,data.rates);
            if (val.origin_port == "CNSHA" && val.destination_port == "NLRTM")
            {
                sailingList=helper.getExchangeData(val.departure_date,val.sailing_code,true,data.exchange_rates);
            }
        }
        var mergedata =helper.getFinalData(sailingList,"",data.sailings,data.rates)
        sailingList=[];
        return callback(mergedata);
    }
};
module.exports=getCheapestDirectData;