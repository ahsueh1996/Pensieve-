require("hardhat-deploy")
require("hardhat-deploy-ethers")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy, get } = deployments;

    const poapToken = await get("PoapToken")

    const memoryToken = await deploy("MemoryToken", {
        from: wallet.address,
        args: [],
        log: true,
    })

    const account = "0x40FD6a96e641EA5D3A9C83D931369e29Cb51a32E"
    console.log("Deploying Memory Token...")
    const memoryTokenContract = await ethers.getContractAt("MemoryToken", memoryToken.address)
    const grantWriteTx = await memoryTokenContract.grantWriteAccess(account, poapToken.address, 0, "")
    await grantWriteTx.wait()
    console.log("Write access granted")
}