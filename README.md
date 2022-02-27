# IPFS-NFT-MARKETPLACE 
How about using IPFS to host your NFTs  in a decentralized way? This simple Dapp allows you to mint new tokens after successfully uploading the file to IPFS and getting the file hash(CID) which will be considered as the token ID in our smart contract (ERC721.sol). 

To run the Dapp : 
- npm install
- npm start 

## ERC721

Contracts to be found in src/components/contracts
Implemented the ERC721 token standard interface with a small modification(using string instead of uint256 to store token ID)

## Network 
For now the ERC721 contract is deployed on the smart chain testnet 
- Hosted Dapp on Netlify : https://eager-panini-b21811.netlify.app/


![Capture d’écran 2021-07-14 à 1 25 31 a m](https://user-images.githubusercontent.com/37840702/125543301-cb2b5255-d1d7-4ffd-a9b5-855d04aa5b85.png)
![Capture d’écran 2021-07-14 à 1 24 24 a m](https://user-images.githubusercontent.com/37840702/125543362-6fe86c89-5e9a-4599-9c68-a2403332dc2c.png)
![Capture d’écran 2021-07-14 à 1 22 12 a m](https://user-images.githubusercontent.com/37840702/125543294-de90c096-1e44-42ad-8e46-0bf5cd5d596b.png)
