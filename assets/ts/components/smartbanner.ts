import Cookies from 'js-cookie';
import type { smartbannerOptions } from '../interfaces/smartbannerOptions';

export class SmartBanner
{
	private node: Node = null;
	private readonly storageKey = 'smartbanner-ts';
	private readonly storageLifeTime = 30*24*60*60*1000;

	constructor(private config: smartbannerOptions)
	{
		this.config = {
			...{
				autoInit: true,
				author: null,
				subTitle: null,
				installButton: 'Install',
				closeButton: 'Close',
			},
			...this.config,
		};

		if (
			(this.config.enable.android===false && this.config.enable.ios===false) ||
			(!window.navigator || !window.navigator.userAgent || !(new RegExp(this.userAgents.join('|'), 'i')).test(window.navigator.userAgent))
		) {
			return;
		}

		if (this.config.autoInit===true && this.keepClosed===false) {
			this.run();
		}
	}

	private get userAgents():string[]
	{
		const userAgents = [];
		if (this.config.enable.android===true) {
			userAgents.push('Android');
		}
		if (this.config.enable.ios===true) {
			userAgents.push(...['iPhone', 'iPad', 'iPod']);
		}

		return userAgents;
	}

	private get keepClosed():boolean
	{
		const closeDateString = Cookies.get(this.storageKey);

		return !!(closeDateString)
	}

	public run(platform: 'android'|'ios'|null = null):void
	{
		if (platform===null) {
			platform = (new RegExp('Android', 'i').test(window.navigator.userAgent) ? 'android' : 'ios');
		}

		this.node = this.generateNode(platform);
		document.body.insertBefore(this.node, document.body.firstChild);

		return;
	}

	private generateNode(platform: 'android'|'ios'):Node
	{
		const wrapper = document.createElement('div');
		wrapper.className = 'smartbanner-ts is-'+platform;

		const closeButton = document.createElement('button');
		closeButton.type = 'button';
		closeButton.className = 'smartbanner-ts__close';
		closeButton.title = (typeof this.config.closeButton==='string' ? this.config.closeButton : this.config.closeButton[platform]);
		closeButton.setAttribute('role', 'button');
		closeButton.setAttribute('aria-label', (typeof this.config.closeButton==='string' ? this.config.closeButton : this.config.closeButton[platform]));
		closeButton.addEventListener('click', () => {
			this.closeBanner();
		});
		wrapper.appendChild(closeButton);

		const imageContainer = document.createElement('figure');
		imageContainer.className = 'smartbanner-ts__image-container';
		wrapper.appendChild(imageContainer);

		const image = document.createElement('img');
		image.className = 'smartbanner-ts__image';
		image.alt = (typeof this.config.title==='string' ? this.config.title : this.config.title[platform]);
		image.title = (typeof this.config.title==='string' ? this.config.title : this.config.title[platform]);
		image.src = (typeof this.config.icon==='string' ? this.config.icon : this.config.icon[platform]);
		imageContainer.appendChild(image);

		const container = document.createElement('div');
		container.className = 'smartbanner-ts__container';
		wrapper.appendChild(container);

		const title = document.createElement('div');
		title.className = 'smartbanner-ts__title';
		title.innerText = (typeof this.config.title==='string' ? this.config.title : this.config.title[platform]);
		container.appendChild(title);

		if (!!this.config.author) {
			const author = document.createElement('div');
			author.className = 'smartbanner-ts__author';
			author.innerText = (typeof this.config.author==='string' ? this.config.author : this.config.author[platform]);
			container.appendChild(author);
		}

		if (!!this.config.subTitle) {
			const subTitle = document.createElement('div');
			subTitle.className = 'smartbanner-ts__subtitle';
			subTitle.innerText = (typeof this.config.subTitle==='string' ? this.config.subTitle : this.config.subTitle[platform]);
			container.appendChild(subTitle);
		}

		const price = document.createElement('div');
		price.className = 'smartbanner-ts__price';
		price.innerText = (typeof this.config.price==='string' ? this.config.price : this.config.price[platform]);
		container.appendChild(price);

		const installButton = document.createElement('a');
		installButton.href = this.config.link[platform];
		installButton.target = '_blank';
		installButton.className = 'smartbanner-ts__install';
		installButton.setAttribute('role', 'button');
		installButton.setAttribute('aria-label', (typeof this.config.installButton==='string' ? this.config.installButton : this.config.installButton[platform]));
		installButton.innerText = (typeof this.config.installButton==='string' ? this.config.installButton : this.config.installButton[platform]);
		installButton.addEventListener('click', () => {
			setTimeout(() => {
				this.closeBanner();
			});
		});
		wrapper.appendChild(installButton);

		return wrapper;
	}

	private closeBanner():void
	{
		if (this.node===null) {
			return;
		}

		document.body.removeChild(this.node);
		this.node = null;

		const expireTime = new Date(new Date().getTime()+this.storageLifeTime);

		Cookies.set(this.storageKey, '1', {expires: expireTime, path: '/'});

		return;
	}

}
