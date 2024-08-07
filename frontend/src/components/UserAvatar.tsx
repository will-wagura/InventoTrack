import React from 'react';
import styles from '../styles/InboxComponent.module.css';

interface UserAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt, className }) => (
  <img 
    loading="lazy" 
    src={src} 
    alt={alt}
    className={`${styles.userAvatar} ${className || ''}`}
  />
);

export default UserAvatar;