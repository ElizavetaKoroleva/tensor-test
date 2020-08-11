import * as React from 'react';

export interface ButtonProps {
  icon: string;
  label: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: (e?: React.MouseEvent) => void;
}

const Button: React.SFC<ButtonProps> = ({
  icon,
  label,
  type = 'button',
  onClick,
}) => {
  const button = (
    <button
      className="button"
      aria-label={label}
      type={type}
      onClick={onClick}
    >
      <span className="button__text">
          {label}
      </span>
    </button>
  );

  return button;
};

export default Button;
