import React, { useState } from "react";
import "../kitchen/kitchenCss.scss";

function KitchenScreen() {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Alice", status: "Pending", items: [{ name: "Pizza", quantity: 1 }]},
    { id: 2, customer: "Bob", status: "Pending", items: [{ name: "Burger", quantity: 2 }]},
    { id: 3, customer: "Charlie", status: "Pending", items: [{ name: "Pasta", quantity: 1 }]},
  ]);

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="content-wrapper pt-3">
      <section className="content-header ps-2">
        <h1>Kitchen Orders </h1>
      </section>
      <section className="container-fluid">
        <div className="box">
          <div className="box-header text-center">
            <h3 className="box-title">Real-time Orders</h3>
          </div>
          <div className="box-body table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Items</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className={
                      order.status === "Pending" ? "bg-warning" :
                      order.status === "Cooking" ? "bg-info" :
                      order.status === "Ready" ? "bg-success" : ""
                    }
                  >
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>
                      <span className={`label label-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <ul style={{listStyle:"none"}}>
                        {order.items.map((item, index) => (
                          <li key={index}>{item.name} x {item.quantity}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {order.status === "Pending" && (
                        <button className="btn start "
                          onClick={() => updateOrderStatus(order.id, "Cooking")}>
                          Start Cooking
                        </button>
                      )}
                      {order.status === "Cooking" && (
                        <button className="btn btn-success"
                          onClick={() => updateOrderStatus(order.id, "Ready")}>
                          Mark as Ready
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default KitchenScreen;
