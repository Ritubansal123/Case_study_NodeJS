var sailingList= [];
var arrsailingcode= [];
var sailingIndirectList= [] ;
var indirectkey;
var sailingdata;
var helper=require('./helper');

//Retrieve the data from JSON from store for further processing
var {freightData}=require('./jsonconfig');
var data=freightData();

//API call to check the cheapest direct or indirect sailing 
var getCheapestData={
    getCheapestSailingData:function(callback)  
    {
        for(let val of data.sailings) 
        {  
           if(arrsailingcode== "undefined" || !arrsailingcode.find(item => item.sailing_code != val.sailing_code))
           {
                helper.getRatesVal(val.sailing_code,data.rates);
                sailingList=helper.getExchangeData(val.departure_date,val.sailing_code,true,data.exchange_rates);
                if(val.destination_port != "NLRTM")
                {
                    sailingdata=data.sailings.filter(o => o.sailing_code != val.sailing_code && o.destination_port == "NLRTM" && o.origin_port==val.destination_port);
                    if(sailingdata != undefined)
                    {
                        for(var indirectdata of sailingdata)
                        {
                            arrsailingcode.push(indirectdata.sailing_code);
                            sailingIndirectList=helper.getExchangeData(indirectdata.departure_date,indirectdata.sailing_code,false,data.exchange_rates); 
                        }
                        var leastSailing=sailingList.find(o => o.id == val.sailing_code);
                        var totalsum=0;
                        for(var addvalue of sailingIndirectList)
                        {
                            var sum= parseFloat(leastSailing.value) + parseFloat(addvalue.value);
                            if(totalsum < sum){
                                totalsum=sum;
                                indirectkey= addvalue.id;   
                            }
                        }
                       var  objIndex = sailingList.findIndex((obj => obj.id == val.sailing_code));
                       sailingList[objIndex].value=totalsum.toFixed(2);
                   }
                }
            }
        }
       var mergedata =helper.getFinalData(sailingList,indirectkey,data.sailings,data.rates);
       return callback(mergedata);
    }
};

module.exports=getCheapestData;