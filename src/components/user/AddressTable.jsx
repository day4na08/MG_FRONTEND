// src/components/AddressTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressTable = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`https://mgbackend-production.up.railway.app/users/${userId}/addresses`);
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleAddAddress = async () => {
    try {
      await axios.post(`https://mgbackend-production.up.railway.app/users/${userId}/addresses`, { direccion: newAddress });
      setAddresses([...addresses, { direccion: newAddress }]);
      setNewAddress('');
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`https://mgbackend-production.up.railway.app/users/${userId}/addresses/${addressId}`);
      setAddresses(addresses.filter(address => address.id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleEditAddress = async (address) => {
    try {
      await axios.put(`https://mgbackend-production.up.railway.app/users/${userId}/addresses/${address.id}`, address);
      setAddresses(addresses.map(a => (a.id === address.id ? address : a)));
      setEditingAddress(null);
    } catch (error) {
      console.error("Error editing address:", error);
    }
  };

  return (
    <div>
      <h3>Direcciones</h3>
      <table>
        <thead>
          <tr>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map(address => (
            <tr key={address.id}>
              <td>{address.direccion}</td>
              <td>
                <button onClick={() => setEditingAddress(address)}>Editar</button>
                <button onClick={() => handleDeleteAddress(address.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4>{editingAddress ? 'Editar Dirección' : 'Agregar Dirección'}</h4>
        <input
          type="text"
          placeholder="Dirección"
          value={editingAddress ? editingAddress.direccion : newAddress}
          onChange={e => (editingAddress ? setEditingAddress({ ...editingAddress, direccion: e.target.value }) : setNewAddress(e.target.value))}
        />
        <button onClick={editingAddress ? () => handleEditAddress(editingAddress) : handleAddAddress}>
          {editingAddress ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </div>
  );
};

export default AddressTable;
