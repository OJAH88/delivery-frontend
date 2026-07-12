import './globals.css';

export const metadata = {
  title: 'Branch | Cannabis Delivery',
  description: 'Orders, Inventory, and Financials',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
