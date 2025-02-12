import React, { FC, ButtonHTMLAttributes, ReactNode } from 'react'
import classes from './Button.module.sass'

type variant = 'std' | 'accent'
type size = 'big' | 'small'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: variant
    size?: size
}

const Button: FC<ButtonProps> = ({variant, size, children, ...props}) => {
    return (
        <button
            className={`${classes.button} 
            ${variant === 'accent' ? classes.accent : ''} 
            ${size === 'small' ? classes.small : ''}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
