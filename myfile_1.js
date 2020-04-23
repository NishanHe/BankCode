/**
 * 
 */
var bank_code;
function pageLoad(){
	document.getElementById("decode").onclick = handleBankCode;
	//set the onfocus value, so when something is typed in the input area, the function changeBg will be excuted
	document.getElementById("code").onfocus = changeBg;
	
	//deal with the function of button hide
	//document.getElementById("hide").onclick = hideAndShow;	

	$(document).ready(function(){
	    $("#hide").click(function(){
	    	
	    	if($("#hide").val() == "Hide"){
	    		$("#hide").val("Show");
	    		$("#infoSec").slideUp();
	    		
	    	}else if($("#hide").val() == "Show"){
	    		$("#hide").val("Hide");
	    		$("#infoSec").slideDown();
	    	}
	        
	        
	    });   
	});
	
}

window.onload = pageLoad;

//the function for change the input area's color to light grey

function changeBg(){
	document.getElementById("code").style.backgroundColor = "lightgrey";
}

//when click the button "Decode",get the input value----typed bank code


//to decode the bank code and get information
function handleBankCode(){
	var version;
	var account,showAccount;
	var total,showTotal;
	var rf,showRf;
	var date,showDate;
	//string of code
	var code;
	//get the text typed in the text area
	bank_code = document.getElementById("code").value;
	//convert input value to string
	if(bank_code.length != 0){
		code = new String(bank_code);
	}else{
		alert("Please enter your bank code! ");
	}
	
	//the first character should be version
	version = code.substring(0,1);
	if(version == '4'){
		//handle the bank code of version 4
		account = code.substring(1,17);
		
		showAccount = account.slice(14);
		var i = 14
		//add space in account number
		while(i>0){
			var addit = account.substring(i-4,i).concat(' ');
			showAccount = addit.concat(showAccount);
			i = i - 4;
		}
		
		showAccount = account.substring(0,i).concat(showAccount);

		//convert total into number to get rid of zeros in the front
		total = code.substring(17,25);
		showTotal = parseFloat(total);
		
		//convert reference number into number to get rid of zeros in the front
		rf = code.substring(25,48);
		var intRf = parseInt(rf);
		rf = intRf.toString();
		showRf = rf.slice(rf.length-5);
		var j = rf.length-5;
		while(j>0){
			var add = rf.substring(j-5,j).concat(' ');
			showRf = add.concat(showRf);
			j = j-5;
		}
		showRf = rf.substring(0,j).concat(showRf);
		
		
		//change date to the standard format
		date = code.substring(48,54);
		//if date part equals 000000,then the due date is None 
		if(!date == '000000'){
			var tt = "20";
			var dd = date.slice(4);
			var mm = date.substring(2,4);
			var yy = date.substring(0,2);
			showDate = dd.concat('.').concat(mm).concat('.').concat(tt).concat(yy);
		}else{
			showDate = 'None';
		}
		
		
	}else if(version == '5'){
		//handle the bank code of version 5
		
		account = code.substring(1,17);
		
		
		//add space in account number
		showAccount = account.slice(14);
		var m = 14
		while(m>0){
			var addit = account.substring(m-4,m).concat(' ');
			showAccount = addit.concat(showAccount);
			m = m - 4;	
		}
		
		showAccount = account.substring(0,m).concat(showAccount);
		
		//convert total into number to get rid of zeros in the front
		total = code.substring(17,25);
		showTotal = parseFloat(total);
		
		//convert reference number into number to get rid of zeros in the front
		rf = code.substring(25,48);
		
		var begin = 'RF';
		begin = begin.concat(rf.substring(0,2));
		
		//take the first two numbers out
		var intRf = parseInt(rf.slice(2));
		rf = intRf.toString();
		
		var n = 0;
		showRf = "";
		while(n<rf.length){
			var space = " ";
			var add = space.concat(rf.substring(n,n+4));
			showRf = showRf.concat(add);
			n = n + 4;
		}
		showRf = begin.concat(showRf).concat(rf.slice(n));
	
		
		//change date to the standard format
		date = code.substring(48,54);
		//if date part equals 000000,then the due date is None 
		if(!date == '000000'){
			var tt = "20";
			var dd = date.slice(4);
			var mm = parseInt(date.substring(2,4)).toString();
			var yy = date.substring(0,2);
			showDate = dd.concat('.').concat(mm).concat('.').concat(tt).concat(yy);
		}else{
			showDate = 'None';
		}
		
	}else{
		alert("Please enter the right bank code!");
	}
	
	document.getElementById('iban').innerHTML = showAccount;
	document.getElementById('amount').innerHTML = showTotal;
	document.getElementById('pr').innerHTML = showRf;
	document.getElementById('date').innerHTML = showDate;
	
	var barcode = document.getElementById('barcode'),
	str = bank_code,
	options = {
	    format: "CODE128",
	    displayValue: true,
	    fontSize: 18,
	    height: 100
	};
	JsBarcode(barcode, str, options); 
}




//function hideAndShow(){
//	var btnVal = document.getElementById("hide");
//	if(btnVal.value == "Hide"){
//		
//		btnVal.value = "Show";
//		
//	}else if(btnVal.value == "Show"){
//		
//		btn.value = "Hide";
//		
//	}
//}



















