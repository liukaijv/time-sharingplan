MT.prototype=
{ 
    quote:null, 
    mins:null
} 
function MT(quote,mins)
{ 
    this.quote=quote; 
    this.mins=mins; 
}
function getMins() {
	if(parent._stockCode=='undefined'){
		return
	}
	var _stockCode = '2'+parent._stockCode+'11';
	//var _stockCode = '260000111';
	var mt;
	var mt = null;
	$.request.bex({
		type:'post',
		bex:'mins',
		async: false,
		data:{stockcode:_stockCode},
		dataType:'json',
		async:false,
		cache:false,
		success:function(data){
			if(data.mins.flag==1){
				var records = data.mins.data[0].records;
				var size = records.length;
				mins = new Array();
				var quote;
				for(var idx=0; idx<size; idx++){
					 var kdata = records[idx];
					 if(idx==0){
						 quote={
			                    time: (kdata.DATE+kdata.TIME)*1,  //时间
			                    open: kdata.JRKP*1,       //开盘价
			                    preClose: kdata.ZRSP*1,   //昨收
			                    highest: kdata.ZGCJ*1,    //高
			                    //highest: 2.620*1,    //高
			                    lowest: kdata.ZDCJ*1,     //低
			                    //lowest: 2.560*1,     //低
			                    price:  kdata.PJJG*1,     //均价
			                    volume: kdata.CJSL*1,     //量
			                    amount: kdata.CJJE*1      //额 
			             };
					 }
					 var row={
			                    price:  kdata.JRKP*1,     //价
			                    volume: kdata.CJSL*1,     //量
			                    amount: kdata.CJJE*1,      //额 
								time:  (kdata.DATE+kdata.TIME)*1, //时间
								avgprice:  kdata.PJJG*1     //均价
			                };
					 mins.push(row);
				}
				mt=new MT(quote,mins);
			}
		},
		error:function(){
			$.messager.alert('失败','加载数据异常','error');
		}
	});
	return mt;
}