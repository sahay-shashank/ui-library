import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Primary color style */
    variant?: 'primary' | 'secondary';
}

/**
 * Simple reusable Button component
 */
export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
    const variantClass = `button-${variant}`;
    return <button className={`${variantClass} ${className}`} {...props} />;
};
