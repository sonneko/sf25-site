'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'BLOG', path: '/blog' },
    { name: 'BOOTH', path: '/booth' },
    { name: 'INFO', path: '/info' },
    { name: 'MAP', path: '/map' },
    { name: 'SEARCH', path: '/search' },
    { name: 'STAGE', path: '/stage' },
    { name: 'VIDEO', path: '/video' },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href='/'>SEIKO SF25</Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.name} className={styles.navListItem}>
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
          <div className={styles.hamburger} onClick={toggleHandler}>
            <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
            <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
            <span className={isMenuOpen ? styles.barOpen : styles.bar}></span>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <ul className={styles.mobileNavList}>
          {navItems.map(item => (
            <li
              key={item.name}
              className={styles.mobileNavListItem}
              onClick={toggleHandler}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
