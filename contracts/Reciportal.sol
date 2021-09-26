// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Reciportal {
  uint256 totalRecipes;
  uint256 private seed;

  event NewRecipe(address indexed from, uint256 timestamp, string title, string ingredients, string instructions);

  struct Recipe {
    address sender;
    string title;
    string ingredients;
    string instructions;
    uint256 timestamp;
  }

  Recipe[] recipes;

  mapping(address => uint256) private lastSubmitter;

  constructor() payable {
    console.log("Collect all the recipes! All your recipes belong to us!");
  }

  function recipost(string memory _title, string memory _ingredients, string memory _instructions) public {
    require(
      lastSubmitter[msg.sender] + 15 minutes < block.timestamp,
      "You can only submit a recipe every 15 minutes."
    );

    lastSubmitter[msg.sender] = block.timestamp;

    totalRecipes++;
    console.log("%s has send their recipe!", msg.sender);

    recipes.push(Recipe(msg.sender, _title, _ingredients, _instructions, block.timestamp));

    uint256 randomNumber = (block.difficulty + block.timestamp + seed) % 100;
    console.log("Random number: %d", randomNumber);

    seed = randomNumber;

    if (randomNumber < 5) {
      console.log("%s won!", msg.sender);

      uint256 prizeAmount = 0.0001 ether;
      require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than they contract has."
      );
      
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to withdraw money from contract!");
    }

    emit NewRecipe(msg.sender, block.timestamp, _title, _ingredients, _instructions);
  }

  function getAllRecipes() public view returns (Recipe[] memory) {
    return recipes;
  }

  function getTotalRecipes() public view returns (uint256) {
    console.log("We have %d total waves!", totalRecipes);
    return totalRecipes;
  }
}