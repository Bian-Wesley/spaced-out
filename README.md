# spaced-out
## I entered a hackathon where we built a devnet implementation of SpacedOut, a website that allows customers to mint NFTs that give customer loyalty perks. 
## I built out the NFT minting and checking capabilities. 
## Guide to this repository:
### main.py and nftCreater.py: handles minting an NFT to a given user wallet. The secret key is a burner wallet with no funds on mainnet. Uses metaplex python API, python's Flask framework, and calls a Google Apps Script API
### script.js: frontend component to check if a user owns a particular NFT
