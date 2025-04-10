import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './SearchModal.module.scss';
import './SearchModal.module.scss'; // zusätzlicher Side-Effect Import für Vite!
import { SearchModalProps } from '../types/SearchProps';
import { CloseSvg } from '../icons/svg/CloseSvg';
import { DEFAULT_SEARCH_PLACEHOLDER } from '../constants';
import { DEFAULT_EMPTY_MATCHES } from '../constants';

export function SearchModal<T>(props: SearchModalProps<T>): React.ReactElement | null {
  const { open, onClose, data, renderItem, searchKeys, filter, onSelect, searchPlaceholder, emptyMessage } = props;
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!open) return null;

  const effectiveFilter: (item: T, query: string) => boolean =
  filter ??
  (searchKeys
    ? (item, query) =>
        searchKeys
          .map((key) => String(item[key] ?? '').toLowerCase())
          .some((val) => val.includes(query.trim().toLowerCase()))
    : () => true); 

  const filteredItems = data.filter(item => effectiveFilter(item, query));

  const modalContent = (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchWrapper}>
        <input 
          ref={inputRef}
          className={styles.searchInput}
          type="text" 
          placeholder={searchPlaceholder ?? DEFAULT_SEARCH_PLACEHOLDER}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
        <button onClick={onClose} className={styles.closeButton}>
          <CloseSvg size={20} />
        </button>
        </div>

        <div className={styles.resultWrapper}>
        <ul className={styles.resultList}>
          {filteredItems.length === 0 && <li className={styles.empty}>{emptyMessage ?? DEFAULT_EMPTY_MATCHES}</li>}
          {filteredItems.map((item, idx) => (
            <li
              key={idx}
              className={styles.resultItem}
              onClick={() => {
                onSelect?.(item);
                onClose();
              }}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
