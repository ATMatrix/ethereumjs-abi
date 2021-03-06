var abi = require('./index.js')


console.log(abi.rawEncode([ 'address[]', 'uint256'], [ ["0x008795718efe70dfaA6d6cd4633E1bD5c17aA68C","0x34B0b1e9E42721E9E4a3D38A558EB0155a588340","0x52386BE2397e8EAc26298F733b390684203fB580"],2 ]).toString('hex'))

console.log(abi.rawEncode([ 'address[]', 'uint256'], [ ["0x009514B270457718478Ab860B41A3c1ed290a2b0","0x864b7294274f8b1Fb34fAABA8BfC30e72Cffe45C","0x69A009FFb0627d60Ae9D253346d25B86A6731069"],2 ]).toString('hex'))

console.log(abi.methodID('addOwner', [ 'address' ]).toString('hex') + abi.rawEncode([ 'address' ], [ '0x864b7294274f8b1Fb34fAABA8BfC30e72Cffe45C' ]).toString('hex'));

console.log(abi.methodID('transfer', [ 'address', 'uint256' ]).toString('hex') + abi.rawEncode([ 'address', 'uint256' ], [ '0x69A009FFb0627d60Ae9D253346d25B86A6731069', "10000000000000000" ]).toString('hex'));


console.log("encode collectTokens for AngelTokenHolder:\n");
console.log(abi.methodID('collectTokens', []).toString('hex'));

console.log("encode string:");
// And to retrieve
// var returned = abi.toAscii("0x7065cb48000000000000000000000000864b7294274f8b1fb34faaba8bfc30e72cffe45c").toHex();

// console.log(returned);

console.log(abi.rawEncode([ 'string' ], [ 'hello world 0x0eb13ea3c70b1d13a8262924da7d7c7b86899debf23dd7f16bf48915bc000226' ]).toString('hex'));


console.log(abi.rawDecode([ 'string' ], new Buffer('0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004e68656c6c6f20776f726c6420307830656231336561336337306231643133613832363239323464613764376337623836383939646562663233646437663136626634383931356263303030323236000000000000000000000000000000000000', 'hex')));



console.log(abi.rawEncode([ 'address'], [ "0x438aa136cf0c57f47145090b642eeb183d2f9107" ]).toString('hex'));


console.log(abi.rawEncode([ 'address', 'uint256', 'address' ], [ "0xe11bd1032fe0d7343e8de21f92f050ae8462a7d7", "1505736000", "0x051fda7486480dd5abcf5dd742ef002a2ebb9ea0" ]).toString('hex'));


console.log(abi.rawEncode([ 'address', 'address', 'address' ], [ "0xe11bd1032fe0d7343e8de21f92f050ae8462a7d7", "0x051fda7486480dd5abcf5dd742ef002a2ebb9ea0", "0x887834d3b8d450b6bab109c252df3da286d73ce4" ]).toString('hex'));


console.log(abi.methodID('claimTokens', [ 'address' ]).toString('hex') + abi.rawEncode([ 'address' ], [ '0x0' ]).toString('hex'));


console.log(abi.rawEncode([ 'address', 'address', 'address' ], [ "0xe11bd1032fe0d7343e8de21f92f050ae8462a7d7", "0x887834D3b8D450B6bAB109c252Df3DA286d73CE4", "0x051fda7486480dd5abcf5dd742ef002a2ebb9ea0" ]).toString('hex'));

console.log("--------     ---------");
// returns the encoded binary (as a Buffer) data to be sent
var encoded = abi.simpleEncode("transfer(address,uint256)", '0x69A009FFb0627d60Ae9D253346d25B86A6731069', "100000000000000000");
console.log(encoded.toString('hex'));

var decoded = abi.rawDecode(['address', 'uint256'], new Buffer("00000000000000000000000069a009ffb0627d60ae9d253346d25b86a6731069000000000000000000000000000000000000000000000000016345785d8a0000", 'hex'));
console.log(decoded[0].toString('hex'));
console.log(decoded[1].toString());

console.log("Official Tx index 3: Transfer 0.1 EOS to a address 0x69A009FFb0627d60Ae9D253346d25B86A6731069");
console.log(abi.methodID('transfer', [ 'address', 'uint256' ]).toString('hex') + abi.rawEncode([ 'address', 'uint256' ], [ '0x69A009FFb0627d60Ae9D253346d25B86A6731069', "100000000000000000" ]).toString('hex'));

console.log("--------------------");

console.log("Official Tx index 4: Withdraw from contribution wallet:");
console.log(abi.methodID('withdraw', []).toString('hex') + abi.rawEncode([], []).toString('hex'));
console.log(abi.methodID('withdraw', []).toString('hex'));

console.log("Official Tx index 5: collect half from angel token holder.");
console.log(abi.methodID('collectTokens', []).toString('hex') + abi.rawEncode([], []).toString('hex'));

console.log("Official Tx index 6: Transfer 1 ATT to a address 0xc62f5D8fBc03C6791ff2E93289c59aAf94Fa0BCc");
console.log(abi.methodID('transfer', [ 'address', 'uint256' ]).toString('hex') + abi.rawEncode([ 'address', 'uint256' ], [ '0xc62f5D8fBc03C6791ff2E93289c59aAf94Fa0BCc', "1000000000000000000" ]).toString('hex'));

console.log("Official Tx index 7: Transfer 6660545 ATT to a address 0xc62f5D8fBc03C6791ff2E93289c59aAf94Fa0BCc");
console.log(abi.methodID('transfer', [ 'address', 'uint256' ]).toString('hex') + abi.rawEncode([ 'address', 'uint256' ], [ '0xc62f5D8fBc03C6791ff2E93289c59aAf94Fa0BCc', "6660545000000000000000000" ]).toString('hex'));
