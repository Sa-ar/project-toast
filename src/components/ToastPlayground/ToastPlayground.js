import React from 'react';

import Button from '../Button';
import Toast from "../Toast";

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [selectedVariant, setSelectedVariant] = React.useState('notice');
  const [isToastVisible, setIsToastVisible] = React.useState(false);

  function handleOnMessageChange(event) {
    setMessage(event.target.value);
  }

  function handleOnSelectedVariantChange(event) {
    setSelectedVariant(event.target.value);
  }

  function handleOnClose() {
    setIsToastVisible(false);
  }

  function handleOnPopToast() {
    setIsToastVisible(true);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {isToastVisible && <Toast message={message} variant={selectedVariant} onClose={handleOnClose} />}

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} value={message} onChange={handleOnMessageChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <fieldset className={styles.radioGroup}>
            {VARIANT_OPTIONS.map((variant) => (
              <div
                key={variant}
                className={`${styles.inputWrapper} ${styles.radioWrapper}`}
              >
                <label htmlFor={`variant-${variant}`}>
                  <input
                    id={`variant-${variant}`}
                    type="radio"
                    name="variant"
                    value={variant}
                    checked={selectedVariant === variant}
                    onChange={handleOnSelectedVariantChange}
                  />
                  {variant}
                </label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button onClick={handleOnPopToast}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
