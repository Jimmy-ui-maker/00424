export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 mt-5">
      <div className="container">
        <div className="soft-card p-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="small">© {year} Jimi Yaks. All rights reserved.</div>
          <div className="small d-flex gap-3">
            <a href="mailto:jimiyaks3@gmail.com" target="_blank">
              Email
            </a>
            <a href="https://wa.me/2347010228016" target="_blank">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
