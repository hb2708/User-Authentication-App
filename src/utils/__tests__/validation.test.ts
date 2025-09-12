import { validateEmail, validatePassword } from '../validation';

describe('Validation Utilities', () => {
  describe('Email Validation', () => {
    it('should validate correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com',
        'a@b.co',
        'first.last@subdomain.example.com',
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        '',
        'invalid-email',
        '@example.com',
        'user@',
        'user@.com',
        'user..name@example.com',
        'user name@example.com',
        'user@example',
        '.user@example.com',
        'user.@example.com',
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });

    it('should handle special characters correctly', () => {
      // Valid special characters
      expect(validateEmail('user+tag@example.com')).toBe(true);
      expect(validateEmail('user.name@example.com')).toBe(true);
      expect(validateEmail('user_name@example.com')).toBe(true);

      // Invalid special characters
      expect(validateEmail('user@exa!mple.com')).toBe(false);
      expect(validateEmail('user#name@example.com')).toBe(false);
    });

    it('should handle edge cases', () => {
      // Edge cases that should be invalid
      expect(validateEmail(null as any)).toBe(false);
      expect(validateEmail(undefined as any)).toBe(false);
      expect(validateEmail(123 as any)).toBe(false);
      expect(validateEmail({} as any)).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('should validate password length requirements', () => {
      const validPasswords = [
        'password123',
        'abcdef',
        'mypassword',
        '123456789',
        'P@ssw0rd!',
      ];

      validPasswords.forEach(password => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(true);
        expect(result.message).toBeUndefined();
      });
    });

    it('should reject passwords that are too short', () => {
      const invalidPasswords = ['', 'a', 'ab', 'abc', 'abcd', 'abcde'];

      invalidPasswords.forEach(password => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe(
          'Password must be at least 6 characters long',
        );
      });
    });

    it('should handle special password characters', () => {
      const specialPasswordsValid = [
        'pass@word123',
        'my-password',
        'password_with_underscore',
        'password!@#$%',
        'pássword', // accented characters
      ];

      specialPasswordsValid.forEach(password => {
        const result = validatePassword(password);
        expect(result.isValid).toBe(true);
      });
    });
  });

  describe('Form Data Validation', () => {
    it('should validate complete signup data', () => {
      const validSignupData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      expect(validSignupData.name.trim().length > 0).toBe(true);
      expect(validateEmail(validSignupData.email)).toBe(true);
      expect(validatePassword(validSignupData.password).isValid).toBe(true);
      expect(validSignupData.password === validSignupData.confirmPassword).toBe(
        true,
      );
    });

    it('should validate complete login data', () => {
      const validLoginData = {
        email: 'john@example.com',
        password: 'password123',
      };

      expect(validateEmail(validLoginData.email)).toBe(true);
      expect(validatePassword(validLoginData.password).isValid).toBe(true);
    });

    it('should handle whitespace in names', () => {
      const names = ['John Doe', '  John Doe  ', 'John', '  ', ''];

      expect(names[0].trim().length > 0).toBe(true); // Valid
      expect(names[1].trim().length > 0).toBe(true); // Valid after trim
      expect(names[2].trim().length > 0).toBe(true); // Valid
      expect(names[3].trim().length > 0).toBe(false); // Invalid
      expect(names[4].trim().length > 0).toBe(false); // Invalid
    });

    it('should validate password confirmation matching', () => {
      const passwordPairs = [
        { password: 'password123', confirm: 'password123' }, // Match
        { password: 'password123', confirm: 'password124' }, // No match
        { password: 'mypassword', confirm: 'mypassword' }, // Match
        { password: 'test123', confirm: 'Test123' }, // Case sensitive
        { password: '', confirm: '' }, // Both empty
      ];

      expect(passwordPairs[0].password === passwordPairs[0].confirm).toBe(true);
      expect(passwordPairs[1].password === passwordPairs[1].confirm).toBe(
        false,
      );
      expect(passwordPairs[2].password === passwordPairs[2].confirm).toBe(true);
      expect(passwordPairs[3].password === passwordPairs[3].confirm).toBe(
        false,
      );
      expect(passwordPairs[4].password === passwordPairs[4].confirm).toBe(true);
    });
  });
});
