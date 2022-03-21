import { useState, useEffect } from 'react'
import './App.css'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {
  
  // state del app

  const[ busqueda, setBusqueda] = useState('')
  const [imagenes, setImagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)


  // effect del app

  useEffect(() => {
    const consultarAPI = async () => {
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '25601039-3a0c7b8046bb70d27a1c4e4bb'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas)

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    } 
    consultarAPI()
  }, [busqueda, paginaActual]);
  

  // definir la pagina anterior

  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaActual - 1;

    if (nuevaPaginaActual === 0) return;
    
    setPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaActual + 1;

    if (nuevaPaginaActual > totalPaginas) return;
    
    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
          <div className="lead text-center">
            <h1>Buscador de Imágenes </h1>
          </div> 
          <Formulario 
            setBusqueda={setBusqueda}
          />
        
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

        {(paginaActual === 1) ?  null : (
          <button
          type='button'
          className='btn btn-dark mr-1 mb-2'
          onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {(paginaActual === totalPaginas) ? null : (
          <button
          type='button'
          className='btn btn-dark mb-2'
          onClick={paginaSiguiente}
          >
          Siguiente &raquo;
          </button>
        )}
        
      </div>
    </div>
  )
}

export default App
