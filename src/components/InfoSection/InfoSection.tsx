import React from 'react';
import styles from './InfoSection.module.scss';

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
}
