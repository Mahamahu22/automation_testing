import { Page } from '@playwright/test';
import path from 'path';

export class FormPage {
  constructor(private page: Page) {}

  async goto() {
    const filePath = path.join(__dirname, '../public/form.html');
    const fileUrl = `file://${filePath}`;
    await this.page.goto(fileUrl);
  }

  async fillForm(name: string, email: string, country: string) {
    await this.page.fill('#name', name);
    await this.page.fill('#email', email);
    await this.page.selectOption('#country', country);
  }

  async checkSubscribe() {
    await this.page.check('#subscribe');
  }

  async submit() {
    await this.page.click('button[type="submit"]');
  }

  async getSuccessMessage() {
    return this.page.textContent('#success');
  }
}
