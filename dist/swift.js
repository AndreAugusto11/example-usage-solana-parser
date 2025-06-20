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
const swift_1 = require("./idl/swift");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rpcConnection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("mainnet-beta"));
        const txParser = new solana_transaction_parser_1.SolanaParser([{ idl: swift_1.SwiftIDL, programId: "BLZRi6frs4X4DNLw56V4EXai1b6QVESN1BhHBTYM9VcY" }]);
        const parsed = yield txParser.parseTransactionByHash(rpcConnection, "5T9KJFfuP4RenNkBLfPCqKiJzKdrGhkaCwV2uFdey1qx9kTT2Tj4NmdkDXm2kQQ1Fssnjw3WauRWjXNzrStvz6ip", false);
        if (!parsed) {
            console.error("Transaction not found or parsing failed");
            return;
        }
        console.log(parsed);
        // we can find instruction by name
        const fulfill = parsed === null || parsed === void 0 ? void 0 : parsed.find((pix) => pix.name === "fulfill");
        console.log(`Parsed instruction: ${fulfill === null || fulfill === void 0 ? void 0 : fulfill.name}`);
        console.log(`Program ID: ${fulfill === null || fulfill === void 0 ? void 0 : fulfill.programId.toBase58()}`);
        console.log(`Accounts: ${fulfill === null || fulfill === void 0 ? void 0 : fulfill.accounts.map((a) => `${a.name} (${a.pubkey.toBase58()})`).join(", ")}`);
        console.log(`Data: ${JSON.stringify(fulfill === null || fulfill === void 0 ? void 0 : fulfill.args, null, 2)}`);
    });
}
main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
}).then(() => {
    console.log("Done");
    process.exit(0);
});
