export const getShortAddress = (address) => (
  `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
)

export const getName = (payload) => {
  const { ensName, address } = payload;

  if (!address) {
    return null;
  }

  if (ensName) {
    return ensName;
  }
 
  return getShortAddress(address)
}
