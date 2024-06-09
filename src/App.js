import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { Main } from './path/main'
import Illustrator  from './path/illustrator';
import Searcher from './path/search';

import Artist from "./json/artists.json"
import Illust from "./json/illusts.json"


function App() {
    let numb_ill = 0
    Illust.map(ill => numb_ill += ill.illust.length)

    return(
    <BrowserRouter>
        <div>
            <Link to="/"><div className="jjap-booru">JJap Booru</div></Link>
            <span className="counter">({"Artists : " + Artist.length + " / Illusts : " + numb_ill.toLocaleString()})</span>
            <span className='notation'>Press 'Ctrl + R' to hide R-18 contents</span>
        </div>

        <Routes>
            <Route path='/' element={<Main Artist={Artist} Illust={Illust} />} />
            <Route path='/artist/:name' element={<Illustrator Artist={Artist} Illust={Illust} />} />
            <Route path='/search/:keyword' element={<Searcher Artist={Artist} Illust={Illust} />} />
            <Route path='/*' element={<ErrorNotFound />} />
        </Routes>
    </BrowserRouter>
    );
}


function ErrorNotFound(){
  return(
    <div className='NotFound-container'>
      <h2>404 | Not Found</h2>
    </div>
  )
}

export default App;
