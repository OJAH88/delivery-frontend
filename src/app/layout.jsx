import './globals.css';

export const metadata = {
  title: 'FLIPOVA Marketplace',
  description: 'Local Delivery App Marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-black antialiased">
        {children}
      </body>
    </html>
  );
}
