import { smartbannerOptions } from '../interfaces/smartbannerOptions';
export declare class SmartBanner {
    private config;
    private node;
    private readonly storageKey;
    private readonly storageLifeTime;
    constructor(config: smartbannerOptions);
    private get userAgents();
    private get keepClosed();
    run(platform?: 'android' | 'ios' | null): void;
    private generateNode;
    private closeBanner;
}
