import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const namespace = "https://myapp.local/";

export function RoleRedirect() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    const getRoute = async () => {
      try {
        const token = await getAccessTokenSilently();
        const decoded = jwtDecode(token);
        const roles = decoded[`${namespace}roles`] || [];

        if (roles.includes("admin") || roles.includes("Developers")) {
          navigate("/admin-home/");
        } else if (roles.includes("user")) {
          navigate("/user-home/");
        } else {
          navigate("unauthorized");
        }
      } catch (e) {
        console.error("Role check failed", e);
      }
    };
    getRoute();
  }, [getAccessTokenSilently, navigate, isAuthenticated]);
  return null;
}
