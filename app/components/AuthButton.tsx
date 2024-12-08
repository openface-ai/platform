import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AuthButton() {
  const { user } = useUser();
  return (
    <div>
      {user ? (
        <Link
          href="/api/auth/logout"
          className="hover:text-white transition-c colors "
        >
          Logout
        </Link>
      ) : (
        <Link
          href="/api/auth/login"
          className="hover:text-white transition-colo ors"
        >
          Login
        </Link>
      )}
    </div>
  );
}
