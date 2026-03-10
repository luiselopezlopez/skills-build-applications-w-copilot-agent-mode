import { useEffect, useState } from 'react';

const usersEndpoint = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://127.0.0.1:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('Users endpoint:', usersEndpoint);
      try {
        const response = await fetch(usersEndpoint);
        const data = await response.json();
        console.log('Users fetched data:', data);

        const normalizedUsers = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
            ? data.results
            : [];

        setUsers(normalizedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const name = user.username || user.name || '';
    const email = user.email || '';
    const query = filterText.toLowerCase();
    return name.toLowerCase().includes(query) || email.toLowerCase().includes(query);
  });

  return (
    <section className="data-table-card card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h2 className="h3 fw-bold text-primary mb-0">Users</h2>
          <a className="btn btn-link" href={usersEndpoint} target="_blank" rel="noreferrer">
            API Endpoint
          </a>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-9">
            <input
              className="form-control"
              type="text"
              placeholder="Filter by name or email"
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
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id || user._id || index}>
                  <td>{index + 1}</td>
                  <td>{user.username || user.name || '-'}</td>
                  <td>{user.email || '-'}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-primary" onClick={() => setSelectedUser(user)} type="button">
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-secondary">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="modal-title h5 mb-0">User Details</h3>
                  <button className="btn-close" type="button" onClick={() => setSelectedUser(null)}></button>
                </div>
                <div className="modal-body">
                  <pre className="mb-0 small">{JSON.stringify(selectedUser, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedUser(null)} type="button">
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

export default Users;