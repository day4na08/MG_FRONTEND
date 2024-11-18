// src/components/PhoneTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhoneTable = ({ userId }) => {
  const [phones, setPhones] = useState([]);
  const [newPhone, setNewPhone] = useState('');
  const [editingPhone, setEditingPhone] = useState(null);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}/phones`);
        setPhones(response.data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    fetchPhones();
  }, [userId]);

  const handleAddPhone = async () => {
    try {
      await axios.post(`http://localhost:3001/users/${userId}/phones`, { numero: newPhone });
      setPhones([...phones, { numero: newPhone }]);
      setNewPhone('');
    } catch (error) {
      console.error("Error adding phone:", error);
    }
  };

  const handleDeletePhone = async (phoneId) => {
    try {
      await axios.delete(`http://localhost:3001/users/${userId}/phones/${phoneId}`);
      setPhones(phones.filter(phone => phone.id !== phoneId));
    } catch (error) {
      console.error("Error deleting phone:", error);
    }
  };

  const handleEditPhone = async (phone) => {
    try {
      await axios.put(`http://localhost:3001/users/${userId}/phones/${phone.id}`, phone);
      setPhones(phones.map(p => (p.id === phone.id ? phone : p)));
      setEditingPhone(null);
    } catch (error) {
      console.error("Error editing phone:", error);
    }
  };

  return (
    <div>
      <h3>Números de Teléfono</h3>
      <table>
        <thead>
          <tr>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {phones.map(phone => (
            <tr key={phone.id}>
              <td>{phone.numero}</td>
              <td>
                <button onClick={() => setEditingPhone(phone)}>Editar</button>
                <button onClick={() => handleDeletePhone(phone.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4>{editingPhone ? 'Editar Teléfono' : 'Agregar Teléfono'}</h4>
        <input
          type="text"
          placeholder="Número de Teléfono"
          value={editingPhone ? editingPhone.numero : newPhone}
          onChange={e => (editingPhone ? setEditingPhone({ ...editingPhone, numero: e.target.value }) : setNewPhone(e.target.value))}
        />
        <button onClick={editingPhone ? () => handleEditPhone(editingPhone) : handleAddPhone}>
          {editingPhone ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </div>
  );
};

export default PhoneTable;
