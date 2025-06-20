const { createHash } = require('crypto');

function generateDiscriminator(instructionName) {
  // Prefix the instruction name with "global:"
  const input = `${instructionName}`;
  
  // Create SHA-256 hash
  const hash = createHash('sha256')
    .update(input)
    .digest();
  
  // Take first 8 bytes and convert to decimal array
  const discriminator = Array.from(hash.slice(0, 8));
  
  // Format as JSON string
  return `"discriminator": [${discriminator.join(', ')}]`;
}

const instructionName = process.argv[2];

// Example usage
const discriminator = generateDiscriminator(instructionName);
console.log('Discriminator:', discriminator);


