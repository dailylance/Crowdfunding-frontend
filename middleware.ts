import { withAuth } from "next-auth/middleware";

export default withAuth(
	function middleware() {
		// Add any additional middleware logic here
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				// If accessing dashboard routes, require authentication
				if (req.nextUrl.pathname.startsWith("/dashboard")) {
					return !!token;
				}
				return true;
			},
		},
	}
);

export const config = {
	matcher: ["/dashboard/:path*"],
};
