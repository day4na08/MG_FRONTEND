import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



const ProductCrud = () => {
    const cookies = new Cookies();
    const userId = cookies.get('id')
    const autor = cookies.get('username')
    const [name, setName] = useState("");
    const [material, setMaterial] = useState("")
    const [estilo, setEstilo] = useState("");
    const [tela, setTela] = useState("");
    const [acabado, setAcabado] = useState("");
    const [color, setColor] = useState("");
    const [tapizMaterial, setTapizMaterial] = useState("");
    const [materialInterno, setMaterialInterno] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [requiereArmado, setRequiereArmado] = useState("");
    const [alto, setAlto] = useState("");
    const [ancho, setAncho] = useState("");
    const [profundidad, setProfundidad] = useState("");
    const [pesoNeto, setPesoNeto] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [imagen1, setImagen1] = useState("");
    const [imagen2, setImagen2] = useState("");
    const [imagen3, setImagen3] = useState("");
    const [imagen4, setImagen4] = useState("");
    const [imagen3D, setImagen3D] = useState("");
    const [productsList, setProducts] = useState ([]);
    const [editar, setEditar] = useState (false);
    const [eliminar, setEliminar] = useState ([]);
    const [id, setId] = useState ([]);
    const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario

  const toggleForm = () => {
    setShowForm(!showForm);
  };

      
    
    const noti = withReactContent(Swal)
   
    const add =()=> {
        Axios.post("https://mgbackend-production.up.railway.app/productos",{
        name:name ,
        material:material,
        estilo:estilo,
        tela:tela,
        acabado:acabado,
        color:color,
        tapizMaterial:tapizMaterial,
        materialInterno:materialInterno,
        precio:precio,
        descripcion:descripcion,
        requiereArmado:requiereArmado,
        alto:alto,
        ancho:ancho,
        profundidad:profundidad,
        pesoNeto:pesoNeto,
        cantidad:cantidad,
        autor:autor,
        imagen1:imagen1,
        imagen2:imagen2,
        imagen3:imagen3,
        imagen4:imagen4,
        imagen3D:imagen3D,
        userId:userId
    }).then(()=>{
        getProducts();
        cancel();
        noti.fire({
            title: "Muy Bien!",
            text: "Mueble agregado satisfactoriamente",
            icon: "Continuar"
          });
    })

    }

    const productDelete = (val) => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
      
        swalWithBootstrapButtons.fire({
          title: "Estas seguro?",
          html: "<p>Quieres eliminar el mueble <strong>"+ val.name +"</strong>?</p>",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          reverseButtons: true   
        }).then((result) => {
          if (result.isConfirmed) {
            Axios.delete(`https://mgbackend-production.up.railway.app/deleteproductos/${val.id}`).then(() => {
                getProducts(); // Recargar la lista de productos
                cancel(); // Cancelar cualquier acción adicional si es necesario
                noti.fire({
                  title: "Eliminado!",
                  html: "<p>El mueble <strong>"+val.name+"</strong> fue eliminado satisfactoriamente</p>",
                  icon: "success",
                  timer:3000
                });
              })
              .catch((error) => {
                console.error("Error eliminando producto:", error);
                Swal.fire("Error", "There was an issue deleting the product.", "error");
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              html: "<p>El mueble <strong>"+ val.name +"</strong> no fue eliminado</p>",
              icon: "error"
            });
          }
        });
      };
      
    const cancel =()=> {
        setEditar(false)
        setName("");
        setMaterial(""); 
        setEstilo(""); 
        setTela(""); 
        setAcabado(""); 
        setColor(""); 
        setTapizMaterial(""); 
        setMaterialInterno(""); 
        setPrecio(""); 
        setDescripcion(""); 
        setRequiereArmado(""); 
        setAlto(""); 
        setAncho(""); 
        setProfundidad(""); 
        setPesoNeto(""); 
        setCantidad(""); 
        setImagen1(""); 
        setImagen2(""); 
        setImagen3(""); 
        setImagen4(""); 
        setImagen3D(""); 
        setId("");

    }

    const update =()=> {
        Axios.put("https://mgbackend-production.up.railway.app/updateproductos",{
        id:id,
        name:name ,
        material:material,
        estilo:estilo,
        tela:tela,
        acabado:acabado,
        color:color,
        tapizMaterial:tapizMaterial,
        materialInterno:materialInterno,
        precio:precio,
        descripcion:descripcion,
        requiereArmado:requiereArmado,
        alto:alto,
        ancho:ancho,
        profundidad:profundidad,
        pesoNeto:pesoNeto,
        cantidad:cantidad,
        autor:autor,
        imagen1:imagen1,
        imagen2:imagen2,
        imagen3:imagen3,
        imagen4:imagen4,
        imagen3D:imagen3D
    }).then(()=>{
        getProducts();
        cancel();
        noti.fire({
            title: "Muy Bien!",
            text: "El mueble "+name+" fue actualizado  satisfactoriamente",
            icon: "success",
            timer: 3000
          });
    })

    }
    const editarMueble =(val)=>{
        setEditar(true)
        setName(val.name);
        setMaterial(val.material); 
        setEstilo(val.estilo); 
        setTela(val.tela); 
        setAcabado(val.acabado); 
        setColor(val.color); 
        setTapizMaterial(val.tapizMaterial); 
        setMaterialInterno(val.materialInterno); 
        setPrecio(val.precio); 
        setDescripcion(val.descripcion); 
        setRequiereArmado(val.requiereArmado); 
        setAlto(val.alto); 
        setAncho(val.ancho); 
        setProfundidad(val.profundidad); 
        setPesoNeto(val.pesoNeto); 
        setCantidad(val.cantidad); 
        setImagen1(val.imagen1); 
        setImagen2(val.imagen2); 
        setImagen3(val.imagen3); 
        setImagen4(val.imagen4); 
        setImagen3D(val.imagen3D); 
        setId(val.id);

    }

    const getProducts = () => {
        Axios.get(`https://mgbackend-production.up.railway.app/llamarProductos/${userId}`).then((response) => {
            setProducts(response.data);
          });
    };

    useEffect(() => {
        getProducts(); // Llama la lista de productos cuando el componente carga
    }, []);

    // Define the options for various fields
    const estiloOptions = ["", "Contemporáneo", "Rústico", "Moderno"];
    const telaOptions = ["", "Cuero", "TelaSeda", "TelaLino"];
    const acabadoOptions = ["", "Cuero", "Aceite", "Liso", "Transparente", "Mate", "Brillante"];
    const colorOptions = ["", "Negro", "Madera", "Blanco", "Azul Marino", "Marrón", "Gris"];
    const tapizMaterialOptions = ["", "Cuero", "Tela"];
    const materialInternoOptions = ["", "Triplex", "Contrachapado", "Espuma", "Metal"];
    const materialOptions = ["", "Triplex", "Contrachapado", "tela", "lona"];
    const armadoOptions = ["No aplica", "Si", "No"];



    return (
        <>
      <div className="container">
        <button onClick={toggleForm} className="btn btn-primary mb-3">
          {showForm ? "Cancelar" : "Agregar Producto"}
        </button>

        <div className="row">
          {showForm ? (
            <div className="col-md-12">
              <div className="productos">
                <h2>Formulario de Producto</h2>
                <div className="datos">

            <div className="row">
              <div className="col-md-4">
                <label>Nombre: <input onChange={(event) => setName(event.target.value)} value={name} required type='text' className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Material: 
                  <select onChange={(event) => setMaterial(event.target.value)} value={material} className="form-control">
                    {materialOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                  </select>
                </label>
              </div>
              <div className="col-md-4">
                <label>Estilo: 
                  <select onChange={(event) => setEstilo(event.target.value)} value={estilo} className="form-control">
                    {estiloOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                  </select>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label>Tela: 
                  <select onChange={(event) => setTela(event.target.value)} value={tela} className="form-control">
                    {telaOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                  </select>
                </label>
              </div>
              <div className="col-md-4">
                <label>Acabado: 
                  <select onChange={(event) => setAcabado(event.target.value)} value={acabado} className="form-control">
                    {acabadoOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                  </select>
                </label>
              </div>
              <div className="col-md-4">
                <label>Color: 
                  <select onChange={(event) => setColor(event.target.value)} value={color} className="form-control">
                    {colorOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                  </select>
                </label>
              </div>
            </div>
      
            <div className="row">
              <div className="col-md-4">
                <label>Tapiz Material: 
                  <select onChange={(event) => setTapizMaterial(event.target.value)} value={tapizMaterial} className="form-control">
                    {tapizMaterialOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                  </select>
                </label>
              </div>
              <div className="col-md-4">
                <label>Material Interno: 
                  <select onChange={(event) => setMaterialInterno(event.target.value)} value={materialInterno} className="form-control">
                    {materialInternoOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                  </select>
                </label>
              </div>
              <div className="col-md-4">
                <label>Requiere Armado: 
                  <select onChange={(event) => setRequiereArmado(event.target.value)} value={requiereArmado} className="form-control">
                    {armadoOptions.map((option, index) => (<option key={index} value={option}>{option}</option>))}
                  </select>
                </label>
              </div>
            </div>
      
            <div className="row">
              <div className="col-md-4">
                <label>Precio: <input onChange={(event) => setPrecio(event.target.value)} value={precio} type='number' className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Descripción: <input onChange={(event) => setDescripcion(event.target.value)} value={descripcion} type='text' className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Alto: <input onChange={(event) => setAlto(event.target.value)} value={alto} type='number' className="form-control" /></label>
              </div>
            </div>
      
            <div className="row">
              <div className="col-md-4">
                <label>Ancho: <input onChange={(event) => setAncho(event.target.value)} value={ancho} type='number' className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Profundidad: <input onChange={(event) => setProfundidad(event.target.value)} value={profundidad} type='number' className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Peso Neto: <input onChange={(event) => setPesoNeto(event.target.value)} value={pesoNeto} type='number' className="form-control" /></label>
              </div>
            </div>
      
            <div className="row">
              <div className="col-md-4">
                <label>Autor: <input placeholder={autor} type='text' disabled className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Cantidad: <input onChange={(event) => setCantidad(event.target.value)} value={cantidad} type='number' className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Imagen 1: <input onChange={(event) => setImagen1(event.target.value)} value={imagen1} type='text' className="form-control" /></label>
              </div>
            </div>
      
            <div className="row">
              <div className="col-md-4">
                <label>Imagen 2: <input onChange={(event) => setImagen2(event.target.value)} value={imagen2} type='text' className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Imagen 3: <input onChange={(event) => setImagen3(event.target.value)} value={imagen3} type='text' className="form-control" /></label>
              </div>
              <div className="col-md-4">
                <label>Imagen 4: <input onChange={(event) => setImagen4(event.target.value)} value={imagen4} type='text' className="form-control" /></label>
              </div>
            </div>
      
            <div className="row">
              <div className="col-md-4">
                <label>Imagen 3D: <input onChange={(event) => setImagen3D(event.target.value)} value={imagen3D} type='text' className="form-control" /></label>
              </div>
            </div>
      
            <div className="modal-footer">
              {editar ? (
                <div className="modal-footer">
                <button onClick={() => {update();toggleForm(); }} className="btn btn-primary">Actualizar</button>
                <button   onClick={() => {
                    cancel();
                    toggleForm();
                  }} className="btn btn-secondary">Cancelar</button>
              </div>
              
              ) : (
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleForm}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={() => {add();toggleForm();}}>Registrar Producto</button>
              </div>
              )}
            </div>
          </div>
          </div>
          </div>
        ) : (
          <div className="tabla-crud">
            <h2>Lista de Muebles</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((val, key) => (
                  <tr key={val.id}>
                    <td>{val.name}</td>
                    <td>
                    <div 
                      className="text-truncate" 
                      style={{ maxWidth: '500px', display: '-webkit-box', WebkitBoxOrient: 'vertical', '-webkit-line-clamp': 7, overflow: 'hidden' }}
                    >
                      {val.descripcion}
                    </div>
                    </td>
                    <td>{val.cantidad}</td>
                    <td>${val.precio}</td>
                    <td>
                      <img
                        src={val.imagen1}
                        alt="Imagen del producto"
                        style={{ width: '100px', height: 'auto' }}
                      />
                    </td>
                    <td>
                      <button 
                        onClick={() => {
                          editarMueble(val);  // Ejecuta la función para editar el mueble
                          toggleForm();       // Muestra el formulario
                        }} 
                        className="btn btn-warning"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => productDelete(val)} 
                        className="btn btn-danger"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
                  </div>

                  </div>

          </>
      );
      
};

export default ProductCrud;