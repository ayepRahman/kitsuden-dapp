export const truncateAddress = (addr: string) => {
  return !!addr
    ? `${addr?.substring(0, 6)}...${addr?.substring(
        addr?.length - 4,
        addr?.length
      )}`
    : null;
};
