import { useEffect, useState } from 'react';

const leaderboardEndpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://127.0.0.1:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      console.log('Leaderboard endpoint:', leaderboardEndpoint);
      try {
        const response = await fetch(leaderboardEndpoint);
        const data = await response.json();
        console.log('Leaderboard fetched data:', data);

        const normalizedEntries = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [];

        setEntries(normalizedEntries);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const userName = entry.user || entry.username || '';
    const query = filterText.toLowerCase();
    return userName.toLowerCase().includes(query);
  });

  return (
    <section className="data-table-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h2 className="h3 fw-bold text-primary mb-0">Leaderboard</h2>
          <a className="btn btn-link" href={leaderboardEndpoint} target="_blank" rel="noreferrer">
            API Endpoint
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-9">
            <input
              className="form-control"
              type="text"
              placeholder="Filter by username"
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
                <th scope="col">User</th>
                <th scope="col">Score</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr key={entry.id || entry._id || index}>
                  <td>{index + 1}</td>
                  <td>{entry.user || entry.username || '-'}</td>
                  <td>{entry.score ?? entry.points ?? '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-primary" onClick={() => setSelectedEntry(entry)} type="button">
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEntries.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-secondary">No leaderboard entries found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEntry && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Leaderboard Entry Details</h3>
                  <button className="btn-close" type="button" onClick={() => setSelectedEntry(null)}></button>
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedEntry, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedEntry(null)} type="button">
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

export default Leaderboard;