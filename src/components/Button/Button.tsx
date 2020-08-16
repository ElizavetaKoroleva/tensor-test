import * as React from 'react';
import SVG from 'react-inlinesvg';
import { IButton } from '../../types';

const Button: React.FC<IButton> = ({
  icon,
  label,
  text,
  type,
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
          {icon && <SVG className="button__icon" src={icon} />}
          {text}
      </span>
    </button>
  );

  return button;
};

export default Button;
