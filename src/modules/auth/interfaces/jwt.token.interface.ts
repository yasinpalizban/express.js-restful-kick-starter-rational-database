export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expire: number;
  maxAge: number;
}
