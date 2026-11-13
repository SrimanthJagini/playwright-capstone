import { test, expect } from '../fixtures/test.fixture';
import { TestDataReader } from '../utils/TestDataReader';
import type { ContactMessage } from '../pages/ContactUsPage';

const contactData = TestDataReader.readJson<{ message: ContactMessage }>('contact.json');

test('contact us form submits successfully', async ({ contactUsPage }) => {
  await contactUsPage.open();
  await contactUsPage.submit(contactData.message);

  await expect(contactUsPage.successMessage()).toContainText(
    'Success! Your details have been submitted successfully.',
  );
});
