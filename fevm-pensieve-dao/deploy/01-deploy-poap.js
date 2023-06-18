require("hardhat-deploy")
require("hardhat-deploy-ethers")

const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy } = deployments;

    let tokenArgArray = [];

    let empArgs = {
        name: "Ethereum Merge Party",
        symbol: "EMP",
        url: "ipfs://bafkreichm725olq726oafj3zrybree3sqa4dqw62rw2u45lcpcvxcxx4ii"
    };
    tokenArgArray.push(empArgs);

    let bcArgs = {
        name: "Book Club",
        symbol: "BC",
        url: "ipfs://bafkreib5p4wok4apddbva7uph7jzylvmlutq6sxvad75ucbvg3wspcb5pi"
    };
    tokenArgArray.push(bcArgs);

    let cpArgs = {
        name: "Cat Party",
        symbol: "CP",
        url: "ipfs://bafybeic4paa3hfygf63i2h7vxxow55cp2agprvpcu2oksvlftypfhyj54e"
    };
    tokenArgArray.push(cpArgs);

    let swArgs = {
        name: "Saturn Watching",
        symbol: "SW",
        url: "ipfs://bafkreifomebfdv6d35grdmnngpg2xudsws3bnh7cj45glm4pdkwz6j6ane"
    };
    tokenArgArray.push(swArgs);

    let tppArgs = {
        name: "Tree Planting Party",
        symbol: "TPP",
        url: "ipfs://bafkreidc6pmwkbsgpinafeb5cj2xtom575ugkefnfgkc7ny6tjspgmwwsm"
    };
    tokenArgArray.push(tppArgs);

    const empPoapToken = await deploy("PoapToken", {
        from: wallet.address,
        args: [
            empArgs.name,
            empArgs.symbol,
            empArgs.url
        ],
        log: true,
    })

    const bcPoapToken = await deploy("PoapToken", {
        from: wallet.address,
        args: [
            bcArgs.name,
            bcArgs.symbol,
            bcArgs.url
        ],
        log: true,
    })

    const cpPoapToken = await deploy("PoapToken", {
        from: wallet.address,
        args: [
            cpArgs.name,
            cpArgs.symbol,
            cpArgs.url
        ],
        log: true,
    })

    const swPoapToken = await deploy("PoapToken", {
        from: wallet.address,
        args: [
            swArgs.name,
            swArgs.symbol,
            swArgs.url
        ],
        log: true,
    })

    const tppPoapToken = await deploy("PoapToken", {
        from: wallet.address,
        args: [
            tppArgs.name,
            tppArgs.symbol,
            tppArgs.url
        ],
        log: true,
    })

    const account = "0x40FD6a96e641EA5D3A9C83D931369e29Cb51a32E"

    const empPoapTokenContract = await ethers.getContractAt("PoapToken", empPoapToken.address)
    const empMintTx = await empPoapTokenContract.safeMint(account)
    await empMintTx.wait()

    const bcPoapTokenContract = await ethers.getContractAt("PoapToken", bcPoapToken.address)
    const bcMintTx = await bcPoapTokenContract.safeMint(account)
    await bcMintTx.wait()

    const cpPoapTokenContract = await ethers.getContractAt("PoapToken", cpPoapToken.address)
    const cpMintTx = await cpPoapTokenContract.safeMint(account)
    await cpMintTx.wait()

    const swPoapTokenContract = await ethers.getContractAt("PoapToken", swPoapToken.address)
    const swMintTx = await swPoapTokenContract.safeMint(account)
    await swMintTx.wait()

    const tppPoapTokenContract = await ethers.getContractAt("PoapToken", tppPoapToken.address)
    const tppMintTx = await tppPoapTokenContract.safeMint(account)
    await tppMintTx.wait()

    console.log(`Deploying emp POAP Token... ${empPoapToken.address}`)
    console.log(`Minted to ${account} at txn:`, empMintTx.hash)

    console.log(`Deploying bc POAP Token... ${bcPoapToken.address}`)
    console.log(`Minted to ${account} at txn:`, bcMintTx.hash)
    
    console.log(`Deploying cp POAP Token... ${cpPoapToken.address}`)
    console.log(`Minted to ${account} at txn:`, cpMintTx.hash)

    console.log(`Deploying sw POAP Token... ${swPoapToken.address}`)
    console.log(`Minted to ${account} at txn:`, swMintTx.hash)

    console.log(`Deploying tpp POAP Token... ${tppPoapToken.address}`)
    console.log(`Minted to ${account} at txn:`, tppMintTx.hash)
}

