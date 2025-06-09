// RequireRole.js
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

const namespace = "https://myapp.local/";

export function RequireRole({ role, children }) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [hasRole, setHasRole] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const token = await getAccessTokenSilently();
        const decoded = jwtDecode(token);
        console.log(decoded);
        const roles = decoded[`${namespace}roles`] || [];
        console.log(roles);
        setHasRole(roles.includes(role));
      } catch (err) {
        console.error("Error checking roles:", err);
      }
    };

    if (isAuthenticated) {
      checkRole();
    }
  }, [getAccessTokenSilently, isAuthenticated, role]);

  return hasRole ? <>{children}</> : null;
}
