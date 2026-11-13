import type { Locator, Page } from '@playwright/test';

export interface RegistrationDetails {
  name: string;
  email: string;
  password: string;
  title: 'Mr.' | 'Mrs.';
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class LoginPage {
  private readonly loginForm: Locator;
  private readonly signupForm: Locator;

  constructor(private readonly page: Page) {
    this.loginForm = page.locator('form[action="/login"]');
    this.signupForm = page.locator('form[action="/signup"]');
  }

  async open(): Promise<void> {
    await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginForm.locator('input[name="email"]').fill(email);
    await this.loginForm.locator('input[name="password"]').fill(password);
    await this.loginForm.getByRole('button', { name: 'Login' }).click();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.signupForm.locator('input[name="name"]').fill(name);
    await this.signupForm.locator('input[name="email"]').fill(email);
    await this.signupForm.getByRole('button', { name: 'Signup' }).click();
  }

  async completeSignup(details: RegistrationDetails): Promise<void> {
    const genderInput = details.title === 'Mr.' ? '#id_gender1' : '#id_gender2';
    await this.page.locator(genderInput).check({ force: true });
    await this.page.locator('#password').fill(details.password);
    await this.page.locator('#days').selectOption(details.birthDay);
    await this.page.locator('#months').selectOption(details.birthMonth);
    await this.page.locator('#years').selectOption(details.birthYear);
    await this.page.locator('#first_name').fill(details.firstName);
    await this.page.locator('#last_name').fill(details.lastName);
    await this.page.locator('#company').fill(details.company);
    await this.page.locator('#address1').fill(details.address);
    await this.page.locator('#country').selectOption({ label: details.country });
    await this.page.locator('#state').fill(details.state);
    await this.page.locator('#city').fill(details.city);
    await this.page.locator('#zipcode').fill(details.zipcode);
    await this.page.locator('#mobile_number').fill(details.mobileNumber);
    await this.page.getByRole('button', { name: /Create Account/i }).click();
    await this.page.getByText('Account Created!', { exact: true }).waitFor();
    await this.page.getByRole('link', { name: /Continue/i }).click();
  }

  async register(details: RegistrationDetails): Promise<void> {
    await this.open();
    await this.startSignup(details.name, details.email);
    await this.completeSignup(details);
  }

  async logout(): Promise<void> {
    await this.page.locator('a[href="/logout"]').click();
  }

  loginError(): Locator {
    return this.page.locator('form[action="/login"] p');
  }
}
