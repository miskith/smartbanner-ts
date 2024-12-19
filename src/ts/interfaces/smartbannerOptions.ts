export type TSmartBannerOptionItem = string | { android: string; ios: string };

export interface ISmartbannerOptions {
	title: TSmartBannerOptionItem;
	subTitle?: TSmartBannerOptionItem;
	price: TSmartBannerOptionItem;
	icon: TSmartBannerOptionItem;
	link: {
		android: string;
		ios: string;
	};
	enable: {
		android: boolean;
		ios: boolean;
	};
	autoInit?: boolean;
	author?: TSmartBannerOptionItem;
	installButton?: TSmartBannerOptionItem;
	closeButton?: TSmartBannerOptionItem;
}
