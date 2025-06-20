"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSwiftAuctionInstruction = decodeSwiftAuctionInstruction;
const swift_auction_1 = require("../idl/swift_auction");
const decodeOrderInfo_1 = require("../decodeOrderInfo");
const bn_js_1 = __importDefault(require("bn.js"));
const FUNCTION_SELECTORS = swift_auction_1.SwiftAuctionIDL["instructions"].reduce((acc, i) => {
    acc[i.name] = i.discriminator[0];
    return acc;
}, {});
function decodeSwiftAuctionInstruction(instruction) {
    const instruction_selector = instruction.data[0]; // First byte is the instruction selector
    const remaining_data = instruction.data.slice(1); // Remaining data after the selector
    switch (instruction_selector) {
        case FUNCTION_SELECTORS["bid"]:
            return decodeBidInstruction(instruction, remaining_data);
        // Add more cases for other instructions as needed
        default:
            throw new Error(`Unknown instruction selector: ${instruction_selector}`);
    }
}
function decodeBidInstruction(instruction, data) {
    return {
        name: "bid",
        programId: instruction.programId,
        accounts: [
            { name: "config", pubkey: instruction.keys[0].pubkey },
            { name: "driver", pubkey: instruction.keys[1].pubkey },
            { name: "auctionState", pubkey: instruction.keys[2].pubkey },
            { name: "systemProgram", pubkey: instruction.keys[3].pubkey },
        ],
        args: {
            order: (0, decodeOrderInfo_1.decodeOrderInfo)(data),
            amountBid: new bn_js_1.default(data.readBigUInt64LE(data.length - 8)),
        }
    };
}
