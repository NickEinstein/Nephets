import { UserStatusEnum, UserTypeEnum } from "constants/Global";

export function isUserSuperAdmin(user) {
  return user?.type === UserTypeEnum.SUPER_ADMIN;
}

export function isUserAdmin(user) {
  return isUserSuperAdmin(user) || user?.type === UserTypeEnum.ADMIN;
}

export function isUserFreelancer(user) {
  return user?.type === UserTypeEnum.FREELANCER;
}

export function isUserClient(user) {
  return user?.type === UserTypeEnum.CLIENT;
}

export function isUserClientOrFreelancer(user) {
  return isUserFreelancer(user) || isUserClient(user);
}

export function isUserAdminOrFreelancer(user) {
  return isUserFreelancer(user) || isUserAdmin(user);
}

export function isUserActive(user) {
  return user?.status === UserStatusEnum.ACTIVE;
}

export function isUserAwaitingApproval(user) {
  return user?.status === UserStatusEnum.AWAITING_APPROVAL;
}

export function isUserDeactivated(user) {
  return user?.status === UserStatusEnum.DEACTIVATED;
}

export function isUserInActive(user) {
  return user?.status === UserStatusEnum.IN_ACTIVE;
}

export function isUserProfileUpdateRequired(user) {
  return user?.status === UserStatusEnum.PROFILE_UPDATE_REQUIRED;
}

export function isUserRejected(user) {
  return user?.status === UserStatusEnum.REJECTED;
}

export function isUserUnverified(user) {
  return user?.status === UserStatusEnum.UNVERIFIED;
}
