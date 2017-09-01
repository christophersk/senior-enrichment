import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Campus ({campus}) {
  return (
      <div className="col-xs-6 col-md-3">
        <NavLink to={`/campuses/${campus.id}`} style={{textDecoration: 'none'}}>
          {campus.name}
          <img src={campus.image} className="img img-responsive" />
        </NavLink>
      </div>
  );
}
