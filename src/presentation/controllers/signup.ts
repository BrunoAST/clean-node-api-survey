import { AddAccount } from '../../domain/usecases';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helper/http-helper';
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) { }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      const { name, password, passwordConfirmation, email } = httpRequest.body;

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      this.addAccount.add({ name, password, email });
    } catch (error) {
      return serverError();
    }
  }
}
