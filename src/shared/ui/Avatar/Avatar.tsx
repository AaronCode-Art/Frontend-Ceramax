import React from 'react';
import './Avatar.css';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 45%, 40%)`;
};

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  className = '',
}) => {
  const initials = getInitials(name);
  const bgColor = stringToColor(name);

  return (
    <div
      className={`avatar avatar--${size} ${className}`}
      title={name}
      style={!src ? { backgroundColor: bgColor } : undefined}
    >
      {src ? (
        <img className="avatar__img" src={src} alt={name} />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  );
};
