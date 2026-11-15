
export type CourtPreview = {
  id: string;
  name: string;
  status?: string | null;
  capacity?: number | null;
};

type AppProps = {
  courts?: CourtPreview[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

export default function App({
  courts = [],
  loading = false,
  error = null,
  onRetry,
}: AppProps) {
  return (
    <main className="courts-portal">
      <header className="page-header">
        <div>
          <h1>Canchas</h1>
          <p className="muted">
            Consulte las canchas disponibles en Futbolix.
          </p>
        </div>
      </header>

      {loading && (
        <p role="status" aria-live="polite">
          Cargando canchas...
        </p>
      )}

      {!loading && error && (
        <section role="alert" className="card">
          <div className="card-body">
            <h2>No se pudieron cargar las canchas</h2>
            <p className="muted">{error}</p>
            {onRetry && (
              <button className="btn btn-ghost" onClick={onRetry}>
                Reintentar
              </button>
            )}
          </div>
        </section>
      )}

      {!loading && !error && courts.length === 0 && (
        <section className="card">
          <div className="card-body">
            <h2>No hay canchas para mostrar</h2>
            <p className="muted">
              No hay información de canchas disponible en este momento.
            </p>
          </div>
        </section>
      )}

      {!loading && !error && courts.length > 0 && (
        <section className="grid grid-cards" aria-label="Listado de canchas">
          {courts.map((court) => (
            <article className="card court-card" key={court.id}>
              <div className="card-body">
                <div className="row-between">
                  <h2>{court.name}</h2>
                  {court.status && (
                    <span className="badge badge-neutral">
                      {court.status}
                    </span>
                  )}
                </div>

                {court.capacity != null && (
                  <p className="muted">
                    Capacidad: {court.capacity} personas
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
