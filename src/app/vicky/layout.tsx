export default function VickyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-pink-200 text-black min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
