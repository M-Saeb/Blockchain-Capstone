var ERC721Mintable = artifacts.require('CustomERC721Token');
var BigNumber = require('bignumber.js');


contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];


    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});
            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1, 
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",
                {from: account_one})
            await this.contract.mint(account_three, 2, 
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",
                {from: account_one})
            await this.contract.mint(account_four, 3, 
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",
                {from: account_one})
        })

        it('should return total supply', async function () { 
            let total = await this.contract.totalSupply.call()
            assert.equal(total, 3, "Error: totalSupply() should return 3")
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(account_two)
            assert.equal(balance.toNumber(), 1, "the balance should equal one")
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenId = 1
            let requestedURI = await this.contract.tokenURI.call(tokenId)
            let wantedURI  = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1"
            assert.equal(requestedURI, wantedURI, "Error: The URI's does not match")
        })

        it('should transfer token from one owner to another', async function () { 
            let from = account_two
            let to = account_three
            let tokenId = 1 //safeTransferFrom  ownerOf
            let tokenPreviousOwner = await this.contract.ownerOf.call(tokenId)
            await this.contract.safeTransferFrom(from, to, tokenId, {from: account_two})
            let tokenNewOwner = await this.contract.ownerOf.call(tokenId)
            assert.equal(tokenPreviousOwner, from, "Error: the previous owner was not the account given")
            assert.equal(tokenNewOwner, to, "Error: the new owner is not the account given")
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});            
        })
        
        it('should fail when minting when address is not contract owner', async function () { 
            let result = true
            try{
                result = await this.contract.mint(account_two, 1, 
                    "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",
                    {from: account_three})
            } catch(e) {
                result = false
            }

            assert.equal(result, false, "Error: accounts other from the owner can mint")

        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call()
            console.log(owner)
            assert.equal(owner, account_one, "Error: the account given is not the owner")
        })

    });
})