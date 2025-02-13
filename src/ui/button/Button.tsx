import React, { FC, ButtonHTMLAttributes, ReactNode } from 'react'
import classes from './Button.module.sass'

type variant = 'std' | 'accent'
type size = 'big' | 'small'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: variant
    size?: size
    className?: string
}

const Button: FC<ButtonProps> = ({className, variant, size, children, ...props}) => {
    return (
        <button
            className={`${classes.button} 
            ${variant === 'accent' ? classes.accent : ''} 
            ${size === 'small' ? classes.small : ''}
            ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
