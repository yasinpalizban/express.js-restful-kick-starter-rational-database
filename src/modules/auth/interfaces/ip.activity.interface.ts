export interface IIpActivity {
  id?: number;
  success: boolean;
  login: string;
  ipAddress: string;
  userAgent: string;
  type: string;
  date: Date;
  userId: number;
}
