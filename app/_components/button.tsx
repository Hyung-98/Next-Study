import React from 'react'

interface ButtonProps {
  text: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="w-fit px-6 ml-auto mb-8 py-2 bg-sky-400 text-xl font-semibold text-white block"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
