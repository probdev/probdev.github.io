
document.getElementById("start").addEventListener("click", function MyFunction3(evt){

var p_satu = document.querySelector("#p1").value;
var p_dua = document.querySelector("#p2").value;
var p_tiga = document.querySelector("#p3").value;

var b_satu = document.querySelector("#b1").value;
var b_dua = document.querySelector("#b1").value;
var b_tiga = document.querySelector("#b1").value;



if (parseInt(b_tiga) > 1 || parseInt(p_tiga) > 1){

if (parseInt(p_dua) > 1 && parseInt(b_satu) > 1){
var hitung_p_satu = parseInt(b_dua) + (parseInt(p_dua) + parseInt(p_tiga));
var hitung_p_dua = parseInt(b_dua);
var hitung_p_result = parseInt(hitung_p_satu) + parseInt(hitung_p_dua);
console.log('Result : ', hitung_p_result);
var hitung_b_satu = parseInt(p_dua) + (parseInt(b_dua) + parseInt(b_tiga));
var hitung_b_dua = parseInt(p_dua);
var hitung_b_result = parseInt(hitung_b_satu) + parseInt(hitung_b_dua);

if (hitung_p_result > hitung_b_result){
console.log('Result : BANKER');
document.querySelector("#result").innerText = "BANKER";
} else {
console.log('Result : PLAYER');
document.querySelector("#result").innerText = "PLAYER";

}

} else {
document.querySelector("#result").innerText = "STOP";
}



} else {
document.querySelector("#result").innerText = "STOP";
}




});
