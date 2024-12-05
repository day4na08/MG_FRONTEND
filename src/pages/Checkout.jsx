import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";


const CheckoutForm = ({ cartItems, onPurchaseComplete }) => {
  const [userData, setUserData] = useState({
    userId: "",
    nameUser: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    numTargeta: "",
    vencimientoTargeta: "",
    cvv: "",
  });

  const [productForms, setProductForms] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [message, setMessage] = useState("");

  // Recuperar datos de cookies
  useEffect(() => {
    const cookies = new Cookies();
    const userId = cookies.get("id") || "";
    const nameUser = cookies.get("username") || "";
    const email = cookies.get("email") || "";

    setUserData((prevState) => ({
      ...prevState,
      userId,
      nameUser,
      email,
    }));

    if (userId) {
      mostrarTelefono(userId);
      mostrarCard(userId);
    }
  }, []);

  const mostrarTelefono = (userId) => {
    axios
      .get(`https://mgbackend-production.up.railway.app/phoneUser/${userId}`)
      .then((response) => {
        if (response.data && response.data.telefono) {
          setUserData((prevState) => ({
            ...prevState,
            telefono: response.data.telefono,
          }));
        } else {
          setMessage("No se pudo cargar el teléfono.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el teléfono", error);
        setMessage("Error al obtener el teléfono.");
      });
  };

  const mostrarCard = (userId) => {
    axios
      .get(`https://mgbackend-production.up.railway.app/CardUser/${userId}`)
      .then((response) => {
        if (response.data) {
          const cardData = response.data;
          setUserData((prevState) => ({
            ...prevState,
            numTargeta: cardData.numero || "",
            vencimientoTargeta: cardData.fecha_vencimiento || "",
            cvv: cardData.codigo_seguridad || "",
          }));
        } else {
          setMessage("No se pudo cargar la tarjeta.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener la tarjeta", error);
        setMessage("Error al obtener la tarjeta.");
      });
  };

  useEffect(() => {
    const products = cartItems.map((item) => ({
      cantComprada: item.quantity,
      precio: item.precio,
      estilo: item.estilo,
      nameProduct: item.name,
      img1Product: item.imagen1,
      autor: item.autor,
      productoId: item.id,
      autorid: item.userId,
    }));
    setProductForms(products);
  }, [cartItems]);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedProducts = [...productForms];
      updatedProducts[index][name] = value;
      setProductForms(updatedProducts);
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const validateForm = () => {
    if (currentStep === 1) {
      return (
        userData.direccion &&
        userData.ciudad &&
        userData.codigoPostal &&
        userData.numTargeta &&
        userData.vencimientoTargeta &&
        userData.cvv
      );
    } else if (currentStep > 1 && currentStep <= productForms.length + 1) {
      const product = productForms[currentStep - 2];
      return (
        product &&
        product.cantComprada > 0 &&
        product.precio > 0 &&
        product.nameProduct.trim() !== "" &&
        product.estilo.trim() !== ""
      );
    }
    return false;
  };

  const nextStep = () => {
    if (validateForm() && currentStep < productForms.length + 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const triggerPurchaseLogic = async () => {
    try {
      for (const product of productForms) {
        const ventaResponse = await axios.post(
          "https://mgbackend-production.up.railway.app/addventa",
          {
            userId: userData.userId,
            autorId: product.autorid,
            cantComprada: product.cantComprada,
            precioProducto: product.precio,
            nameProduct: product.nameProduct,
            categoriaProduct: product.estilo,
            img1Product: product.img1Product,
            autor: product.autor,
            productoId: product.productoId,
            nameUser: userData.nameUser,
            fechaCompra: new Date().toISOString().split("T")[0],
          }
        );
  
        if (ventaResponse.status !== 200) {
          throw new Error("Error al procesar la venta.");
        }
      }
      setMessage("Lógica de triggers ejecutada exitosamente.");
  
    } catch (error) {
      console.error("Error al ejecutar los triggers:", error);
      setMessage("Hubo un error al ejecutar los triggers.");
  
      // Mostrar alerta en caso de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al ejecutar los triggers. Inténtalo nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Enviar los datos del cliente
      const clienteResponse = await axios.post(
        "https://mgbackend-production.up.railway.app/clientes",
        {
          nameUser: userData.nameUser,
          email: userData.email,
          telefono: userData.telefono,
          direccion: userData.direccion,
          ciudad: userData.ciudad,
          codigoPostal: userData.codigoPostal,
          numTargeta: userData.numTargeta,
          vencimientoTargeta: userData.vencimientoTargeta,
          cvv: userData.cvv,
          userId: userData.userId,
        }
      );
  
      if (clienteResponse.status !== 200) {
        throw new Error("Error al insertar datos del cliente");
      }
  
      // Enviar los datos de cada producto
      for (const product of productForms) {
        const compraResponse = await axios.post(
          "https://mgbackend-production.up.railway.app/addcompra",
          { ...product, autorId: product.autorid, ...userData }
        );
  
        if (compraResponse.status !== 200) {
          throw new Error("Error al insertar datos de compra");
        }
      }
  
      // Vaciar el carrito después de la compra exitosa
      onPurchaseComplete();
      // Mostrar alerta de compra finalizada usando SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Compra Finalizada",
          html: "¡La compra se ha procesado exitosamente! <br> Te Hemos enviado un correo con mas detalles de la compra.",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Ejecuta la lógica de triggers cuando el usuario hace clic en "Aceptar"
            triggerPurchaseLogic();
          }
        });

  
    } catch (error) {
      console.error("Error en la compra:", error);
      setMessage("Error al procesar la compra.");
  
      // Mostrar alerta en caso de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al procesar la compra. Inténtalo nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
  };
  
  

  return (
    <div className="container my-4">
      <h2 className="mb-4">Formulario de Compra</h2>
      <form onSubmit={handleSubmit}>
      {currentStep === 1 && (
  <div>
    <h4>Información del Cliente</h4>
    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="userId" className="form-label">
          ID del Usuario
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          name="userId"
          value={userData.userId}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="nameUser" className="form-label">
          Nombre del Usuario
        </label>
        <input
          type="text"
          className="form-control"
          id="nameUser"
          name="nameUser"
          value={userData.nameUser}
          onChange={handleChange}
          readOnly
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="email" className="form-label">
          Correo Electrónico
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="telefono" className="form-label">
          Teléfono
        </label>
        <input
          type="text"
          className="form-control"
          id="telefono"
          name="telefono"
          value={userData.telefono}
          onChange={handleChange}
          readOnly
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="direccion" className="form-label">
          Dirección
        </label>
        <input
          type="text"
          className="form-control"
          id="direccion"
          name="direccion"
          value={userData.direccion}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="ciudad" className="form-label">
          Ciudad
        </label>
        <input
          type="text"
          className="form-control"
          id="ciudad"
          name="ciudad"
          value={userData.ciudad}
          onChange={handleChange}
          required
        />
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-md-6">
        <label htmlFor="codigoPostal" className="form-label">
          Código Postal
        </label>
        <input
          type="text"
          className="form-control"
          id="codigoPostal"
          name="codigoPostal"
          value={userData.codigoPostal}
          onChange={handleChange}
          required
        />
      </div>
      <div className="row mb-3">
  <div className="col-md-6">
    <label htmlFor="numTargeta" className="form-label">
      Número de Tarjeta
    </label>
    <input
      type="text"
      className="form-control"
      id="numTargeta"
      name="numTargeta"
      value={userData.numTargeta}
      onChange={handleChange}
      required
    />
  </div>
  <div className="col-md-6">
    <label htmlFor="vencimientoTargeta" className="form-label">
      Fecha de Vencimiento
    </label>
    <input
      type="text"
      className="form-control"
      id="vencimientoTargeta"
      name="vencimientoTargeta"
      value={userData.vencimientoTargeta}
      onChange={handleChange}
      required
    />
  </div>
</div>
<div className="row mb-3">
  <div className="col-md-6">
    <label htmlFor="cvv" className="form-label">
      CVV
    </label>
    <input
      type="text"
      className="form-control"
      id="cvv"
      name="cvv"
      value={userData.cvv}
      onChange={handleChange}
      required
    />
  </div>
</div>
    </div>
    <button
      type="button"
      className="btn btn-primary"
      onClick={nextStep}
      disabled={!validateForm()}
    >
      Siguiente
    </button>
  </div>
)}

        {currentStep > 1 && currentStep <= productForms.length + 1 && (
          <div>
            <h4>Producto {currentStep - 1}</h4>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="cantComprada" className="form-label">
                  Cantidad Comprada
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cantComprada"
                  name="cantComprada"
                  value={productForms[currentStep - 2].cantComprada}
                  onChange={(e) => handleChange(e, currentStep - 2)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="precio" className="form-label">
                  Precio
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="precio"
                  name="precio"
                  value={productForms[currentStep - 2].precio}

                  onChange={(e) => handleChange(e, currentStep - 2)}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="nameProduct" className="form-label">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameProduct"
                  name="nameProduct"
                  value={productForms[currentStep - 2].nameProduct}
                  onChange={(e) => handleChange(e, currentStep - 2)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="estilo" className="form-label">
                  Estilo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="estilo"
                  name="estilo"
                  value={productForms[currentStep - 2].estilo}
                  onChange={(e) => handleChange(e, currentStep - 2)}
                  required
                />
              </div>
            </div>
            <div className="text-center mb-4">
  {currentStep < productForms.length + 1 && (
    <button
      type="button"
      className="btn btn-primary"
      onClick={nextStep}
      disabled={!validateForm()} // Se deshabilita si la validación falla
    >
      Siguiente
    </button>
  )}
{currentStep === productForms.length + 1 && (
  <button
    type="submit"
    className="btn btn-success"
    disabled={!validateForm()} // Se deshabilita si la validación falla
  >
    Finalizar Compra
  </button>
)}

  
  {currentStep > 1 && (
    <button
      type="button"
      className="btn btn-secondary ms-3"
      onClick={prevStep}
    >
      Atrás
    </button>
  )}
</div>

          </div>
        )}
      </form>
      
    </div>
  );
};

export default CheckoutForm;

