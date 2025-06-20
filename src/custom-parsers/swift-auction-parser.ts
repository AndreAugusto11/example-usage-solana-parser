import { TransactionInstruction } from "@solana/web3.js";
import { SwiftAuctionIDL, SwiftAuctionIDLType } from "../idl/swift_auction";
import { ParsedIdlInstruction, ParsedInstruction } from "@debridge-finance/solana-transaction-parser";
import { decodeOrderInfo } from "../decodeOrderInfo";
import BN from "bn.js";

const FUNCTION_SELECTORS = SwiftAuctionIDL["instructions"].reduce((acc, i) => {
	acc[i.name] = i.discriminator[0];
	return acc;
}, {} as Record<string, number>);

function decodeSwiftAuctionInstruction(instruction: TransactionInstruction): ParsedInstruction<SwiftAuctionIDLType> {
	
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

export { decodeSwiftAuctionInstruction };

function decodeBidInstruction(instruction: TransactionInstruction, data: Buffer): ParsedIdlInstruction<SwiftAuctionIDLType, "bid"> {
	
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
			order: decodeOrderInfo(data),
			amountBid: new BN(data.readBigUInt64LE(data.length - 8)),
		}

	} as ParsedIdlInstruction<SwiftAuctionIDLType, "bid">;
}