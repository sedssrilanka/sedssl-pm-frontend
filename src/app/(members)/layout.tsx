import type { Metadata } from 'next';
import { SiteHeader } from '@/components/members/site-header';
import { Meteors } from '@/components/ui/meteors';
export const metadata: Metadata = {
  title: 'SEDS SL',
  description: 'SEDS SL - Project Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="grid min-h-svh lg:grid-cols-3">
        <div className="bg-muted relative hidden lg:block lg:col-span-2">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <Meteors number={30} />
            <div className="flex justify-center gap-2 md:justify-start">
              <a href="#" className="inline-flex items-center gap-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26 13C26 20.1797 20.1797 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C20.1797 0 26 5.8203 26 13ZM3.80036 13C3.80036 18.0808 7.91918 22.1996 13 22.1996C18.0808 22.1996 22.1996 18.0808 22.1996 13C22.1996 7.91918 18.0808 3.80036 13 3.80036C7.91918 3.80036 3.80036 7.91918 3.80036 13Z"
                    fill="#F97316"
                  />
                </svg>

                <span className="font-bold text-base">SEDS SL.</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <SiteHeader />
          <div className="flex items-center justify-center h-full px-6 md:px-10">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
