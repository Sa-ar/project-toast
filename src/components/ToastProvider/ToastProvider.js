import React from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

const TOAST_TIMEOUT = 5000;
/**
 * @type {Array<{ id: string, variant: string, message: string, createdAt: Date }>}
 */
const INITIAL_TOASTS = [];

export const ToastContext = React.createContext({ toasts: INITIAL_TOASTS, addToast: (message, variant) => { }, closeToast: (id) => { } });

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState(INITIAL_TOASTS);

  const closeToast = React.useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = React.useCallback((message, variant) => {
    const id = crypto.randomUUID();
    const now = new Date();

    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id,
        variant,
        message,
        createdAt: now,
      },
    ]);
  }, []);

  React.useEffect(() => {
    const now = new Date();
    const timers = toasts.filter((toast) => {
      const timeElapsed = now.getTime() - toast.createdAt.getTime();

      if (timeElapsed >= TOAST_TIMEOUT) {
        closeToast(toast.id);
        return false;
      }

      return true;
    }).map((toast) => {
      const timeElapsed = now.getTime() - toast.createdAt.getTime();

      return setTimeout(() => {
        closeToast(toast.id);
      }, TOAST_TIMEOUT - timeElapsed);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [closeToast, toasts]);

  const handleDismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(handleDismissAll);

  return <ToastContext.Provider value={{ toasts, addToast, closeToast }}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
