require("hardhat-deploy")
require("hardhat-deploy-ethers")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments;

    const poapToken = await deploy("PoapToken", {
        from: wallet.address,
        args: [],
        log: true,
    })

    const poapTokenContract = await ethers.getContractAt("PoapToken", poapToken.address)
    const mintTx = await poapTokenContract.grantWriteAccess(account, poapToken.address, 0, "")
    await mintTx.wait()

    console.log(`Deploying POAP Token... ${poapToken.address}`)
    console.log(`Minted... ${mintTx}`)

}

