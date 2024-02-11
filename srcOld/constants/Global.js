const tailwindDefaultTheme = require("tailwindcss/defaultTheme");

export const MediaQueryBreakpointEnum = {
  "2xl": `(min-width: ${tailwindDefaultTheme.screens["2xl"]})`,
  lg: `(min-width: ${tailwindDefaultTheme.screens.lg})`,
  md: `(min-width: ${tailwindDefaultTheme.screens.md})`,
  sm: `(min-width: ${tailwindDefaultTheme.screens.sm})`,
  xl: `(min-width: ${tailwindDefaultTheme.screens.xl})`,
};

export const APP_SIDE_MENU_WIDTH = 270;

export const PaginationParamsDefault = {
  offset: 0,
  limit: 20,
};

export const UserTypeEnum = {
  CLIENT: "CLIENT",
  FREELANCER: "FREELANCER",
};

export const UserStatusEnum = {
  UNVERIFIED: "UNVERIFIED",
  PROFILE_UPDATE_REQUIRED: "PROFILE_UPDATE_REQUIRED",
  AWAITING_APPROVAL: "AWAITING_APPROVAL",
  ACTIVE: "ACTIVE",
  IN_ACTIVE: "IN_ACTIVE",
  DEACTIVATED: "DEACTIVATED",
  REJECTED: "REJECTED",
};

export const StatusColorMap = {
  [UserStatusEnum.UNVERIFIED]: "info",
  [UserStatusEnum.AWAITING_APPROVAL]: "info",
  [UserStatusEnum.PROFILE_UPDATE_REQUIRED]: "warning",
  [UserStatusEnum.ACTIVE]: "success",
  [UserStatusEnum.IN_ACTIVE]: "error",
  [UserStatusEnum.DEACTIVATED]: "error",
  [UserStatusEnum.REJECTED]: "error",
};

export const UserSocialAccountStatus = {
  UNVERIFIED: "UNVERIFIED",
  VERIFIED: "VERIFIED",
};

export const AmountRateEnum = {
  FIXED: "FIXED",
  HOURLY: "HOURLY",
};
