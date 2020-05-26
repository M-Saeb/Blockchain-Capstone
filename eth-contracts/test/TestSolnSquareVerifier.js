var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var Verifier = artifacts.require('Verifier')

contract("test SolnSquareVerifier", accounts => {
  const owner = accounts[0];
  const account_two = accounts[1];
  const account_three = accounts[2];
  const account_four = accounts[3];

  describe('test adding new solution', function(){
    beforeEach(async function (){
      this.verifier = await Verifier.new({from: owner})
      this.contract = await SolnSquareVerifier.new(this.verifier.address, {from: owner})
    })


    // Test if a new solution can be added for contract - SolnSquareVerifier
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it('add new solution', async function(){

      const correctProof = {
        "proof": {
            "a": ["0x197629b6157b4aff620077a44f3f89e8968a0b5af5d59fadd340a4c8087c35f2", "0x0870a5df0381b6d769aa1a61e7bd3ad65b5660af4f620ef886d4dfe444a57db3"],
            "b": [["0x255c4cd07c3b7cc2c6a73c46a7985361cb69efe95037cf92682255074e931ae2", "0x06e9312c0d53d64a2d5d988b08d89a6b17872e5f00c53c8320d956b8176f2952"], ["0x1925d41fa68aef7cfe4f0b30ef524bde1caa8dcb28736d8c4575c51e05ee3f50", "0x20a9d3df5dbd7d5a99aa18cbda28eb10f582be0d86098b59758a99c72d7b6361"]],
            "c": ["0x1b7b1c119d292e82f3a73938077f9ee41388963ce5f2c2e44493e084ff501de1", "0x1270572d55c12421c9414271f6a8080b94190cf88f2731b9421d3e526e90a7dc"]
        },
        "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000004", "0x0000000000000000000000000000000000000000000000000000000000000001"]
      }
      let to = account_three
      let tokenId = 2
      let result = await this.contract.mintNFT.call(to, tokenId,
        correctProof.proof.a, correctProof.proof.b, correctProof.proof.c,
        correctProof.inputs)

      assert.equal(result, true, "the solution was not added")
    })
  })
})


