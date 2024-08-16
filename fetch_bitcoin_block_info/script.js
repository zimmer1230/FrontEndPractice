const baseUrl = 'https://data-api.ccdata.io/onchain/v1/block/1/raw';
let params = {"block_number":1};
const url = new URL(baseUrl);

const options = {
    method: 'GET',
    headers:  {"Content-type":"application/json; charset=UTF-8"},
};

function toLittleEndianHex(decimal) {
    // Create a new 4-byte little-endian DataView with an ArrayBuffer
    const littleEndian = new DataView(new ArrayBuffer(4));
    // Set the decimal value of the DataView to the version, timestamp, bits or nonce in little-endian byte order
    littleEndian.setUint32(0, decimal, true);
    // Convert the DataView into a Uint8Array
    const byteArray = new Uint8Array(littleEndian.buffer);
    // Convert each byte into a 2-character hexadecimal string, and push them into an array
    const hexArray = [];
    for (let i = byteArray.length - 1; i >= 0; i--) {
      hexArray.push(byteArray[i].toString(16).padStart(2, "0"));
    }
    // Reverse the order of the hexadecimal strings in the array and join them into a single string
    return hexArray.reverse().join("");
  }

function reverseHexString(hexString) {
// Convert the hexadecimal string into an array of 2-character substrings, representing each byte
// Reverse the order of the substrings and join them into a single string
return hexString.match(/.{1,2}/g).reverse().join("");
    }




function getData(){
    params.block_number = document.getElementById('block_number').value;
    url.search = new URLSearchParams(params).toString();
    fetch(url, options)
    .then((response) => response.json())
    .then((json) => {
        let metadata = json.Data.METADATA;
        /*document.getElementById('metadata').innerHTML = JSON.stringify(metadata);*/
        document.getElementById('version').innerHTML = 'versionHex: ' + metadata.versionHex;
        document.getElementById('previousblockhash').innerHTML = 'previous hash: ' + metadata.previousblockhash;
        document.getElementById('merkleroot').innerHTML = 'merkleroot: ' + metadata.merkleroot;
        document.getElementById('time').innerHTML = 'time: ' + metadata.time;
        document.getElementById('bits').innerHTML = 'bits: ' + metadata.bits;
        document.getElementById('nonce').innerHTML = 'nonce: ' + metadata.nonce;
        let hash =  reverseHexString(metadata.versionHex) 
                +   reverseHexString(metadata.previousblockhash)
                +   reverseHexString(metadata.merkleroot)
                +   toLittleEndianHex(metadata.time)
                +   reverseHexString(metadata.bits)
                +   toLittleEndianHex(metadata.nonce);
        document.getElementById('block_header_hash').innerHTML = 'block_header_hash: ' + hash;
        


        console.log(json);}
    )
    .catch((err) => console.log(err));
}




