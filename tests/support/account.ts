import { randomBytes } from 'node:crypto';
import type { RegistrationDetails } from '../../pages/LoginPage';
import { TestDataReader } from '../../utils/TestDataReader';

interface UserData {
  registration: Omit<RegistrationDetails, 'email'>;
}

export function createTestAccount(): RegistrationDetails {
  const { registration } = TestDataReader.readJson<UserData>('users.json');
  const uniqueId = `${Date.now()}.${randomBytes(4).toString('hex')}`;

  return {
    ...registration,
    email: `playwright.capstone.${uniqueId}@example.com`,
  };
}
