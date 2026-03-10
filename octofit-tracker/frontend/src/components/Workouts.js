import { useEffect, useState } from 'react';

const workoutsEndpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://127.0.0.1:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      console.log('Workouts endpoint:', workoutsEndpoint);
      try {
        const response = await fetch(workoutsEndpoint);
        const data = await response.json();
        console.log('Workouts fetched data:', data);

        const normalizedWorkouts = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [];

        setWorkouts(normalizedWorkouts);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) => {
    const name = workout.title || workout.name || '';
    const info = workout.description || workout.type || '';
    const query = filterText.toLowerCase();
    return name.toLowerCase().includes(query) || info.toLowerCase().includes(query);
  });

  return (
    <section className="data-table-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h2 className="h3 fw-bold text-primary mb-0">Workouts</h2>
          <a className="btn btn-link" href={workoutsEndpoint} target="_blank" rel="noreferrer">
            API Endpoint
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-9">
            <input
              className="form-control"
              type="text"
              placeholder="Filter by workout name or type"
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-3 d-grid">
            <button className="btn btn-outline-primary" onClick={() => setFilterText('')} type="button">
              Clear Filter
            </button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Workout</th>
                <th scope="col">Description/Type</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout, index) => (
                <tr key={workout.id || workout._id || index}>
                  <td>{index + 1}</td>
                  <td>{workout.title || workout.name || '-'}</td>
                  <td>{workout.description || workout.type || '-'}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedWorkout(workout)}
                      type="button"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredWorkouts.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-secondary">No workouts found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedWorkout && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Workout Details</h3>
                  <button className="btn-close" type="button" onClick={() => setSelectedWorkout(null)}></button>
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedWorkout, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedWorkout(null)} type="button">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </section>
  );
}

export default Workouts;