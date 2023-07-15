function shortenAddress(address: string): string {
  // if (address.length < 10) {
  //   throw new Error("Invalid Ethereum address");
  // }

  const firstChars = address.slice(0, 6);
  const lastChars = address.slice(-4);
  return `${firstChars}...${lastChars}`;
}

export default shortenAddress;
