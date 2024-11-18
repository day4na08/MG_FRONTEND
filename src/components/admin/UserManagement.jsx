import React, { useState, useEffect } from 'react';
import Axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function UserManagement() {
  const [username, setUsername] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [role, setRole] = useState("");
  const [usuariosList, setUsuarios] = useState([]);
  const [editar, setEditar] = useState (false);
  const [id, setId]= useState([]);
  const [eliminar, setEliminar] = useState ([]);
  const noti = withReactContent(Swal)



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
    });
  }


  
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
            getRegistrados(); // Recargar la lista de usuarios
            cancel(); 
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            html: `<p>El Usuario <strong>${val.username}</strong> no fue eliminado</p>`,
            icon: "error",
          });
          getRegistrados(); // Recargar la lista de usuarios
          cancel(); 
        }
        getRegistrados(); // Recargar la lista de usuarios
        cancel(); 
      });
  };
  
const cancel =()=> {
    setEditar(false)
    setUsername("");
    setApellido("");
    setEmail("");
    setContrasena("");
    setRole("");
    setId("")


}

const update =()=> {
    Axios.put("https://mgbackend-production.up.railway.app/updateUser",{
    id:id,
    username:username,
    apellido:apellido,
    email:email,
    contrasena:contrasena,
    role:role
    }).then(()=>{
    noti.fire({
        title: "Muy Bien!",
        text: "Los datos del Usuario "+username+" fueron actualizados satisfactoriamente",
        icon: "success",
        timer: 3000
        
      });
      getRegistrados();
      cancel();
})
}
const editarUsuario =(val)=>{
    setEditar(true)

    setUsername(val.username);
    setApellido(val.apellido);
    setEmail(val.email);
    setContrasena(val.contrasena);
    setRole(val.role);
    setId(val.id);
    
}


  const getRegistrados = () => {
    Axios.get("https://mgbackend-production.up.railway.app/registrados").then((response) => {
      setUsuarios(response.data);
    });
  }
  useEffect(() => {
    getRegistrados(); // Llama la lista de productos cuando el componente carga
}, []);

  return (
    <div className="container">
         

        <div className="card text-center" style={{ maxWidth: '400px', margin: '0 auto', padding: '0px' }}>
          <div className="card-header">
            <h5 className="mb-0">Gestión de usuarios</h5>
          </div>

          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" style={{ width: '120px', justifyContent: 'center' }}>Nombre</span>
              <input 
                value={username}
                type="text"
                onChange={(event) => setUsername(event.target.value)}
                className="form-control" 
                placeholder="Ingrese un nombre" 
                aria-label="Username" 
                style={{ height: '45px', minWidth: '240px' }}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" style={{ width: '120px', justifyContent: 'center' }}>Apellido</span>
              <input 
                value={apellido}
                type="text"
                onChange={(event) => setApellido(event.target.value)}
                className="form-control" 
                placeholder="Ingrese un apellido" 
                aria-label="Apellido" 
                style={{ height: '45px', minWidth: '240px' }}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" style={{ width: '120px', justifyContent: 'center' }}>Email</span>
              <input 
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
                placeholder="Ingrese un email"
                style={{ height: '45px', minWidth: '240px' }}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" style={{ width: '120px', justifyContent: 'center' }}>Contraseña</span>
              <input 
                value={contrasena}
                type="password"
                onChange={(event) => setContrasena(event.target.value)}
                className="form-control"
                placeholder="Ingrese una contraseña"
                style={{ height: '45px', minWidth: '240px' }}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" style={{ width: '120px', justifyContent: 'center' }}>Role</span>
              <input 
                value={role}
                type="text"
                onChange={(event) => setRole(event.target.value)}
                className="form-control"
                placeholder="Ingrese un rol"
                style={{ height: '45px', minWidth: '240px' }}
              />
            </div>
          </div>
          <div className="card-footer">
                {
                    editar? 
                    <div> 
                        <button onClick={update}>actualizar</button>
                        <button onClick={cancel}>cancelar</button>
                    </div>
                    :<button onClick={addUser}>Registar</button>
                }

                </div>



      <table class="table table-striped">
          <thead> 
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>

          {usuariosList.map((val, key) => (
           
           <tr key={val.id}>
           <th scope="row">{val.id}</th>
           <td>{val.username}</td>
           <td>{val.apellido}</td>
           <td>{val.email}</td>
           <td>{val.contrasena}</td>
           <td>{val.role}</td>
           <td>                
              <button onClick={()=>{
               editarUsuario(val)
               }}>editar</button>

              <button onClick={()=>{
               usuarioDelete(val);
               }}>Eliminar</button>
          </td>
         </tr>
          ))}

           
            
          </tbody>
          </table>                
          </div> 

    </div>
  );
}

export default UserManagement;