
var counter = 0;
var saldo;
var saldoasli = 0;
var order = 0;
var loss = 0;
var lot;
var lot_awal;
var target_profit;
var target_loss;
var balan;
var balandua;
var hitungloss;
var hitunglossfix;
var status_trade = "won";
var lot_trade;
var contract_trade;
var token_api;
var waktu1;
var waktu2;
var digitbarrier;

var lastEmpat;
var lastDua;
var tebak = 0;
var ayo = 0;
var hajar = 0;
var sikat = 0;

var harga_satu = 0;
var harga_dua = 0;
var harga_tiga = 0;
var counter_tick = 0;
var eksekusi = "";
var orderan = 0;
var order_virtual = 0;
var aut = 0;
var history_satu = 0;
var history_dua = 0;
var history_tiga = 0;
var history_empat = 0;
var history_lima = 0;
var angka_penentu = 0;
//WebSocket.close();
var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=19211');

ws.onopen = function(evt) {
    ws.send(JSON.stringify({ticks:'1HZ25V'}));
	
};

var intervalId = setInterval(function() {
    ws.send(JSON.stringify({ping:'1'}));
	waktu1 = Date.now();
	ws.send(JSON.stringify({"balance":1}));
}, 5000);

ws.onmessage = function(msg) {
    var data = JSON.parse(msg.data);
    var msg_type = data["msg_type"];
	//console.log('response: %o', msg_type);
    
	if (msg_type === "history"){
		if (data.history.prices[9].toString().length === 9 && data.history.prices[8].toString().length === 9 && data.history.prices[7].toString().length === 9){
		history_satu = data.history.prices[9];
		history_dua = data.history.prices[8];
		history_tiga = data.history.prices[7];
		history_empat = data.history.prices[6];
		history_lima = data.history.prices[5];
		//console.log('history: ', data.history.prices[9] ,' - ', data.history.prices[8] ,' - ', data.history.prices[7] ,'');
		}
	}
	if (msg_type === "balance") {
		console.log('balance: %o', data.balance.balance);
		saldo = data.balance.balance;
		if (aut === 1){
		document.querySelector("#balance").innerText = "" + data.balance.balance + "";
		aut = 0;
		}
		
		
	}
	if (msg_type === "ping") {
		//contract_trade = data.buy.contract_id;
        //console.log('ping: %o', data);
		waktu2 = Date.now() - waktu1;
		console.log('Latency : ', waktu2);
		document.querySelector("#latency").innerText = "Latency : " + waktu2 + "";
    }
	if (msg_type === "buy") {
		contract_trade = data.buy.contract_id;
        console.log('buy response: %o', data.buy.contract_id);
    }
    if (msg_type === "proposal_open_contract") {
		if (data !== undefined){
		status_trade = data.proposal_open_contract.status;
		lot_trade = data.proposal_open_contract.buy_price;
        console.log('proposal: %o', status_trade);
		
		if (status_trade === "lost") {
			loss = 1;
			if (tebak === 2 && loss === 1){
				tebak = 0;
				ayo = 0;
				hajar = 0;
				sikat = 0;
				orderan = 0;
				//if (eksekusi === "CALL") eksekusi = "PUT";
				//if (eksekusi === "PUT") eksekusi = "CALL";
			}
			document.querySelector("#status_trade").innerText = "LOSS!!!";
			orderan = 0;
			tebak = 0;
			ayo = 0;
			hajar = 0;
			sikat = 0
			//angka_penentu = 0;
		}
		if (status_trade === "won") {
			loss = 0;
			tebak = 0;
			ayo = 0;
			hajar = 0;
			sikat = 0;
			contract_trade = 0;
			orderan = 0;
			document.querySelector("#status_trade").innerText = "PROFIT!!!";
			//angka_penentu = 0;
		}
		}
    }
    if (msg_type === "authorize") {
        //console.log('authorize response: %o', data);
		saldoasli = data.authorize.balance;
		
		saldo = data.authorize.balance;
		
    }
	if (msg_type === "tick") {
		ws.send(JSON.stringify({"ticks_history":"1HZ25V","adjust_start_time":1,"count":"10","end":"latest","start":1,"style":"ticks"}));
			   
		lot_awal = document.querySelector("#lot").value;
		target_profit = document.querySelector("#lot").value * 15;
		target_loss = document.querySelector("#lot").value * -10;
		//console.log('target loss', target_loss);
		token_api = document.querySelector("#token").value;
		
		if (counter === 0) {
			
			
			hitunglossfix = +(hitungloss);
			console.log('hitung loss ' + hitungloss + '');
			
			document.querySelector("#loss").innerText = "" + loss + "";
			
			
		}
		if (counter > 0) counter = counter + 1;
		if (counter_tick >= 0) counter_tick = counter_tick + 1;
		var toText = data.tick.quote.toString(); //convert to string
        var lastChar = toText.slice(-2); //gets last character
        var lastDigit = +(lastChar); //convert last character to number
		
		if (toText.length === 9){
		lastDua = toText.slice(-1);
		var lastTiga = toText.slice(0,6);
		lastEmpat = lastTiga.slice(-1);
		digitbarrier = +(lastEmpat);
		//console.log('digit terakhir: %o', lastEmpat);
		if (harga_satu === 0 && counter_tick === 1){
			harga_satu = +(lastDua);
		}
		if (harga_satu !== 0 && counter_tick === 2){
			harga_dua = +(lastDua);
		}
		if (harga_dua !== 0 && counter_tick === 3){
			harga_tiga = +(lastDua);
		}
		console.log('counter tick', counter_tick);
		//console.log('digit satu', harga_satu);
		//console.log('digit dua', harga_dua);
		//console.log('digit tiga', harga_tiga);
		
		console.log('angka_penentu : ', angka_penentu);
		//console.log('ayo : ', ayo);
		document.querySelector("#logic").innerText = "" + tebak + "";
		document.querySelector("#logic2").innerText = "" + ayo + "";
		document.querySelector("#logic3").innerText = "" + hajar + "";
		document.querySelector("#logic4").innerText = "" + sikat + "";
		
        document.querySelector("#tick").innerText = "" + data.tick.quote + "";
		document.querySelector("#terakhir").innerText = "" + lastChar.toString() + "";
		document.querySelector("#terakhirdua").innerText = "" + lastEmpat + "";
		
		
		if ((history_tiga > history_satu && document.querySelector("#jalan").innerText === "1")){
			if ((counter === 0 && status_trade !== "open" && sikat === 2)){
			tebak = 2;
			//counter = 1;
			}
		}
		
		
		
		if ((document.querySelector("#jalan").innerText === "1")){
			if ((counter === 0 && status_trade !== "open" && ayo === 2 && waktu2 <= 4000)){
			ws.send(JSON.stringify({authorize:'' + token_api + ''}));
			document.querySelector("#saldo").innerText = "" + saldo + "";
			counter = 1;
			order = 1;
			orderan = 1;
			console.log('buy bosku');
			//document.querySelector("#myBtn").click();
			// buyyyyyyyyyyyyyyyy
			console.log('Lot : ' + lot + '');
				//ws.send(JSON.stringify({authorize:'GUD9xZiCshPrIpL'}));
			ws.send(JSON.stringify({"buy":1,"parameters":{"amount":"" + lot + "","app_markup_percentage":"2","basis":"stake","contract_type":eksekusi,"currency":"USD","duration":2,"duration_unit":"t","symbol":"1HZ25V"},"price":"" + lot + ""}));
            //ws.send(JSON.stringify({"buy":1,"parameters":{"amount":"" + lot + "","app_markup_percentage":"2","barrier":8,"basis":"stake","contract_type":"DIGITUNDER","currency":"USD","duration":1,"duration_unit":"t","symbol":"1HZ25V"},"price":"" + lot + ""}));
				//ws.send(JSON.stringify({authorize:'gqtfnLSQqaNWKKc'}));
			//document.querySelector("#myBtn1").click();
			ws.send(JSON.stringify({"proposal_open_contract":1, "contract_id": "" + contract_trade + ""}));
		    }
			
		}
		if (document.querySelector("#jalan").innerText === "1"){
			console.log('start bot');
		}
		if (document.querySelector("#jalan").innerText !== "1"){
			console.log('stop bot');
		}
		}
		if (counter > 1 && counter < 8) {
			//ws.send(JSON.stringify({authorize:'GUD9xZiCshPrIpL'}));
			//document.querySelector("#myBtn1").click();
			ws.send(JSON.stringify({"proposal_open_contract":1, "contract_id": "" + contract_trade + ""}));
		}
		if (counter > 8 && counter < 10) {
			ws.send(JSON.stringify({authorize:'' + token_api + ''}));
			//document.querySelector("#myBtn1").click();
			ws.send(JSON.stringify({"proposal_open_contract":1, "contract_id": "" + contract_trade + ""}));
		}
		if (counter > 11 && counter < 15) {
			//counter = 0;
			//order = 0;
			//sikat = 0;
			
			balan = document.querySelector("#balance").innerText;
			balandua = +(balan);
			hitungloss = saldo - balandua;
			hitunglossfix = +(hitungloss);
			console.log('hitung loss ' + hitungloss + '');
			console.log('LOSS : ' + loss + '');
			document.querySelector("#saldo").innerText = "" + saldo + "";
			document.querySelector("#loss").innerText = "" + loss + "";
			if (loss === 0){
				lot = lot_awal;
			}
	        if (loss === 1){
				lot = lot_trade * 1;
			}
			
			document.querySelector("#profit").innerText = "" + hitungloss + "";
			if (hitungloss >= target_profit){
				document.querySelector("#jalan").innerText = "2";
				document.querySelector("#status_bot").innerText = "BOT STOP";
				console.log('target tercapai');
			}
			if (hitungloss <= target_loss){
				document.querySelector("#jalan").innerText = "2";
				document.querySelector("#status_bot").innerText = "BOT STOP";
				console.log('kena SL bossssssssssssss');
			}
			
			
			
			
			
		}
		if (counter > 15) {
			counter = 0;
			order = 0;
			//sikat = 0;
			
			
			
		}
		document.querySelector("#counter").innerText = "" + counter + "";
		
		if ((history_lima > history_empat && history_empat < history_tiga && history_dua < history_tiga && history_dua > history_satu && document.querySelector("#jalan").innerText === "1")){
			if ((counter === 0 && status_trade !== "open" && orderan === 0)){
				counter_tick = 1;
				order_virtual = 1;
				eksekusi = "CALL";
				ayo = 2;
			}
		}
		if ((history_lima < history_empat && history_empat > history_tiga && history_dua > history_tiga && history_dua < history_satu && document.querySelector("#jalan").innerText === "1")){
			if ((counter === 0 && status_trade !== "open" && orderan === 0)){
				counter_tick = 1;
				order_virtual = 1;
				eksekusi = "PUT";
				ayo = 2;
			}
		}
		
		if ((counter_tick === 3 && history_tiga > history_satu && orderan === 0 && order_virtual === 1)){
			sikat = 2;
			//angka_penentu = history_tiga;
			//hajar = angka_penentu;
			//console.log('digit 2', harga_tiga);
		}
		
		
		if ((tebak === 2 && history_tiga < history_satu)){
			tebak = 0;
		}
		//if ((ayo === 2 && history_lima < history_empat && history_empat < history_tiga && history_tiga < history_dua)){
			//ayo = 0;
		//}
		//if ((ayo === 2 && history_lima > history_empat && history_empat > history_tiga && history_tiga > history_dua)){
			//ayo = 0;
		//}
		
		
    }
	
   //document.querySelector("#tick").innerText = "" + data.tick.quote + "";
   //console.log('ticks update: %o', data.tick.quote);
   if (counter_tick > 3) counter_tick = 0;
   
};

//document.getElementById("lot").addEventListener("click", function MyFunction(evt){
	            
				//lot_awal = document.querySelector("#lot").value;
//});

document.getElementById("myBtn1").addEventListener("click", function MyFunction2(evt){
               //ws.send(JSON.stringify({"proposal_open_contract":1, "contract_id": "" + contract_trade + ""}));
			   //ws.send(JSON.stringify({forget_all:1}));
			   token_api = document.querySelector("#token").value;
			   ws.send(JSON.stringify({authorize:'' + token_api + ''}));
			   //console.log('socket ', socket.readyState);
			   aut = 1;
			   //ws.send(JSON.stringify({"ticks_history":"1HZ25V","adjust_start_time":1,"count":"1000","end":"latest","start":1,"style":"ticks"}));
			   //document.querySelector("#balance").innerText = "" + saldoasli + "";
			   //ws.send(JSON.stringify({"buy":1,"parameters":{"amount":"" + lot + "","basis":"stake","contract_type":"PUT","currency":"USD","duration":1,"duration_unit":"t","symbol":"1HZ25V"},"price":"" + lot + ""}));
			   
});
document.getElementById("start").addEventListener("click", function MyFunction3(evt){
               document.querySelector("#jalan").innerText = "1";
			   ws.send(JSON.stringify({authorize:'' + token_api + ''}));
			   document.querySelector("#balance").innerText = "" + saldoasli + "";
});
document.getElementById("stop").addEventListener("click", function MyFunction4(evt){
               document.querySelector("#jalan").innerText = "2";
});


//ws.send(JSON.stringify({"buy":1,"parameters":{"amount":"" + lot + "","app_markup_percentage":"2","barrier":"" + digitbarrier + "","basis":"stake","contract_type":"DIGITDIFF","currency":"USD","duration":2,"duration_unit":"t","symbol":"1HZ25V"},"price":"" + lot + ""}));


