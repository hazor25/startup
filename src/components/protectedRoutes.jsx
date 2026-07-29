import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const user = await response.json();

          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              username: user.username,
            })
          );

          setIsAuthorized(true);
        } else {
          localStorage.removeItem("currentUser");
          setIsAuthorized(false);
        }
      } catch (error) {
        localStorage.removeItem("currentUser");
        setIsAuthorized(false);
      }
    }

    checkAuth();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
}