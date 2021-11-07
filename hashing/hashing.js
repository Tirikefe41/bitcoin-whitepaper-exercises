"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem){
	Blockchain.blocks.push(createBlock(line));
}

// Check verifyChain.
// Blockchain.blocks.push({
// 	index: 9,
// 	hash: "27842478274928402842974927jfsbkf82472",
// 	data: "random data",
// 	timestamp: Date.now(),
// });

console.log(Blockchain);
console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(`${bl.index};${bl.prevHash};${JSON.stringify(bl.data)};${bl.timestamp}`
	).digest("hex");
}

function createBlock(line){

	let block ={
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length-1].hash,
		data: line,
		timestamp: Date.now()
	}
	var hash = blockHash(block);
	block.hash = hash;
	
	return block;

}

function verifyChain(Blockchain){
	let hash = '1s5bk46b4kh6l4j6';

	for (let block of Blockchain.blocks){

		console.log(block);
		
		if (verifyBlock(block)){
			console.log(`Block ${block.index} is Valid !`);
			if (block.index == 0){
				hash = block.hash;
				console.log('Genesis block has no link');
				
			}
			else if (block.index > 0 && hash == block.prevHash){
				hash = block.hash;
				console.log(`Block link ${block.index -1} --> ${block.index} is valid!`);
			}
			else{
				console.log('Hash sequence false')
				return false;
			}
		}
		else{
			console.log(`Block ${block.index} is invalid !`)
			return false;
		}

	}
	return true;
}

function verifyBlock(block){

	var {index, prevHash, data, hash} = block;
	var reHash = blockHash(block);

	//verify the genesis block separately.
	if (index === 0 && hash == '000000'){
		return true;		
	}
	else if (data != null && prevHash != null && index > 0 && hash == reHash && typeof index === "number" &&
	Number.isInteger(index)){
		return true;
	}
	else {
		return false;
	}

}