"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const solana_transaction_parser_1 = require("@debridge-finance/solana-transaction-parser");
const jupiter_1 = require("./idl/jupiter");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rpcConnection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("mainnet-beta"));
        const txParser = new solana_transaction_parser_1.SolanaParser([{ idl: jupiter_1.IDL, programId: "JUP2jxvXaqu7NQY1GmNF4m1vodw12LVXYxbFL2uJvfo" }]);
        const parsed = yield txParser.parseTransactionByHash(rpcConnection, "5zgvxQjV6BisU8SfahqasBZGfXy5HJ3YxYseMBG7VbR4iypDdtdymvE1jmEMG7G39bdVBaHhLYUHUejSTtuZEpEj", false);
        if (!parsed) {
            console.error("Transaction not found or parsing failed");
            return;
        }
        // we can find instruction by name
        const tokenSwapIx = parsed === null || parsed === void 0 ? void 0 : parsed.find((pix) => pix.name === "set_token_ledger");
        console.log(`Parsed instruction: ${tokenSwapIx === null || tokenSwapIx === void 0 ? void 0 : tokenSwapIx.name}`);
        console.log(`Program ID: ${tokenSwapIx === null || tokenSwapIx === void 0 ? void 0 : tokenSwapIx.programId.toBase58()}`);
        console.log(`Accounts: ${tokenSwapIx === null || tokenSwapIx === void 0 ? void 0 : tokenSwapIx.accounts.map((a) => `${a.name} (${a.pubkey.toBase58()})`).join(", ")}`);
        console.log(`Data: ${JSON.stringify(tokenSwapIx === null || tokenSwapIx === void 0 ? void 0 : tokenSwapIx.args, null, 2)}`);
        // or just use index
        const setTokenLedgerIx = parsed[0];
        console.log(`Parsed instruction: ${setTokenLedgerIx.name}`);
        console.log(`Program ID: ${setTokenLedgerIx.programId.toBase58()}`);
        console.log(`Accounts: ${setTokenLedgerIx.accounts.map((a) => `${a.name} (${a.pubkey.toBase58()})`).join(", ")}`);
        console.log(`Data: ${JSON.stringify(setTokenLedgerIx.args, null, 2)}`);
    });
}
main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
}).then(() => {
    console.log("Done");
    process.exit(0);
});
