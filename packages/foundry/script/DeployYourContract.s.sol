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
        uris[0]  = "https://olive-impossible-carp-486.mypinata.cloud/ipfs/bafkreibbdwdhi6ught72bplw7brsl3cvz2zhg3lfeichuiklzlto5bd3ly";
uris[1]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreif2hgdj55ifo4gwywijvvampk3gxdqqy7pdwl4lwowjpxwjvix2sa";
uris[2]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreif7vh3mklc4jeq2idtyhjxfl4n5qm2b22xbndcl3xbmigryrwptky";
uris[3]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreidv2m56mwi3eczhs7jsi5yy3osshy55zp7rlm2hqs3kesaaqtwysy";
uris[4]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreiaiovqzjkclpbxfmgkxzt6utrdfazeqic4g2qszylgt5li6ie5epy";
uris[5]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreigg5627iobjn7bb26bm436d3isyonz3hb3t5zxksktwza3pmkddue";
uris[6]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreibq7ktsi5epikxrmkshmdtcwsqcqcspb74fgzmvul5r2sm5i2k5rq";
uris[7]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreihwstfg6vwbpmeat7v4hmhfzegwvic4ng3qj2glypvgheokqb5z6q";
uris[8]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreibaqkky2hs4oidgrc5djkpsjrbsf23ivllvkbpc6zeertda2tnqve";
uris[9]  = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreif7qxxdz7skv2hfno2be534jmapewefhyk3a2wzia3bpboucde76q";
uris[10] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreidlzlrjtliglrehn6mtoikvycjig6ikdhibe4m6enoshivmdlianq";
uris[11] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreibgkauxyvxiohtkdsou34pmc3o7r4k2auas2qdn7wc4fwyjgpih2u";
uris[12] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreiggoactilmhz74e7txsfrtckrajhxgqivpmii3vjuh65ar7m734xu";
uris[13] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreictmpl7jmnd33mikg457mmfh4giny26uwpbl4bs2qaz2l2ykyvplm";
uris[14] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreibpwfwxpwjvyax3w5hdtj4sdljrf6j2ihzun5yumypk7cnasyjdly";
uris[15] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreiab6ygcp6r6jbjdx5xdyeswva5as3nli3irn5hrcwrfii7i7wt34y";
uris[16] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreid6mgvasiot4iajl6ho3s6gxtthrxhmokxq6lwtxwlbvggxw4wmne";
uris[17] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreidsbaublaav6ym4qnvn6q4dvfhea7h7fhagfqxefauzwhdadh2dse";
uris[18] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreidggfhhnvcfxh5v3ahzk7arri7ylb73awgbfe3o6fblfl5zfoymwy";
uris[19] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreihztihj647yaecuew3tidlcutmposmdeyq7cossnhygxpk7kmoxsm";
uris[20] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreia6pjlo2zfppttymwmguueuuh2c67z73a4dn7qghmixbpo5cwew6i";
uris[21] = "https://moccasin-manual-narwhal-196.mypinata.cloud/ipfs/bafkreifpac2536ptebk7azydmurqmbbxkujkddrcftzrmeueqercnxemve";
        // ──────────────────────────────────────

        cardsContract.initCardUris(uris);

        MockUSDC usdc = new MockUSDC();
        usdc.transfer(msg.sender, 1000000);

        usdc.approve(address(cardsContract), 3e12);
        cardsContract.setTokenReceiver(address(usdc));

        cardsContract.assignFirstCard(deployer);
    }
}
