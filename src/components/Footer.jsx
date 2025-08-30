export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-4 mt-5">
      <div className="container">
        <div className="soft-card p-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          {/* Left: Logo */}
          <div>
            <a className="navbar-brand fw-bold" href="/">
              Sir Jimmy
            </a>
          </div>

          <div className="small">© {year} Jimi Yaks. All rights reserved.</div>
          <div className="small d-flex gap-3">
            <a href="https://wa.me/2347010228016" target="_blank">
              <i className=" bi bi-whatsapp text-success px-3 mt-sm-4"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
