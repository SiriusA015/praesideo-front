export interface PermissionModel {
  username: string;
  companyId: number;
  tracePermission: string;
  impactPermission: string;
  enabled: boolean;
  role: string;
  services: string[];
}
