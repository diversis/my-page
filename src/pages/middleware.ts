import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname.startsWith("/_next") ||
        req.nextUrl.pathname.includes("/api/") ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return;
    }

    if (req.nextUrl.locale === "default") {
        const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";

        return NextResponse.redirect(
            new URL(
                `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
                req.url,
            ),
        );
    }
}


// import { NextRequest, NextResponse } from 'next/server'
// import { isAuthenticated } from '@lib/auth'

// // Limit the middleware to paths starting with `/api/`
// export const config = {
//   matcher: '/api/:function*',
// }

// export function middleware(request: NextRequest) {
//   // Call our authentication function to check the request
//   if (!isAuthenticated(request)) {
//     // Respond with JSON indicating an error message
//     return new NextResponse(
//       JSON.stringify({ success: false, message: 'authentication failed' }),
//       { status: 401, headers: { 'content-type': 'application/json' } }
//     )
//   }
// }
