import React, { useState, useEffect } from "react";
import '../dashboard/dashboardCss.scss'

function Dashboard() {
  // Mock data for orders (Replace with API calls)
  const [orders, setOrders] = useState([
    { id: "#001", customer: "John Doe", status: "Completed", total: "$120", date: "Feb 27, 2025" },
    { id: "#002", customer: "Jane Smith", status: "Pending", total: "$80", date: "Feb 27, 2025" },
    { id: "#003", customer: "Alice Brown", status: "Pre-order", total: "$45", date: "Feb 27, 2025" },
    { id: "#004", customer: "Charlie Davis", status: "Pending", total: "$60", date: "Feb 27, 2025" },
  ]);

  return (
    <div className="container-fluid dashboard-main pt-3">
      <h1 className="mb-4 ps-2">Kitchen Dashboard</h1>
      
      <div className="dashboard-card-wrapper">
        <div className="dashboard-card mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h4 className="card-title">Today's Orders</h4>
              <h3>{orders.length}</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-card mb-3">
          <div className="card shadow-sm  h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h4 className="card-title">Pending Orders</h4>
              <h3>{orders.filter(order => order.status === "Pending").length}</h3>
            </div>
          </div>
        </div>

        <div className="dashboard-card mb-3">
          <div className="card shadow-sm  h-100">
            <div className="card-body d-flex flex-column justify-content-center ">
              <h4 className="card-title">Revenue</h4>
              <h3>
                ${orders.reduce((total, order) => total + parseFloat(order.total.replace("$", "")), 0)}
              </h3>
            </div>
          </div>
        </div>

        <div className="dashboard-card  mb-3">
          <div className="card shadow-sm  h-100">
            <div className="card-body d-flex flex-column justify-content-center">
              <h4 className="card-title">Pre-orders</h4>
              <h3>{orders.filter(order => order.status === "Pre-order").length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-dark text-white">
          <h5>Recent Orders</h5>
        </div>
        {/* <div className="card-body"> */}
          <div className="table-responsive">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className={
                    order.status === "Pending" ? "table-danger" :
                    order.status === "Completed" ? "table-success" :
                    order.status === "Pre-order" ? "table-primary" : ""
                  }>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>
                      <span className={`badge ${
                        order.status === "Completed" ? "bg-success" :
                        order.status === "Pending" ? "bg-danger" :
                        order.status === "Pre-order" ? "bg-info" : "bg-secondary"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.total}</td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Dashboard;
