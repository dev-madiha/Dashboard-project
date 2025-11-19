

import { useAuth } from "../context/AuthContext";
export default function usePermission(permission: string) {
  const { user } = useAuth();
  return user?.permissions?.includes(permission) ?? false;
}
