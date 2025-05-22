import "../globals.css";

export default function SiteLayout({ children }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
