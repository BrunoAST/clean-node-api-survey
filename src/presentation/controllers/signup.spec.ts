import { SignUpController } from "./signup";

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const response = sut.handle(httpRequest);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('Missing param: name'));
  });
});
