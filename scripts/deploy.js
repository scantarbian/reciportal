const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const balance = await deployer.getBalance();

  console.log(`Deploying contracts with account: ${deployer.address}`);
  console.log(`Account balance: ${balance}`);

  const Token = await hre.ethers.getContractFactory("WavePortal");
  const portal = await Token.deploy();

  console.log(`WavePortal address: ${portal.address}`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();