//CORE REACT IMPORTS
import type { JSX } from 'react';

//COMPONENTS
import Layout from './Layout.tsx';

//PAGES
import Home from '../pages/Home.tsx';
import Build from '../pages/Build.tsx';
import Result from '../pages/Result.tsx';

//THIRD PARTY IMPORTS
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//ASSETS AND STYLES
import '../styles/App.css';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/build' element={<Build />} />
          <Route path='/result' element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
