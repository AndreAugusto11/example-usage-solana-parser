import { Idl } from "@coral-xyz/anchor";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";
import { ParsedIdlInstruction, SolanaParser } from "@debridge-finance/solana-transaction-parser";
import { Jupiter, IDL as JupiterIdl } from "./idl/jupiter";

async function main() {

    const rpcConnection = new Connection(clusterApiUrl("mainnet-beta"))
    const txParser = new SolanaParser([{ idl: JupiterIdl as unknown as Idl, programId: "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo" }]);

    const parsed = await txParser.parseTransactionByHash(
        rpcConnection,
        "5zgvxQjV6BisU8SfahqasBZGfXy5HJ3YxYseMBG7VbR4iypDdtdymvE1jmEMG7G39bdVBaHhLYUHUejSTtuZEpEj",
        false,
    );

    if (!parsed) {
        console.error("Transaction not found or parsing failed");
        return;
    }

    // we can find instruction by name
    const tokenSwapIx = parsed?.find((pix) => pix.name === "set_token_ledger");

    console.log(`Parsed instruction: ${tokenSwapIx?.name}`);
    console.log(`Program ID: ${tokenSwapIx?.programId.toBase58()}`);
    console.log(`Accounts: ${tokenSwapIx?.accounts.map((a) => `${a.name} (${a.pubkey.toBase58()})`).join(", ")}`);
    console.log(`Data: ${JSON.stringify(tokenSwapIx?.args, null, 2)}`);

    // or just use index
    const setTokenLedgerIx = parsed[0] as ParsedIdlInstruction<Jupiter, "set_token_ledger">;

    console.log(`Parsed instruction: ${setTokenLedgerIx.name}`);
    console.log(`Program ID: ${setTokenLedgerIx.programId.toBase58()}`);
    console.log(`Accounts: ${setTokenLedgerIx.accounts.map((a) => `${a.name} (${a.pubkey.toBase58()})`).join(", ")}`);
    console.log(`Data: ${JSON.stringify(setTokenLedgerIx.args, null, 2)}`);
}

main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
}).then(() => {
    console.log("Done");
    process.exit(0);
});