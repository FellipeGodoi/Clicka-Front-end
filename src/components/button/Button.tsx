import React from "react";
import styles from "./buttons.module.css"
type ButtonProps = {
    id?: string,
    children: React.ReactNode;
    onClick?: () => void;
    maxWidth?: string;
    fontSize?: string;
    fontWeight?: string
    height?: string
    status?: boolean,
    bgColor?: string,
    ftColor?: string,
    borderColor?: string
};

export const Button: React.FC<ButtonProps> = ({
    id,
    children,
    onClick,
    maxWidth,
    fontSize,
    fontWeight,
    height,
    status = false,
    bgColor,
    ftColor,
    borderColor,
}) => {
    return (
        <button
            className={styles.base}
            id={id}
            disabled={status}
            onClick={onClick}
            style={{
                height,
                maxWidth,
                fontSize,
                fontWeight,
                color: ftColor,
                background: bgColor,
                border: borderColor,
                opacity: status ? 0.5 : 1,
                cursor: status ? "not-allowed" : "pointer",
                pointerEvents: status ? "none" : "auto",
                transition: "0.2s ease"
            }}
        >            {children}
        </button>
    );
};
