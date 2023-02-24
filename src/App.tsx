import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className={"grid-container1"}>
          <header className={'grid-header'}>
              <h2>Header</h2>
          </header>

          <nav className={'grid-nav'}>
              <h2>Nav</h2>
          </nav>

          <section className={'grid-basket'}>
            <h2>Indkøbskurv</h2>

          </section>

          <section className={'grid-total'}>
            <h2>Odreoverblik</h2>

          </section>

          <footer className={"grid-footer"}>

          </footer>

      </div>
    </div>
  )
}

export default App
