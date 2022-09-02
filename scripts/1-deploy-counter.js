const fs = require('fs');
const {network, ethers} = require("hardhat");

async function main() {

    let object = {}
    const Counter = await ethers.getContractFactory("Counter");

    const counter = await Counter.deploy();
    await counter.deployed();

    object.counter = counter.address;
    console.log("🚀 Counter Deployed:", counter.address, 'at network ', network.name)

    fs.writeFileSync(`./deploys/${network.name}.json`, JSON.stringify(object, undefined, 2));
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});