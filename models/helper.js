var rate,rate_currency;
var arrsailingcode= [];
var amt;
var mergedObj,indrectmergedObj,finalmergedObj;
var sailingdata;

var helper={
    getRatesVal(sailing_code,rates) //function to get the rate and currency based on sailing code
    {
        for(let val of rates) 
        {
            if(sailing_code == val.sailing_code)
            {
                rate=val.rate;
                rate_currency=val.rate_currency;    
                break;
            }
        }
    },
    getExchangeData(departure_date,sailing_code,checkVal,exchange_rates) //Calculate the exchange rate based on rates 
    {
        let sailingList= [],sailingIndirectList=[];
        for(var attributename in exchange_rates) 
        {
            if(departure_date==attributename)
            {
                for(var key in exchange_rates[attributename])
                {
                    if(rate_currency.toUpperCase() == key.toUpperCase()|| "EUR")
                    {
                        var amtValue=exchange_rates[attributename];
                        amt = amtValue[key] * rate;
                        if(checkVal){
                            sailingList.push({id:sailing_code,value:amt.toFixed(2)});
                            return sailingList;
                        }
                        else
                        {
                            sailingIndirectList.push({id:sailing_code,value:amt.toFixed(2)});
                            return sailingIndirectList;
                        }
                     }
                 }
            }
        }
    },
    getFinalData(sailingList,indirectkey,sailings,rates) //Send the final values to api
    {
        var min = Math.min(...sailingList.map(item => item.value));
        let obj = sailingList.find(o => o.value == min);
        var leastSailing=sailings.find(o => o.sailing_code == obj.id);
        var leastRate=rates.find(o => o.sailing_code == obj.id);
        mergedObj = { ...leastSailing, ...leastRate };   
        if(indirectkey != "undefined")
        {
            var leastIndirectSailing=sailings.find(o => o.sailing_code == indirectkey);
            var leastIndirectRate=rates.find(o => o.sailing_code == indirectkey);    
            indrectmergedObj = { ...leastIndirectSailing, ...leastIndirectRate };
            if(indrectmergedObj != undefined){
                var jsons = new Array();
                jsons.push(mergedObj);
                jsons.push(indrectmergedObj);
                mergedObj=jsons;
            }
        }
        return mergedObj;  
    }
};

module.exports=helper;