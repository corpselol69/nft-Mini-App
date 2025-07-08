import { IGiftCard, IGiftItem } from './types';

export const mockGiftCards: IGiftCard[] = [
	{
		id: "gift1",
		name: "Bored Monkey",
		imgLink: "/assets/gifts/monkey.png",
		price: "150",
	},
	{
		id: "gift2",
		name: "Golden Wolf",
		imgLink: "/assets/gifts/wolf.png",
		price: "220",
	},
	{
		id: "gift3",
		name: "Magic Rabbit",
		imgLink: "/assets/gifts/rabbit.png",
		price: "95",
	},
	{
		id: "gift4",
		name: "Robot Cat",
		imgLink: "/assets/gifts/cat.png",
		price: "170",
	},
];
export const mockGiftItems: Record<string, IGiftItem> = {
	gift1: {
		id: "gift1",
		name: "Bored Monkey",
		imgLink: "/assets/gifts/monkey.png",
		price: "150",
		model: "2024A",
		symbol: "🙈",
		background: "#ffe480",
		lowestPrice: "120",
		sellPrice: "160",
	},
	gift2: {
		id: "gift2",
		name: "Golden Wolf",
		imgLink: "/assets/gifts/wolf.png",
		price: "220",
		model: "WolfX-32",
		symbol: "🐺",
		background: "#eae7de",
		lowestPrice: "200",
		sellPrice: "225",
	},
	gift3: {
		id: "gift3",
		name: "Magic Rabbit",
		imgLink: "/assets/gifts/rabbit.png",
		price: "95",
		model: "Rabbit-2",
		symbol: "🐰",
		background: "#cdf5eb",
		lowestPrice: "82",
		sellPrice: "99",
	},
	gift4: {
		id: "gift4",
		name: "Robot Cat",
		imgLink: "/assets/gifts/cat.png",
		price: "170",
		model: "CatZ-9000",
		symbol: "🤖",
		background: "#e1e9f7",
		lowestPrice: "168",
		sellPrice: "189",
	},
};

export const mockGiftItemsArr: IGiftItem[] = Object.values(mockGiftItems);