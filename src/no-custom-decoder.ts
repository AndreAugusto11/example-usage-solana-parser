import { Connection, clusterApiUrl } from "@solana/web3.js";
import { SolanaParser } from "@debridge-finance/solana-transaction-parser";

async function main() {

    const rpcConnection = new Connection(clusterApiUrl("mainnet-beta"))

    const txParser = new SolanaParser([]);

    const parsed = await txParser.parseTransactionByHash(rpcConnection, "Ahy9GEyiPzkrw54Js6rw43bD6m6V3zmDDK6nn6e8N2tskrbkiozhsMjcdBLvCgH5JAc8CFyUZiwWpyCNqQ4wmQb");

    console.log(parsed);
}

main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
}).then(() => {
    console.log("Done");
    process.exit(0);
});