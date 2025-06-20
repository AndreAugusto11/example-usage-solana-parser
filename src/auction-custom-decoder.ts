import { Connection, clusterApiUrl } from "@solana/web3.js";
import { InstructionParserInfo, SolanaParser } from "@debridge-finance/solana-transaction-parser";
import { decodeSwiftAuctionInstruction } from "./custom-parsers/swift-auction-parser";
import { SwiftAuctionIDL } from "./idl/swift_auction";

const AUCTION_PROGRAM_ID = SwiftAuctionIDL.address;

async function main() {

    const rpcConnection = new Connection(clusterApiUrl("mainnet-beta"))

    const customParser = [ AUCTION_PROGRAM_ID, decodeSwiftAuctionInstruction ] as InstructionParserInfo;

    const txParser = new SolanaParser([], [customParser]);

    const parsed = await txParser.parseTransactionByHash(rpcConnection, "Ahy9GEyiPzkrw54Js6rw43bD6m6V3zmDDK6nn6e8N2tskrbkiozhsMjcdBLvCgH5JAc8CFyUZiwWpyCNqQ4wmQb");

    const auction_program_instructions = parsed?.filter((pix) => pix.programId.toBase58() === AUCTION_PROGRAM_ID);

    if (!auction_program_instructions) {
        console.error("No auction program instructions found");
        return;
    }

    console.log("Name:", auction_program_instructions[0].name);
    console.log("Program Id:", auction_program_instructions[0].programId.toBase58());
    console.log("Accounts:", auction_program_instructions[0].accounts.map((a) => ({
        name: a.name,
        pubkey: a.pubkey.toBase58()
    })));
    console.log("Args:", auction_program_instructions[0].args);
}

main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
}).then(() => {
    console.log("Done");
    process.exit(0);
});