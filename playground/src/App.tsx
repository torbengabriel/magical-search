import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchIcon } from 'magical-search';

function App() {
  const [count, setCount] = useState(0);

  type Person = {
    vorname: string;
    nachname: string;
    email: string;
  };
  
  const personen: Person[] = [
    { vorname: 'Max', nachname: 'Mustermann', email: 'max@example.com' },
    { vorname: 'Erika', nachname: 'Musterfrau', email: 'erika@example.com' },
    { vorname: 'James', nachname: 'Jamie', email: 'james@example.com' },
    { vorname: 'Tifanny', nachname: 'Tiffy', email: 'tiffy@example.com' },
  ];

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1> 
      <SearchIcon<Person> 
        size={28} 
        color={"#fff"}
        data={personen}
        renderItem={(p: Person) => (
          <div>
            {p.vorname} {p.nachname}
            <br />
            <small>{p.email}</small>
          </div>
        )}
        searchKeys={['vorname']}
        filter={(p: Person, q: string) =>
          `${p.vorname} ${p.nachname} ${p.email}`.toLowerCase().includes(q.toLowerCase())
        }
        onSelect={(p) => console.log('Ausgewählt:', p)}
      />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
