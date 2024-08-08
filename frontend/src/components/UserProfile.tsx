import React from 'react';
import styles from '../styles/UserProfile.module.css';

interface UserProfileProps {
  name: string;
  role: string;
  avatarSrc: string;
  iconSrc: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, role, avatarSrc, iconSrc }) => {
  return (
    <section className={styles.profileContainer}>
      <div className={styles.userInfo}>
        <img loading="lazy" src={avatarSrc} alt={`${name}'s avatar`} className={styles.avatar} />
        <div className={styles.textContainer}>
          <h2 className={styles.userName}>{name}</h2>
          <p className={styles.userRole}>{role}</p>
        </div>
      </div>
      <img loading="lazy" src={iconSrc} alt="" className={styles.icon} />
    </section>
  );
};

export default UserProfile;