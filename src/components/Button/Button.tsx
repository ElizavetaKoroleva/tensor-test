import * as React from 'react';
import SVG from 'react-inlinesvg';

export interface ButtonProps {
  icon?: string;
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
          {icon && <SVG className="button__icon" src={icon} width={15} height={15}/>}
          {label}
      </span>
    </button>
  );

  return button;
};

export default Button;
