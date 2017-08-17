var abi = require('./index.js')


console.log(abi.rawEncode([ 'address[]', 'uint256'], [ ["0x008795718efe70dfaA6d6cd4633E1bD5c17aA68C","0x34B0b1e9E42721E9E4a3D38A558EB0155a588340","0x52386BE2397e8EAc26298F733b390684203fB580"],2 ]).toString('hex'))

console.log(abi.rawEncode([ 'address[]', 'uint256'], [ ["0x009514B270457718478Ab860B41A3c1ed290a2b0","0x864b7294274f8b1Fb34fAABA8BfC30e72Cffe45C","0x69A009FFb0627d60Ae9D253346d25B86A6731069"],2 ]).toString('hex'))

console.log(abi.methodID('addOwner', [ 'address' ]).toString('hex') + abi.rawEncode([ 'address' ], [ '0x864b7294274f8b1Fb34fAABA8BfC30e72Cffe45C' ]).toString('hex'));

console.log(abi.methodID('transfer', [ 'address', 'uint256' ]).toString('hex') + abi.rawEncode([ 'address', 'uint256' ], [ '0x69A009FFb0627d60Ae9D253346d25B86A6731069', "10000000000000000" ]).toString('hex'));

console.log("encode withdraw from contribution wallet:");
//console.log(abi.methodID('withdraw', []).toString('hex') + abi.rawEncode([], []).toString('hex'));
console.log(abi.methodID('withdraw', []).toString('hex'));

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
