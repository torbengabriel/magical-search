import React, { useState } from 'react';
import { SearchModal } from '../components/SearchModal';
import { SearchIconProps } from '../types/SearchProps';
import { SearchSvg } from './svg/SearchSvg';

export function SearchIcon<T>(props: SearchIconProps<T>) {
  const { size, color, data, renderItem, searchKeys, filter, onSelect } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        aria-label="Suche öffnen"
      >
      <SearchSvg size={size} color={color} />
      </button>

      {open && (
        <SearchModal<T>
          open={open}
          onClose={() => setOpen(false)}
          data={data}
          renderItem={renderItem}
          searchKeys={searchKeys}
          filter={filter}
          onSelect={(item) => {
            onSelect?.(item);
            setOpen(false);
          }}
          emptyMessage="Keine Übereinstimmungen gefunden."
          searchPlaceholder="Suche..."
        />
      )}
    </>
  );
}
