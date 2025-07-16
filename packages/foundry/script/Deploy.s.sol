//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { DeployYourContract } from "./DeployYourContract.s.sol";
import { uris } from "./cardUris.json";

/**
 * @notice Main deployment script for all contracts
 * @dev Run this when you want to deploy multiple contracts at once
 *
 * Example: yarn deploy # runs this script(without`--file` flag)
 */


contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        // Deploys all your contracts sequentially
        // Add new deployments here when needed
        string memory initCode = "";
        for (uint256 i = 0; i < uris.length; i++) {
            initCode = string.concat(initCode, "cardUris[", Strings.toString(i), "] = ", uris[i], ";\n");
        }

        DeployYourContract deployYourContract = new DeployYourContract();
        deployYourContract.run();

        // Deploy another contract
        // DeployMyContract myContract = new DeployMyContract();
        // myContract.run();
    }
}
