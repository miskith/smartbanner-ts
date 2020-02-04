export interface smartbannerOptions
{
	title: string|{
		android: string;
		ios: string;
	};
	subTitle?: string|{
		android: string;
		ios: string;
	};
	price: string|{
		android: string;
		ios: string;
	};
	icon: string|{
		android: string;
		ios: string;
	};
	link: {
		android: string;
		ios: string;
	};
	enable: {
		android: boolean;
		ios: boolean;
	};
	autoInit?: boolean;
	author?: string|{
		android: string;
		ios: string;
	};
	installButton?: string|{
		android: string;
		ios: string;
	};
	closeButton?: string|{
		android: string;
		ios: string;
	};
}
