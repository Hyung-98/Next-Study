import './globals.css';
import './reset.css';
import Header from './_components/Header';

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        {modal}
      </body>
    </html>
  );
}
