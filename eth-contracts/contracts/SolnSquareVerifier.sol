pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

// docker run -v /Users/<your_user_name>/Documents/Blockchain-Capston/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.4.6 /bin/bash

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token{

  Verifier verifier;

  constructor(address verifierContract) public {
    verifier = Verifier(verifierContract);
  }

// TODO define a solutions struct that can hold an index & an address
  struct Sol{
    uint index;
    address owner;
  }

// TODO define an array of the above struct
  Sol[] sols;

// TODO define a mapping to store unique solutions submitted
  mapping(bytes32 => bool) solutionsExist;

// TODO Create an event to emit when a solution is added
  event solutionAdded(uint256 index, address holder);

  event TokenMint(uint256 tokenId, address to);

// TODO Create a function to add the solutions to the array and emit the event
  function addSolution
  (
    address to,
    uint256 tokenId,
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory input
  )
    public
    returns(bool)
  {

    bytes32 key = keccak256(abi.encodePacked(a,b,c,input));

    if(!solutionsExist[key]){
      bool verification = verifier.verifyTx(a, b, c,input);

        if(verification){
          solutionsExist[key] = true;
          Sol memory newSol = Sol(tokenId, to);
          sols.push(newSol);
          emit solutionAdded(tokenId, to);
          return true;
        }
    }
    return false;
  }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintNFT
    (
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    )
        public
        returns (bool)
    {
      bool solState = addSolution(to, tokenId, a, b, c,input);
        // addSolution(to, a, a_o, b, b_o, c, c_o, h, k, input);

      if(solState){
        string memory tokenURI = _tokenURIs[tokenId];
        mint(to, tokenId, tokenURI);
        emit TokenMint(tokenId, to);
        return true;
      }

      return false;
    }

}


contract Verifier {
  function verifyTx(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public returns (bool r);
}