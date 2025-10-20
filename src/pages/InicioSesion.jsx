export default function InicioSesion() {
  return (
    <main className="page">
      <h2 className="text-center mb-4">Inicio de Sesion</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico"/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña"/>
              </div>
              <button type="submit" className="btn btn-dark">Iniciar Sesion</button>
          </form>
        </div>
      </div>
    </main>
  );
    }