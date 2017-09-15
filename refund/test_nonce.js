const fs = require('fs')
var Web3=require("web3")

var BigNumber = require('bignumber.js');
var Tx = require('ethereumjs-tx');
var ethUtil = require('ethereumjs-util');
//var Wallet=require('ethereumjs-wallet');

const qualified = require('./qualified.json')

// console.log(qualified);

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    console.log("start web instance")
    web3 = new Web3(new Web3.providers.HttpProvider("http://k3.andui.tech:8545"));
}

// console.log(parseInt(web3.toWei(0.01,'ether'), 10))

var int_nonce = web3.eth.getTransactionCount("0x5EA611A0Dc223bC65f71D746b333AC74b8afB146");

console.log("nonce:",int_nonce.toString())