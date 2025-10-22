import styles from './page.module.scss';
import SearchForm from '@/components/SearchForm/SearchForm';

export default function SearchPage() {
  return (
    <>
      <h2 className={styles.title}>企画を検索します</h2>
      <SearchForm />
    </>
  );
}
