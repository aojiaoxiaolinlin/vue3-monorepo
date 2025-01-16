export type UserPhoneApiInfo = {
  params?: {
    data?: string;
  };
  data?: {
    phone?: string;
  };
};

export enum CouponUseStatus {
  NOT_USED = "NOT_USED",
  USED_UP = "USED_UP",
  EXPIRED = "EXPIRED",
}

export type CouponInfo = {
  aid: string;
  stockSurplus: number;
  resultOld: string;
  status: CouponUseStatus;
  createTime: string;
  resultCode: string;
  resultMsg: string;
};
