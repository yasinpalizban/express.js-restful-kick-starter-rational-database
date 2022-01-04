import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { Routes } from '../../../core/interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../../../core/middlewares/validation.middleware';
import { AuthSignupValidation } from '../validations/auth.signup.validation';
import { AuthSigninValidation } from '../validations/auth.signin.validation';
import { AuthForgotValidation } from '../validations/auth.forgot.validation';
import { AuthActivateTokenEmailValidation } from '../validations/auth.activate.token.email.validation';
import { AuthSendActivateEmailValidation } from '../validations/auth.send.activate.email.validation';
import { AuthSendActivatePhoneValidation } from '../validations/auth.send.activate.phone.validation';
import { AuthResetPasswordEmailValidation } from '../validations/auth.reset.password.email.validation';
import { AuthResetPasswordPhoneValidation } from '../validations/auth.reset.password.phone.validation';
import { AuthActivateTokenPhoneValidation } from '../validations/auth.activate.token.phone.validation';
import isSignInMiddleware from '../middlewares/is.sign.in.middleware';
import rateLimit from 'express-rate-limit';
import { default as i18n } from 'i18next';

export default class AuthRoute implements Routes {
  public pathNested = '/api/auth/';
  public router = Router();
  public controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // const createLimiter = rateLimit({
    //   windowMs: 60 * 60 * 1000, // 1 hour window
    //   max: 5, // start blocking after 5 requests
    //   message: i18n.t('middleWear.throttle'),
    // });
    this.router.post(`${this.pathNested}signin`, isSignInMiddleware, validationMiddleware(AuthSigninValidation, 'body'), this.controller.signIn);
    this.router.post(`${this.pathNested}signout`, authMiddleware, this.controller.signOut);

    this.router.post(`${this.pathNested}signup`, isSignInMiddleware, validationMiddleware(AuthSignupValidation, 'body'), this.controller.signUp);
    this.router.post(
      `${this.pathNested}activate-account-email`,
      isSignInMiddleware,
      validationMiddleware(AuthActivateTokenEmailValidation, 'body'),
      this.controller.activationViaEmail,
    );
    this.router.post(
      `${this.pathNested}send-activate-email`,
      isSignInMiddleware,
      validationMiddleware(AuthSendActivateEmailValidation, 'body'),
      this.controller.sendActivateCodeViaEmail,
    );
    this.router.post(
      `${this.pathNested}activate-account-sms`,
      isSignInMiddleware,
      validationMiddleware(AuthActivateTokenPhoneValidation, 'body'),
      this.controller.activationViaSms,
    );
    this.router.post(
      `${this.pathNested}send-activate-sms`,
      isSignInMiddleware,
      validationMiddleware(AuthSendActivatePhoneValidation, 'body'),
      this.controller.sendActivateCodeViaSms,
    );

    this.router.post(`${this.pathNested}forgot`, isSignInMiddleware, validationMiddleware(AuthForgotValidation, 'body'), this.controller.forgot);
    this.router.post(
      `${this.pathNested}reset-password-email`,
      isSignInMiddleware,
      validationMiddleware(AuthResetPasswordEmailValidation, 'body'),
      this.controller.resetPasswordViaEmail,
    );
    this.router.post(
      `${this.pathNested}reset-password-sms`,
      isSignInMiddleware,
      validationMiddleware(AuthResetPasswordPhoneValidation, 'body'),
      this.controller.resetPasswordViaSms,
    );
  }
}
