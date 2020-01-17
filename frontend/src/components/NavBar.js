import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = props => {
  return(
    <div>
      <Link to='/dogs'>All Dogs</Link>
      <Link to='/log'>Progress</Link>
    </div>
  );
}
