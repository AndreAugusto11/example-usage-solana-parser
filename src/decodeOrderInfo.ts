import { ParsedIdlType } from "@debridge-finance/solana-transaction-parser";
import BN from "bn.js";
import { SwiftAuctionIDLType } from "./idl/swift_auction";


export function decodeOrderInfo(data: Buffer): ParsedIdlType<SwiftAuctionIDLType, "OrderInfo"> {
	let offset = 7;

	const trader = data.slice(offset, offset + 32);
	offset += 32;

	const chainSource = data.readUInt16LE(offset);
	offset += 2;

	const tokenIn = data.slice(offset, offset + 32);
	offset += 32;

	const addrDest = data.slice(offset, offset + 32);
	offset += 32;

	const chainDest = data.readUInt16LE(offset);
	offset += 2;

	const tokenOut = data.slice(offset, offset + 32);
	offset += 32;

	const amountOutMin = data.readBigUInt64LE(offset);
	offset += 8;

	const gasDrop = data.readBigUInt64LE(offset);
	offset += 8;

	const feeCancel = data.readBigUInt64LE(offset);
	offset += 8;

	const feeRefund = data.readBigUInt64LE(offset);
	offset += 8;

	const deadline = data.readBigUInt64LE(offset);
	offset += 8;

	const addrRef = data.slice(offset, offset + 32);
	offset += 32;

	const feeRateRef = data.readUInt8(offset);
	offset += 1;

	const feeRateMayan = data.readUInt8(offset);
	offset += 1;

	const auctionMode = data.readUInt8(offset);
	offset += 1;

	const keyRnd = data.slice(offset, offset + 32);
	offset += 32;

	console.log(offset, data.length);
	
	return {
		trader: Array.from(trader),
		chainSource,
		tokenIn: Array.from(tokenIn),
		addrDest: Array.from(addrDest),
		chainDest,
		tokenOut: Array.from(tokenOut),
		amountOutMin: new BN(amountOutMin.toString()),
		gasDrop: new BN(gasDrop.toString()),
		feeCancel: new BN(feeCancel.toString()),
		feeRefund: new BN(feeRefund.toString()),
		deadline: new BN(deadline.toString()),
		addrRef: Array.from(addrRef),
		feeRateRef,
		feeRateMayan,
		auctionMode,
		keyRnd: Array.from(keyRnd),
	};
}
