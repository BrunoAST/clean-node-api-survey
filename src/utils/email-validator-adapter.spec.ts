import { EmailValidatorAdapter } from './email-validator';
import validator from 'validator';

jest.mock('validator', () => ({
	isEmail: () => true,
}));

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter();

describe('EmailValidator Adapter', () => {
	test('Should return false if validator returns false', () => {
		const sut = makeSut();

		jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

		const isValid = sut.isValid('invalid_email');

		expect(isValid).toBeFalsy();
	});

	test('Should return true if validator returns true', () => {
		const sut = makeSut();
		const isValid = sut.isValid('valid_email@email.com');
    
		expect(isValid).toBeTruthy();
	});

	test('Should call validator with correct email', () => {
		const sut = makeSut();

		const isEmailSpy = jest.spyOn(validator, 'isEmail');

		sut.isValid('any_email@email.com');
    
		expect(isEmailSpy).toHaveBeenCalledWith('any_email@email.com');
	});
});
