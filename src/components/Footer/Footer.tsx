import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.sitemap}>
        <h3>Sitemap</h3>
        <ul className={styles.sitemap_list}></ul>
      </div>
    </footer>
  );
}
