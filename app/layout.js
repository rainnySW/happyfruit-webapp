import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "HappyFruit | สุขสันผลไม้",
  description: "Fresh fruits delivery and table ordering",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${notoSansThai.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍓</text></svg>" />
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 dark:bg-dark-bg dark:text-slate-200 selection:bg-brand-500 selection:text-white font-[family-name:var(--font-noto-sans-thai)]">
        {children}
      </body>
    </html>
  );
}
