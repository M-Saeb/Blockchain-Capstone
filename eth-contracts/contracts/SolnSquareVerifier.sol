pragma solidity >=0.4.21 <0.6.0;

import "./verifier.sol";
import "./ERC721Mintable.sol";

// docker run -v /Users/<your_user_name>/Documents/Blockchain-Capston/zokrates/code:/home/zokrates/code -ti zokrates/zokrates:0.4.6 /bin/bash

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token{

  Verifier verifier;

// TODO define a solutions struct that can hold an index & an address
  struct Sol{
    uint256 index;
    address holder;
  }

// TODO define an array of the above struct
  Sol[] solutions;

// TODO define a mapping to store unique solutions submitted
  mapping(uint256 => Sol) mapSolutions;

// TODO Create an event to emit when a solution is added
  event solutionAdded(uint256 index, address holder);

  event TokenMint(uint256 tokenId, address to);

// TODO Create a function to add the solutions to the array and emit the event
  function addSolutoin(uint256 index, address holder) public {
    Sol newSol = Sol(index, holder);
    mapSolutions.append(newSol);
    emit solutionAdded(index, holder);
  }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintNFT
    (
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2] memory a_o,
        uint[2][2] memory b,
        uint[2] memory b_o,
        uint[2] memory c,
        uint[2] memory c_o,
        uint[2] memory h,
        uint[2] memory k,
        uint[2] memory input
    )
        public
    {

        addSolution(to, a, a_o, b, b_o, c, c_o, h, k, input);

        super.mint(to, tokenId);

        emit TokenMint(tokenId, to);
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
























