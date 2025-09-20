import { BasePage } from './BasePage.js';

export class GaragePage extends BasePage {
    constructor(page) {
        super(page, '//h1[contains(., "Garage")]', '/panel/garage');
    }

    async isGaragePageVisible() {
        await this.isVisible();
        await this._page.waitForLoadState('networkidle');
    }
}
