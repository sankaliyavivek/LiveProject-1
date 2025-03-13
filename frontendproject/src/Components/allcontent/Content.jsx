import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./contentCss.scss";

function Content() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("loggedInUser");
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <div>
      <div>
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <i className="bi bi-list"></i>
        </button>
      </div>


      <aside className={`sidebar text-white p-3 ${isSidebarOpen ? "open" : ""}`}>
        <h2 className="text-center">Kitchen Panel</h2>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to={"/home"}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/kitchen"}>Kitchen</Link>
            </li>

            {/* Conditional Rendering */}
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>Login</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link text-start text-white w-100" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Content;
