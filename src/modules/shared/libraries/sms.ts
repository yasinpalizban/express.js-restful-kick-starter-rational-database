import { SmsInterface } from '../interfaces/sms.interface';

import FormData from 'form-data';
import fetch from 'isomorphic-fetch';

export class Sms implements SmsInterface {
  constructor(private username: string, private password: string, private phoneNumber: number) {}

  async isActivationCodeValid(mobileNumber: string, code: string): Promise<boolean> {
    const form = new FormData();
    form.append('Username', this.username);
    form.append('Password', this.password);
    form.append('Mobile', mobileNumber);
    form.append('Code', code);

    const url = 'http://smspanel.Trez.ir/CheckSendCode.ashx';
    const resultResponse = await fetch(url, {
      method: 'POST',
      body: form,
    });

    return await resultResponse.json();
  }

  async sendActivationCode(mobileNumber: string, footer: string): Promise<number> {
    const form = new FormData();
    form.append('Username', this.username);
    form.append('Password', this.password);
    form.append('Mobile', mobileNumber);
    form.append('Footer', footer);

    const url = 'http://smspanel.Trez.ir/AutoSendCode.ashx';
    const resultResponse = await fetch(url, {
      method: 'POST',
      body: form,
    });
    return await resultResponse.json();
  }

  async sendCustomSms(mobileNumber: string, message: string): Promise<number> {
    const form = new FormData();
    form.append('Username', this.username);
    form.append('Password', this.password);
    form.append('Mobile', mobileNumber);
    form.append('Message', message);
    const url = 'http://smspanel.Trez.ir/SendMessageWithCode.ashx';

    const resultResponse = await fetch(url, {
      method: 'POST',
      body: form,
    });

    return await resultResponse.json();
  }

  async sendSms(message: string, receive: string, sms: number): Promise<number> {
    const form = new FormData();
    form.append('Username', this.username);
    form.append('Password', this.password);
    form.append('PhoneNumber', this.phoneNumber);
    form.append('Message', message);
    form.append('RecNumber', receive);
    form.append('Smsclass', sms);

    const url = 'http://smspanel.Trez.ir/SendMessageWithPost.ashx';
    const resultResponse = await fetch(url, {
      method: 'POST',
      body: form,
    });

    return await resultResponse.json();
  }
}
