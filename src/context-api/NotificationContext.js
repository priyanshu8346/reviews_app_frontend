import { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Add new notification
  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {/* Notification Banner Container */}
      <div className="fixed top-16 right-4 z-50 flex flex-col gap-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-2 rounded-lg shadow-md text-white animate-slideDown
              ${n.type === "success" ? "bg-green-600" : ""}
              ${n.type === "error" ? "bg-red-600" : ""}
              ${n.type === "info" ? "bg-indigo-600" : ""}
              ${n.type === "warning" ? "bg-yellow-500" : ""}`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
