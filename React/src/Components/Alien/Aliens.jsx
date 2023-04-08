import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchAliens } from '../../Redux/Actions';
import s from './Aliens.module.css';

export const Aliens = () => {
  const dispatch = useDispatch();
  const aliens = useSelector((state) => state.aliens);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para el término de búsqueda
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchAliens());
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // Filtrar los aliens que coinciden con el término de búsqueda
    const filteredAliens = aliens.filter(
      (alien) => alien.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentItems(filteredAliens.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredAliens.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, aliens, searchTerm]); // Agregar searchTerm a las dependencias del useEffect

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda cuando cambia el valor del input
    setItemOffset(0); // Resetear el offset para volver a la primera página
  };

  return (
    <div className={s.elemento}>
      <div className="container">
        <div className={s.searchContainer}>
          <input
            type="text"
            placeholder="Buscar el alien"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Próximo >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Anterior"
          renderOnZeroPageCount={null}
          containerClassName={s.pagination}
          pageClassName={s.pageLink}
          previousLinkClassName={s.pageLink}
          nextClassName={s.nextLink}
          activeClassName={s.activeLink}
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Poder</th>
              <th>Descripción</th>
              <th>Dificultad</th>
              <th>Expansión</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((alien) => (
              <tr key={alien._id}>
                <td>{alien.Nombre}</td>
                <td>{alien.Poder}</td>
                <td>{alien.Descripción}</td>
                <td>{alien.Dificultad}</td>
                <td>{alien.Expansión}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Próximo >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Anterior"
          renderOnZeroPageCount={null}
          containerClassName={s.pagination}
          pageClassName={s.pageLink}
          previousLinkClassName={s.pageLink}
          nextClassName={s.nextLink}
          activeClassName={s.activeLink}
        />
      </div>
    </div>
  );
   
  
  
  
  
  
  
};
