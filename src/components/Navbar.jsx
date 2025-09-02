export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg  sticky-top soft-shadow">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          Sir Jimmy
        </a>
        <button
          className="navbar-toggler shadow-none "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon  "></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto  justify-content-end align-items-end mb-2 mb-lg-0 x">
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/services">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/projects">
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/teams">
                Teams
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/faqs">
                FAQs
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
          </ul>
          <div className="d-none d-lg-block ms-3">
            <a className="btn text-bg-primary soft-shadow" href="/contact">
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
