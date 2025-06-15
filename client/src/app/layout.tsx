import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from '@/app/providers';
import "./styles.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Provider>
                    <div className="min-h-screen bg-gradient-to-br from-[#110f2b] via-[#300c4c] to-[#270a3e] text-white">
                        <div id="somesome" className="rainbow-gradient-circle"></div>
                        <div className="rainbow-gradient-circle theme-pink"></div>

                        {children}
                    </div>
                </Provider>
            </body>
        </html>
    );
}
