var globalKey;
var globalProvider;
var connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("testnet"), "confirmed");
var tokenProgramID = new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");


function phantom_connect() {

  // Check for Solana & Phantom
  var provider = () => {
    if ("solana" in window) {
      var provider = window.solana;
	globalProvider = provider;
      if (provider.isPhantom) {
        return provider;
      } else {
        return false;
      }
    }
    window.open("https://phantom.app", "_blank");
  };

  var phantom = provider();

  if (phantom !== false) {

    console.log("Phantom Wallet Found, Connecting..");

    try {

      // Connect to Solana
      var connect_wallet = phantom.connect();

      // After Connecting
      phantom.on("connect", () => {

        // Check Connection
        console.log("Phantom Connected: " + phantom.isConnected);

        // Get Wallet Address
        var wallet_address = phantom.publicKey.toString();
	document.getElementById("displayAddress").innerHTML = wallet_address;
	globalKey = phantom.publicKey;
        if(checkTokens(phantom.publicKey.toString(), "White Tiger Corporation")){
          console.log("found");
        }
	
     });
     } catch (err) {
        console.log("Connection Cancelled!");
    }
  }
}

async function checkTokens(address, checkForThisBiz){

  var pubKeyAddr = new solanaWeb3.PublicKey(address);
  var parsedTokens = await connection.getParsedTokenAccountsByOwner(pubKeyAddr, {programId: tokenProgramID});

  for(var x = 0; x < parsedTokens.value.length; x++){
    var mint = parsedTokens.value[x].account.data.parsed.info.mint;
    var call = new XMLHttpRequest();
    call.open("GET", "https://script.google.com/macros/s/AKfycbyj-PiyYiVn24C2MoCa9aEoEpwKQ3dtA3CPPzJZasZoXrIAK-BPz9Fi6w4lzPGfTO5t/exec?mode=read&nft=" + mint + "&biz=" + checkForThisBiz, false);
    call.send();
    console.log(call.responseText);
    if(call.responseText == "found"){
      //console.log("found");
      return true;
    }
  }
  //console.log("not found")
  return false;
}
