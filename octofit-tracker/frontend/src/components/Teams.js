import { useEffect, useState } from 'react';

const teamsEndpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://127.0.0.1:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      console.log('Teams endpoint:', teamsEndpoint);
      try {
        const response = await fetch(teamsEndpoint);
        const data = await response.json();
        console.log('Teams fetched data:', data);

        const normalizedTeams = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [];

        setTeams(normalizedTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter((team) => {
    const name = team.name || '';
    const description = team.description || '';
    const query = filterText.toLowerCase();
    return name.toLowerCase().includes(query) || description.toLowerCase().includes(query);
  });

  return (
    <section className="data-table-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h2 className="h3 fw-bold text-primary mb-0">Teams</h2>
          <a className="btn btn-link" href={teamsEndpoint} target="_blank" rel="noreferrer">
            API Endpoint
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-9">
            <input
              className="form-control"
              type="text"
              placeholder="Filter by team name or description"
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
                <th scope="col">Team</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, index) => (
                <tr key={team.id || team._id || index}>
                  <td>{index + 1}</td>
                  <td>{team.name || '-'}</td>
                  <td>{team.description || '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-primary" onClick={() => setSelectedTeam(team)} type="button">
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTeams.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-secondary">No teams found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTeam && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">Team Details</h3>
                  <button className="btn-close" type="button" onClick={() => setSelectedTeam(null)}></button>
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedTeam, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedTeam(null)} type="button">
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

export default Teams;