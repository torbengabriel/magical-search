# 🔮 magical-search

**magical-search** is a flexible and lightweight React library for rendering search modals and input fields. Ideal for integrating search functionality into your apps quickly and beautifully.

---

## 📦 Installation

```bash
npm install magical-search
```

or with pnpm:

```bash
pnpm add magical-search
```

---

## 🚀 Usage

```tsx
import { SearchIcon } from 'magical-search';

type Person = {
  firstName: string;
  lastName: string;
  email: string;
};

const people: Person[] = [
  { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com' },
  { firstName: 'Bob', lastName: 'Jones', email: 'bob@example.com' }
];

<SearchIcon<Person>
  size={28}
  color="#1e90ff"
  data={people}
  searchKeys={['firstName', 'email']}
  filter={(p: Person, q: string) =>
          `${p.firstName} ${p.lastName} ${p.email}`.toLowerCase().includes(q.toLowerCase())
        }
  renderItem={(person) => (
    <div>
      {person.firstName} {person.lastName}
      <br />
      <small>{person.email}</small>
    </div>
  )}
  onSelect={(person) => console.log('Selected:', person)}
/>
```

---

## 🔧 Props

| Prop                | Type                                | Description                                                  |
|---------------------|-------------------------------------|--------------------------------------------------------------|
| `data`              | `T[]`                               | The array of items to search                                 |
| `searchKeys`        | `(keyof T)[]`                       | Which fields to search in (e.g., `['name', 'email']`)        |
| `renderItem`        | `(item: T) => React.ReactNode`      | Custom render function for each result item                  |
| `onSelect`          | `(item: T) => void`                 | Callback when an item is selected                            |
| `size`              | `number`                            | Size of the search icon (default: `24`)                      |
| `color`             | `string`                            | Color of the icon (e.g. `#000`, `#1e90ff`)                   |
| `searchPlaceholder` | `string`                            | Custom placeholder text in the search input                  |
| `emptyMessage`      | `string`                            | Custom message if no search results are found                |
| `filter`            | `(item: T, query: string) => bool`  | Custom filter logic (optional – overrides `searchKeys`)      |

> ⚠️ **Note:** If you provide both `filter` and `searchKeys`, the `filter` function will take precedence and `searchKeys` will be ignored.

---

## 🎥 Demo

![Demo](./magical-search.gif)

---

## ✨ Features

- 🔍 Full-text search in customizable object fields
- 🎨 Fully stylable with SCSS modules
- 💡 Autofocus when opening modal
- 🔌 Extendable: supports `filter`, `onSelect`, `placeholder`, and more
- 🧩 Designed for reuse across different data types

---

## 📜 License

MIT © [Torben Gabriel](https://github.com/torben)

