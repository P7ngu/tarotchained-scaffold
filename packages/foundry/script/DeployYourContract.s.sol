// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import "../contracts/YourContract.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "USDC") {
        _mint(msg.sender, 1_000_000); // Mint some USDC to sender
    }
}

/**
 * @notice Deploy script for YourContract contract
 * @dev Inherits ScaffoldETHDeploy which:
 *      - Includes forge-std/Script.sol for deployment
 *      - Includes ScaffoldEthDeployerRunner modifier
 *      - Provides `deployer` variable
 * Example:
 * yarn deploy --file DeployYourContract.s.sol  # local anvil chain
 * yarn deploy --file DeployYourContract.s.sol --network optimism # live network (requires keystore)
 */
contract DeployYourContract is ScaffoldETHDeploy {
    /**
     * @dev Deployer setup based on `ETH_KEYSTORE_ACCOUNT` in `.env`:
     *      - "scaffold-eth-default": Uses Anvil's account #9 (0xa0Ee7A142d267C1f36714E4a8F75612F20a79720), no password prompt
     *      - "scaffold-eth-custom": requires password used while creating keystore
     *
     * Note: Must use ScaffoldEthDeployerRunner modifier to:
     *      - Setup correct `deployer` account and fund it
     *      - Export contract addresses & ABIs to `nextjs` packages
     */
    YourContract public cardsContract;

    
    function run() external ScaffoldEthDeployerRunner {
        cardsContract = new YourContract("ciao");

        // 2) Batch-initialize all card URIs in one tx
        //uint8[] memory ids = new uint8[](23);
        string[] memory uris = new string[](23);

        // Update the card URIs from the majorArcana.json ──
        uris[0]  = "https://bafkreibbdwdhi6ught72bplw7brsl3cvz2zhg3lfeichuiklzlto5bd3ly";
        uris[1]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreif2hgdj55ifo4gwywijvvampk3gxdqqy7pdwl4lwowjpxwjvix2sa";
        uris[2]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreif2hgdj55ifo4gwywijvvampk3gxdqqy7pdwl4lwowjpxwjvix2sa";
        // …
        uris[22] = "https://test.com";
        // ──────────────────────────────────────

        cardsContract.initCardUris(uris);

        MockUSDC usdc = new MockUSDC();
        usdc.transfer(msg.sender, 1000000);

        usdc.approve(address(cardsContract), 3e12);
        cardsContract.setTokenReceiver(address(usdc));

        cardsContract.assignFirstCard(deployer);
    }
}
