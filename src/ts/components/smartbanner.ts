import Cookies from 'js-cookie';
import type {
	ISmartbannerOptions,
	TSmartBannerOptionItem,
} from '../interfaces/smartbannerOptions.js';

export class SmartBanner {
	private node: HTMLElement | null = null;
	private readonly storageKey = 'smartbanner-ts';
	private readonly storageLifeTime = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
	private readonly userAgent = window.navigator?.userAgent || '';

	constructor(private config: ISmartbannerOptions) {
		this.config = {
			autoInit: true,
			installButton: 'Install',
			closeButton: 'Close',
			...config,
		};

		if (this.shouldInitialize() && this.config.autoInit) {
			this.run();
		}
	}

	private shouldInitialize(): boolean {
		return this.isEnabledPlatform() && !this.isBannerClosed();
	}

	private isEnabledPlatform(): boolean {
		const { enable } = this.config;
		if (!enable.android && !enable.ios) {
			return false;
		}

		const platforms: string[] = [
			...(enable.android ? ['Android'] : []),
			...(enable.ios ? ['iPhone', 'iPad', 'iPod'] : []),
		];

		return platforms.some((platform: string) => this.userAgent.includes(platform));
	}

	private isBannerClosed(): boolean {
		return Boolean(Cookies.get(this.storageKey));
	}

	public run(platform: 'android' | 'ios' | null = null): void {
		platform = platform || this.detectPlatform() || 'ios';
		this.node = this.createBannerNode(platform);
		document.body.prepend(this.node);
	}

	private detectPlatform(): 'android' | 'ios' | null {
		if (/Android/i.test(this.userAgent)) {
			return 'android';
		}
		if (/iPhone|iPad|iPod/i.test(this.userAgent)) {
			return 'ios';
		}
		return null;
	}

	private createBannerNode(platform: 'android' | 'ios'): HTMLElement {
		const wrapper = this.createElement('div', `smartbanner-ts is-${platform}`);

		const elements: HTMLElement[] = [
			this.createCloseButton(platform),
			this.createImageContainer(platform),
			this.createContentContainer(platform),
			this.createInstallButton(platform),
		];

		wrapper.append(...elements);

		return wrapper;
	}

	private createCloseButton(platform: 'android' | 'ios'): HTMLElement {
		const title = this.getLocalizedValue(this.config.closeButton, platform);

		const button = this.createElement('button', 'smartbanner-ts__close', {
			type: 'button',
			role: 'button',
			title,
			'aria-label': title,
		});

		button.addEventListener('click', this.closeBanner.bind(this));

		return button;
	}

	private createImageContainer(platform: 'android' | 'ios'): HTMLElement {
		const container = this.createElement('figure', 'smartbanner-ts__image-container');
		const img = this.createElement('img', 'smartbanner-ts__image', {
			alt: this.getLocalizedValue(this.config.title, platform),
			title: this.getLocalizedValue(this.config.title, platform),
			src: this.getLocalizedValue(this.config.icon, platform),
		});

		container.appendChild(img);

		return container;
	}

	private createContentContainer(platform: 'android' | 'ios'): HTMLElement {
		const container = this.createElement('div', 'smartbanner-ts__container');

		const elements: HTMLElement[] = [
			this.createTextElement('smartbanner-ts__title', this.config.title, platform),
			this.config.author &&
				this.createTextElement('smartbanner-ts__author', this.config.author, platform),
			this.config.subTitle &&
				this.createTextElement('smartbanner-ts__subtitle', this.config.subTitle, platform),
			this.createTextElement('smartbanner-ts__price', this.config.price, platform),
		].filter(Boolean) as HTMLElement[];

		container.append(...elements);

		return container;
	}

	private createInstallButton(platform: 'android' | 'ios'): HTMLElement {
		const text = this.getLocalizedValue(this.config.installButton, platform);
		const button = this.createElement('a', 'smartbanner-ts__install', {
			href: this.config.link[platform],
			target: '_blank',
			role: 'button',
			'aria-label': text,
		});
		button.innerText = text;
		button.addEventListener('click', () => setTimeout(this.closeBanner.bind(this)));

		return button;
	}

	private createTextElement(
		className: string,
		value: TSmartBannerOptionItem,
		platform: 'android' | 'ios',
	): HTMLElement {
		const text = this.getLocalizedValue(value, platform);
		const element = this.createElement('div', className);
		element.innerText = text;
		return element;
	}

	private createElement(
		tag: string,
		className: string,
		attributes: Record<string, string> = {},
	): HTMLElement {
		const element = document.createElement(tag);
		element.className = className;

		Object.assign(element, attributes);

		return element;
	}

	private getLocalizedValue(
		value: TSmartBannerOptionItem | undefined,
		platform: 'android' | 'ios',
	): string {
		if (!value) {
			return '';
		}

		return typeof value === 'string' ? value : value[platform] || '';
	}

	private closeBanner(): void {
		if (this.node) {
			document.body.removeChild(this.node);
			this.node = null;

			Cookies.set(this.storageKey, '1', {
				expires: new Date(Date.now() + this.storageLifeTime),
				path: '/',
			});
		}
	}
}
