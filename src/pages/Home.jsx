export default function Home() {
  return (
    <main className="page">{/* ancho y espaciado uniforme */}
      <div className="text-center mb-4">
        <h1>🎂 Pastelería Mil Sabores</h1>
        
        <p className="text-muted">Pastelería "Mil Sabores" Sabores celebra su 50 aniversario como un referente en la repostería chilena. Famosa por su participación en un récord Guinness en 1995, cuando colaboró en la creación de la torta más grande del mundo, la pastelería busca renovar su sistema de ventas online para ofrecer una experiencia de compra moderna y accesible para sus clientes.</p>
        <a className="btn btn-dark mt-2" href="/blog">Ver Productos</a>
      </div>
    </main>
  );
}
