const main = async () => {
  const recipeContractFactory = await hre.ethers.getContractFactory("Reciportal");
  const recipeContract = await recipeContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await recipeContract.deployed();

  console.log(`Reciportal address: ${recipeContract.address}`);
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