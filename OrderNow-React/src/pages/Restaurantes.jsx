import React, { useEffect, useState } from 'react';
import TarjetaRestaurante from '../components/TarjetaRestaurante';
import supabase from '../supabase-client';

const Business = () => {
  const [openRestaurants, setOpenRestaurants] = useState([]);
  const [closedRestaurants, setClosedRestaurants] = useState([]);

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    const { data, error } = await supabase
      .from('businesses')
      .select('*');

    if (error) {
      error.message;
    } else {
      const abiertos = data.filter(b => b.is_open);
      const cerrados = data.filter(b => !b.is_open);
      setOpenRestaurants(abiertos);
      setClosedRestaurants(cerrados);
    }
  };

  return (
    <div className="flex flex-col justify-center space-y-10">
      <div>
        <h1 className="text-4xl font-bold mb-6">RESTAURANTES DISPONIBLES</h1>
        {openRestaurants.length > 0 ? (
          openRestaurants.map((item) => (
            <TarjetaRestaurante
              key={item.id}
              id={item.id}
              nombre={item.name}
              descripcion={item.description}
              estrellas={3.5}
              comidas={[{ nombre: "comida 1", precio: "15" }]}
            />
          ))
        ) : (
          <p>No hay restaurantes disponibles.</p>
        )}
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-6">RESTAURANTES NO DISPONIBLES</h1>
        {closedRestaurants.length > 0 ? (
          closedRestaurants.map((item) => (
            <TarjetaRestaurante
              key={item.id}
              id={item.id}
              nombre={item.name}
              descripcion={item.description}
              estrellas={3.5}
              comidas={[{ nombre: "comida 1", precio: "15" }]}
            />
          ))
        ) : (
          <p>Todos los restaurantes están disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Business;
