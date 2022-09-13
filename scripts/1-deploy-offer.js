const fs = require('fs');
const {network, ethers} = require("hardhat");

async function main() {

    let object = {}
    const Offer = await ethers.getContractFactory("Offer");

    const offer = await Offer.deploy(5, {value:"100000000000000000"});
    await offer.deployed();

    object.offer = offer.address;
    console.log("🚀 offer Deployed:", offer.address, 'at network ', network.name)

    fs.writeFileSync(`./deploys/${network.name}.json`, JSON.stringify(object, undefined, 2));
}
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});