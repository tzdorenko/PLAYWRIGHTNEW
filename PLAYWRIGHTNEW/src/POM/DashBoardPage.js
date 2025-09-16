import { LoginForm } from './LoginForm.js';
import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
    constructor(page) {
        super(page, '//h1[contains(., "Do more")]', '/');
        this.signInBtn = this._page.getByRole('button', { name: 'Sign In' });
    }

    async clickSignInBtn() {
        await this.signInBtn.click();
        return new LoginForm(this._page);
    }
}
