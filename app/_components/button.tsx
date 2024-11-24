import React from 'react'

interface ButtonProps {
  classes: string
  text: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ classes, text, onClick }) => {
  return (
    <button
      className={`w-fit px-6 py-2 bg-sky-400 text-xl font-semibold text-white block ${classes}`}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
