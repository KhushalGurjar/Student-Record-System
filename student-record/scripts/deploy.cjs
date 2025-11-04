const hre = require("hardhat");

async function main() {
  const StudentRecord = await hre.ethers.getContractFactory("StudentRecord");
  const studentRecord = await StudentRecord.deploy();
  await studentRecord.waitForDeployment();
  console.log("StudentRecord deployed to:", await studentRecord.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
