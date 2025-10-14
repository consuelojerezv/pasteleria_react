export default function Blog() {
  const posts = [
    { id:"TC001", titulo:"Torta de Chocolate", texto:"Tips para lograr un bizcocho húmedo perfecto.", img:"/imagenes/torta-cuadrada.jpg", link:"/producto/TC001" },
    // agrega más si quieres
  ];

  return (
    <main className="page">
      <h2 className="text-center mb-4">Nuestro Blog</h2>
      <div className="row g-4">
        {posts.map(p => (
          <div key={p.id} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img src={p.img} className="card-img-top blog-img" alt={p.titulo}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.titulo}</h5>
                <p className="card-text flex-grow-1">{p.texto}</p>
                <a className="btn btn-dark mt-2 align-self-start" href={p.link}>Ver producto</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
