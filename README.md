# Solana Transaction Parser Demo

Example usage of @debridge-finance/solana-transaction-parser with and without a custom instruction decoder for the Swift Auction program.

## What’s inside

- Parse a real mainnet transaction with the default parser.
- Attach a custom decoder for the Swift Auction program and print decoded instruction args.
- Demonstrate IDL-driven decoding and a manual binary parser for `OrderInfo` (Mayan Swift Auction Object).

## Project layout

- src/no-custom-decoder.ts: parse a transaction using only the default parser.
- src/auction-custom-decoder.ts: parse the same transaction with a custom decoder.
- src/custom-parsers/swift-auction-parser.ts: custom decoder for the `bid` instruction.
- src/decodeOrderInfo.ts: manual binary decoder for `OrderInfo`.
- src/idl/swift_auction.json / swift_auction.ts: program IDL + type definitions.

## Requirements

- Node.js 18+ (recommended)
- npm

## Install

1) Install dependencies:

	npm install

2) Install a TypeScript runner (one-time):

	npm install -D typescript ts-node

## Run the examples

### Default parser

npx ts-node src/no-custom-decoder.ts

### Custom Swift Auction decoder

npx ts-node src/auction-custom-decoder.ts

## Notes

- The examples use a mainnet transaction hash hard-coded in the scripts.
- The custom decoder only handles the `bid` instruction selector and can be extended.

## References

- https://github.com/debridge-finance/solana-tx-parser-public

