import React from "react";
import styles from "./input.module.css";

type MaskedInputProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  width?: string;
  valueSize?: string;
  error?: boolean;
  errorMessage?: string | string[];
};

const formatDate = (value: string) => {
  return value
    .replace(/\D/g, "") 
    .replace(/(\d{2})(\d)/, "$1/$2") 
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1"); 
};



export const DateInput: React.FC<MaskedInputProps> = ({
  id,
  label,
  value,
  placeholder = "dd/mm/aaaa",
  onChange,
  width,
  valueSize = "18px",
  error = false,
  errorMessage,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    onChange?.(formatted);
  };

  return (
    <div className={styles.inputContainer} style={{width:width}}>
      <div className={styles.inputLabel} >
        {label}
      </div>
      <input
        autoComplete="off"
        inputMode="numeric"
        autoCorrect="off"
        autoCapitalize="off"
        className={styles.inputText}
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        style={{
          width: width,
          fontSize: valueSize,
          ...(error && { borderColor: "var(--erro)" }),
        }}
      />
    </div>
  );
};