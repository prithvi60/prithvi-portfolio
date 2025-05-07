import "../globals.css";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <div>
      <main className={`relative`}>
        {children}
        <Footer />
      </main>
    </div>
  );
}
