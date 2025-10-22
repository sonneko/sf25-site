'use client';

import styles from './SearchForm.module.scss';
import type { MouseEventHandler} from 'react';
import { useState } from 'react';
import SearchResult from '../SearchResult/SearchResult';
import type { Booth } from '../../types/booth';

import search from '../../lib/search';

export default function SearchForm() {
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Booth[] | null>(null);

  const searchHandler: MouseEventHandler<HTMLDivElement> = event => {
    setSearchInputValue('');
    setSearchResult(null);
    setSearchResult(search(searchInputValue));
  };

  return (
    <>
      <div className={styles.search_box}>
        <div className={styles.search_icon} onClick={searchHandler}>
          <img src='/icon/search.svg' alt='search icon' />
        </div>
        <input
          className={styles.search_input}
          type='text'
          onChange={event => {
            setSearchInputValue(event.target.value);
          }}
        />
      </div>
      {searchResult === null ? null : (
        <>
          <div className={styles.search_result}>
            <SearchResult data={searchResult} />
          </div>
        </>
      )}
    </>
  );
}
