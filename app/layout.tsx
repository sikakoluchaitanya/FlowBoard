import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50"
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
