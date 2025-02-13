import React, { FC, InputHTMLAttributes } from 'react'
import classes from './Input.module.sass'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    maxLength?: number
    value: string
    setValue: (value: string) => void
}

const Input: FC<InputProps> = ({ className, maxLength, value, setValue, ...props }) => {
    return (
        <input
            className={`${classes.input} ${className || ''}`}
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            maxLength={maxLength}
            {...props}
        />
    )
}

export default Input