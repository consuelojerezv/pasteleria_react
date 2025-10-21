export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-2">
          🍰 <strong>Pastelería Mil Sabores</strong> — Dulzura artesanal desde 2024
        </p>
        <div className="d-flex justify-content-center gap-3 mb-2">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="text-light text-decoration-none"
          >
            📷 Instagram
          </a>
          <a
            href="mailto:contacto@milsabores.cl"
            className="text-light text-decoration-none"
          >
            ✉️ Contacto
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="text-light text-decoration-none"
          >
            📘 Facebook
          </a>
        </div>
        <p className="small mb-0">
          © {new Date().getFullYear()} Mil Sabores — Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
