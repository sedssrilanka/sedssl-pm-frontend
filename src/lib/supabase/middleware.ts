import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { hasEnvVars } from '../utils';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/members/register/send-email') {
    return NextResponse.next();
  }
  let supabaseResponse = NextResponse.next({ request });

  if (!hasEnvVars) return supabaseResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAuthRoute =
      pathname.startsWith('/members/login') || pathname.startsWith('/members/auth');

    if (!user && !isAuthRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/members/auth/login';
      return NextResponse.redirect(loginUrl);
    }

    if (user && !isAuthRoute) {
      const { data: membership, error } = await supabase
        .from('memberships')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error checking membership:', error.message);

        return supabaseResponse;
      }

      if (!membership && pathname !== '/members/register') {
        const registerUrl = request.nextUrl.clone();
        registerUrl.pathname = '/members/register';
        return NextResponse.redirect(registerUrl);
      }
    }
  } catch (err) {
    console.error('Middleware failure:', err);
    // Optionally show fallback or redirect
    return supabaseResponse; // Let it through if something fails unexpectedly
  }

  return supabaseResponse;
}
