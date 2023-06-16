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

    const account = "0x40FD6a96e641EA5D3A9C83D931369e29Cb51a32E"
    const poapTokenContract = await ethers.getContractAt("PoapToken", poapToken.address)
    const mintTx = await poapTokenContract.safeMint(account)
    await mintTx.wait()

    console.log(`Deploying POAP Token... ${poapToken.address}`)
    console.log(`Minted to ${account} at txn:`, mintTx)

}

