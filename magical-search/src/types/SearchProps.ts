export type SearchModalProps<T> = {
    open: boolean;
    onClose: () => void;
    data: T[];
    renderItem: (item: T) => React.ReactNode;
    searchKeys?: (keyof T)[];
    filter?: (item: T, query: string) => boolean;
    onSelect?: (item: T) => void;
    searchPlaceholder?: string;
    emptyMessage?: string;
  };
  
  export type SearchIconProps<T> = Omit<SearchModalProps<T>, 'open' | 'onClose'> & {
    size?: number;
    color?: string;
  };