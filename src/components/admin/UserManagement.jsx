import React, { useState, useEffect } from 'react';
import Axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Modal, Button } from 'react-bootstrap';

function UserManagement() {
  const [username, setUsername] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [role, setRole] = useState("");
  const [usuariosList, setUsuarios] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controlar el estado del modal
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const usersPerPage = 10; // Usuarios por página

  const noti = withReactContent(Swal);

  const addUser = () => {
    Axios.post("https://mgbackend-production.up.railway.app/createUser", {
      username: username,
      apellido: apellido,
      email: email,
      contrasena: contrasena,
      role: role
    }).then(() => {
      getRegistrados();
      alert("Usuario registrado");
      setShowModal(false); // Cerrar el modal después de registrar
    });
  };

  const usuarioDelete = (val) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro?",
        html: `<p>¿Quieres eliminar al Usuario: <strong>${val.username}</strong>?</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`https://mgbackend-production.up.railway.app/deleteUser/${val.id}`).then(() => {
            swalWithBootstrapButtons.fire({
              title: "¡Eliminado!",
              html: `<p>El Usuario: <strong>${val.username}</strong> fue eliminado satisfactoriamente</p>`,
              icon: "success",
              timer: 3000,
            });
            getRegistrados(); // Recargar la lista de usuarios
            cancel();
          })
            .catch((error) => {
              console.error("Error eliminando usuario:", error);
              Swal.fire("Error", "No pudimos eliminar el usuario", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            html: `<p>El Usuario <strong>${val.username}</strong> no fue eliminado</p>`,
            icon: "error",
          });
          getRegistrados(); // Recargar la lista de usuarios
          cancel();
        }
      });
  };

  const cancel = () => {
    setEditar(false);
    setUsername("");
    setApellido("");
    setEmail("");
    setContrasena("");
    setRole("");
    setId("");
    setShowModal(false); // Cerrar el modal después de registrar
  };

  const update = () => {
    Axios.put("https://mgbackend-production.up.railway.app/updateUser", {
      id: id,
      username: username,
      apellido: apellido,
      email: email,
      contrasena: contrasena,
      role: role
    }).then(() => {
      noti.fire({
        title: "Muy Bien!",
        text: "Los datos del Usuario " + username + " fueron actualizados satisfactoriamente",
        icon: "success",
        timer: 3000
      });
      getRegistrados();
      cancel();
    });
  };

  const editarUsuario = (val) => {
    setEditar(true);
    setUsername(val.username);
    setApellido(val.apellido);
    setEmail(val.email);
    setContrasena(val.contrasena);
    setRole(val.role);
    setId(val.id);
    setShowModal(true); // Abrir el modal cuando se edita un usuario
  };

  const getRegistrados = () => {
    Axios.get("https://mgbackend-production.up.railway.app/registrados").then((response) => {
      setUsuarios(response.data);
    });
  };

  useEffect(() => {
    getRegistrados(); // Llama la lista de productos cuando el componente carga
  }, []);

  // Lógica para la paginación
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usuariosList.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usuariosList.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-4">
      <h5>Gestión de usuarios</h5>
      {/* Botón para abrir el modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>Agregar nuevo usuario</Button>
      {/* Modal de Bootstrap */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editar ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nombre</label>
              <input
                value={username}
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                className="form-control"
                id="username"
                placeholder="Ingrese un nombre"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input
                value={apellido}
                type="text"
                onChange={(event) => setApellido(event.target.value)}
                className="form-control"
                id="apellido"
                placeholder="Ingrese un apellido"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
                id="email"
                placeholder="Ingrese un email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasena" className="form-label">Contraseña</label>
              <input
                value={contrasena}
                type="password"
                onChange={(event) => setContrasena(event.target.value)}
                className="form-control"
                id="contrasena"
                placeholder="Ingrese una contraseña"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <input
                value={role}
                type="text"
                onChange={(event) => setRole(event.target.value)}
                className="form-control"
                id="role"
                placeholder="Ingrese un rol"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {editar ? (
            <div>
              <button onClick={update} className="btn btn-primary me-2">Actualizar</button>
              <button onClick={cancel} className="btn btn-secondary">Cancelar</button>
            </div>
          ) : (
            <button onClick={addUser} className="btn btn-success">Registrar</button>
          )}
        </Modal.Footer>
      </Modal>
      {/* Tabla de usuarios */}
      <div className="mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((val, key) => (
              <tr key={key}>
                <td>{indexOfFirstUser + key + 1}</td>
                <td>{val.username}</td>
                <td>{val.apellido}</td>
                <td>{val.email}</td>
                <td>{val.contrasena}</td>
                <td>{val.role}</td>
                <td>
                  <button onClick={() => editarUsuario(val)} className="btn btn-warning me-2">Editar</button>
                  <button onClick={() => usuarioDelete(val)} className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginación */}
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserManagement;
