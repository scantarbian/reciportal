const main = async () => {
  const recipeContractFactory = await hre.ethers.getContractFactory("Reciportal");
  const recipeContract = await recipeContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await recipeContract.deployed();

  console.log(`Contract deployed to: ${recipeContract.address}`);

  let balance = await hre.ethers.provider.getBalance(recipeContract.address);
  console.log(`Contract balance: ${hre.ethers.utils.formatEther(balance)}`);

  let recipeTxn = await recipeContract.recipost('Test', 'Test', 'Test');
  await recipeTxn.wait();

  recipeTxn = await recipeContract.recipost('Another Test', 'Another Test', 'Another Test');
  await recipeTxn.wait();

  balance = await hre.ethers.provider.getBalance(recipeContract.address);
  console.log(`Contract balance: ${hre.ethers.utils.formatEther(balance)}`);

  let allRecipes = await recipeContract.getAllRecipes();
  console.log(allRecipes);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();