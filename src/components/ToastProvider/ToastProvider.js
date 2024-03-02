import React from 'react';

export const ToastContext = React.createContext({ toasts: [], addToast: () => { }, closeToast: () => { } });

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const closeToast = React.useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = React.useCallback((message, variant) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id: crypto.randomUUID(),
        variant,
        message,
      },
    ]);
  }, []);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setToasts([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <ToastContext.Provider value={{ toasts, addToast, closeToast }}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
