import styles from './IconButton.module.css'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ className = "", icon, ...props }) => {
    return (
        <button type="button" className={`${styles.button} ${className ?? ""}`} {...props}>
            {icon}
        </button>
    )
}