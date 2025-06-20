import { Idl } from "@coral-xyz/anchor";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { ParsedIdlInstruction, SolanaParser } from "@debridge-finance/solana-transaction-parser";
import { SwiftIDLType, SwiftIDL } from "./idl/swift";

async function main() {

    const rpcConnection = new Connection(clusterApiUrl("mainnet-beta"))
    const txParser = new SolanaParser([{ idl: SwiftIDL as unknown as Idl, programId: "BLZRi6frs4X4DNLw56V4EXai1b6QVESN1BhHBTYM9VcY" }]);

    const parsed = await txParser.parseTransactionByHash(
        rpcConnection,
        "5T9KJFfuP4RenNkBLfPCqKiJzKdrGhkaCwV2uFdey1qx9kTT2Tj4NmdkDXm2kQQ1Fssnjw3WauRWjXNzrStvz6ip",
        false,
    );

    if (!parsed) {
        console.error("Transaction not found or parsing failed");
        return;
    }

    console.log(parsed);

    // we can find instruction by name
    const fulfill = parsed?.find((pix) => pix.name === "fulfill");

    console.log(`Parsed instruction: ${fulfill?.name}`);
    console.log(`Program ID: ${fulfill?.programId.toBase58()}`);
    console.log(`Accounts: ${fulfill?.accounts.map((a) => `${a.name} (${a.pubkey.toBase58()})`).join(", ")}`);
    console.log(`Data: ${JSON.stringify(fulfill?.args, null, 2)}`);
}

main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
}).then(() => {
    console.log("Done");
    process.exit(0);
});