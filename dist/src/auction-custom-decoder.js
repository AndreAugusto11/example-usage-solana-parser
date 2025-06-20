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
const mayan_parser_1 = require("./custom-parsers/mayan-parser");
const swift_auction_1 = require("./idl/swift_auction");
const AUCTION_PROGRAM_ID = swift_auction_1.SwiftAuctionIDL.address;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const rpcConnection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("mainnet-beta"));
        const customParser = [AUCTION_PROGRAM_ID, mayan_parser_1.decodeSwiftAuctionInstruction];
        const txParser = new solana_transaction_parser_1.SolanaParser([], [customParser]);
        const parsed = yield txParser.parseTransactionByHash(rpcConnection, "Ahy9GEyiPzkrw54Js6rw43bD6m6V3zmDDK6nn6e8N2tskrbkiozhsMjcdBLvCgH5JAc8CFyUZiwWpyCNqQ4wmQb");
        const auction_program_instructions = parsed === null || parsed === void 0 ? void 0 : parsed.filter((pix) => pix.programId.toBase58() === AUCTION_PROGRAM_ID);
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
    });
}
main().catch((err) => {
    console.error("Error:", err);
    process.exit(1);
}).then(() => {
    console.log("Done");
    process.exit(0);
});
