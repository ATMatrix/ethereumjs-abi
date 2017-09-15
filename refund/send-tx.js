const fs = require('fs')
var Web3=require("web3")
var BigNumber = require('bignumber.js');
var Tx = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');
//var Wallet=require('ethereumjs-wallet');

const qualified = require('./qualified_XXXXX.json')

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    console.log("start web instance")
    web3 = new Web3(new Web3.providers.HttpProvider("http://k3.andui.tech:8545"));
}

// console.log(parseInt(web3.toWei(0.01,'ether'), 10))
var privateKey = new Buffer('', 'hex'); //raw key here

var address = '0x' + ethUtil.privateToAddress(privateKey).toString('hex');
console.log("address", address);
var balance = web3.eth.getBalance(address);
console.log("balance:", balance.toString());
if(balance === 0)
    return;

// var int_nonce = web3.eth.getTransactionCount(address);
var int_nonce = 1521;
console.log("nonce:",int_nonce.toString())

//50000000000; //50 gwei
var gasprice = 5000100000; //30 gwei
console.log('gasPrice', gasprice.toString(16));

var gasLimit_b = 21000;
var gasLimit = ("0x" + gasLimit_b.toString(16));

console.log(gasprice * gasLimit_b)
console.log("qualified length:" + qualified.length);

const processArray = [];
var array_size = 70;
var begin = 0 * array_size;

int_nonce = int_nonce + begin;

var last = (begin + array_size - 1);

if (qualified.length - 1 < last) {
    last = qualified.length - 1;
}

console.log("From: " + begin + " to: " + last)
for (var s = begin; s <= last; s ++)
{
    processArray.push(qualified[s]);
}

var sendTxPromise = function (i) {
    var promise = new Promise( function (resolve, reject) {
        console.log("Starting index -------------------------------------, with i: " + i);
        var value = parseInt(web3.toWei(processArray[i].ETH,'ether'), 10);
            
        // var value = parseInt(web3.toWei(0.01,'ether'), 10);
        // var value = web3.eth.getBalance(address) - gasprice*gasLimit_b;
        console.log('value is: '+ value);
        var value16 = "0x" + value.toString(16);   
                    
        var toAddr = processArray[i].address // to address
        var _nonce = "0x" + ( int_nonce + i).toString(16);
                    
        var rawTx = {
            gasPrice: gasprice,
            gasLimit: gasLimit,
            to: toAddr,
            value: value16,
            nonce: _nonce,
            data: ''
        }
                    
        var tx = new Tx(rawTx);
        tx.sign(privateKey);
        console.log(rawTx );
        var serializedTx = tx.serialize();
        // console.log(tx);
        console.log(serializedTx.toString('hex'));
        //console.log(serializedTx.toString('hex'))

        web3.eth.sendRawTransaction("0x"+ serializedTx.toString('hex'), function (err, hash) {
            if (!err) {
                console.log("tx hash:", hash);
                resolve(hash);
            }else {
                console.log("There is an error-------------------------------------");
                console.log(err);
                reject(err);
            }
        });

    });
        
    return promise;    
}


var timeoutPromise = function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
};


const asyncArray = [];

for (var i = 0; i < processArray.length; i ++){
    asyncArray.push(sendTxPromise);
    asyncArray.push(timeoutPromise);
}

// We create the start of a promise chain
let chain = Promise.resolve();

// chain.then(() => sendTxPromise(0)).then(()=>timeoutPromise(15000)).then(()=>sendTxPromise(1));


var i =0;
// And append each function in the array to the promise chain
for (const func of asyncArray) {
    if(i%2 == 0) {
        (function (j) {
            var x = Math.floor(j/2);
            console.log('x is ' + x);
            chain = chain.then(
                () => func(x)
            );
        })(i);
    }else{
        console.log('i is ' + i);
        chain = chain.then(() => func(1000));
    }

    i = i+1;
}