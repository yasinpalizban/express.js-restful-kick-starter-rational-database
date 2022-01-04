
export declare interface SmsInterface {

  sendSms(message: string, receive: string, sms: number):Promise<number>

  sendActivationCode(mobileNumber: string, footer: string): Promise<number>

  sendCustomSms(mobileNumber: string, message: string): Promise<number>

  isActivationCodeValid(mobileNumber: string, code: string):  Promise<boolean>
}
