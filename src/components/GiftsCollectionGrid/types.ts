export interface IGiftCard {
	name: string
	imgLink?: string
	price: string
	id: string
}

export interface IGiftItem extends IGiftCard {
	model: string
	symbol: string
	background: string
	lowestPrice: string
	sellPrice: string

}
