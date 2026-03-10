import { useEffect, useState } from 'react';

const activitiesEndpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://127.0.0.1:8000/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      console.log('Activities endpoint:', activitiesEndpoint);
      try {
        const response = await fetch(activitiesEndpoint);
        const data = await response.json();
        console.log('Activities fetched data:', data);

        const normalizedActivities = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [];

        setActivities(normalizedActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const type = activity.activity_type || activity.name || '';
    const notes = activity.notes || '';
    const query = filterText.toLowerCase();
    return type.toLowerCase().includes(query) || notes.toLowerCase().includes(query);
  });

  return (
    <section className="data-table-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h2 className="h3 fw-bold text-primary mb-0">Activities</h2>
          <a className="btn btn-link" href={activitiesEndpoint} target="_blank" rel="noreferrer">
            API Endpoint
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-9">
            <input
              className="form-control"
              type="text"
              placeholder="Filter by activity type"
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
                <th scope="col">Type</th>
                <th scope="col">Duration/Distance</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity, index) => (
                <tr key={activity.id || activity._id || index}>
                  <td>{index + 1}</td>
                  <td>{activity.activity_type || activity.name || '-'}</td>
                  <td>{activity.duration || activity.distance || '-'}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedActivity(activity)}
                      type="button"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredActivities.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-secondary">No activities found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedActivity && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Activity Details</h3>
                  <button className="btn-close" type="button" onClick={() => setSelectedActivity(null)}></button>
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedActivity, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedActivity(null)} type="button">
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

export default Activities;