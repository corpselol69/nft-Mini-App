export const getIsBalanceEnough = (clientBalance: string, nftPrice: string): boolean => {
	const balanceNum = Number(clientBalance)
	const priceNum = Number(nftPrice)

	if (isNaN(balanceNum) || isNaN(priceNum)) {
		return false
	}

	return balanceNum >= priceNum
}