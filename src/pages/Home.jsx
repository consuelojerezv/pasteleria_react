export default function Home() {
  return (
    <main className="page">{/* ancho y espaciado uniforme */}
      <div className="text-center mb-4">
        <h1>🎂 Pastelería Mil Sabores</h1>
        <p className="text-muted">Dulces que alegran el alma</p>
        <a className="btn btn-dark mt-2" href="/blog">Ver novedades</a>
      </div>
    </main>
  );
}
