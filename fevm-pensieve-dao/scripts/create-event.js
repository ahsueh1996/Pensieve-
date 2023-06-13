const fs = require("fs")
const { network, ethers } = require("hardhat")

async function main() {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
  // Get the last proposal for the network. You could also change it for your index
  const proposalId = proposals[network.config.chainId].at(-1);
  // 0 = Against, 1 = For, 2 = Abstain for this example
  const voteWay = 1
  const reason = "Lets get that cat stored"
  await vote(proposalId, voteWay, reason)
}

async function createEvent(to, ids) {
  console.log("Creating event...")
  const memory = await ethers.getContract("MemoryToken")
  const memoryTx = await memory.mintBatch(to, ids, [], [])
  const voteTxReceipt = await voteTx.wait(1)
  console.log(voteTxReceipt.events[0].args.reason)
  const proposalState = await governor.state(proposalId)
  console.log(`Current Proposal State: ${proposalState}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })