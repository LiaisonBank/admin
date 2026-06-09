export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* <div className="footer-links">
          <a href="/docs">Docs</a>
          <a href="/privacy">Privacy</a>
          <a href="/security">Security</a>
          <a href="/support">Support</a>
        </div> */}

        <div className="footer-credits">
          <div className="footer-copyright">
            © {new Date().getFullYear()}{" "}
            <a href="/">Liaison Bank</a>
          </div>

          {/* <div className="credits">
            Designed by{" "}
            <a
              href="https://bootstrapmade.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Liaison Bank
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}