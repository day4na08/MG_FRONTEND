import React from "react";

const UserInfoForm = ({ userData, handleChange, validateForm, nextStep }) => {
  return (
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
      <button
        type="button"
        className="btn btn-primary"
        onClick={nextStep}
        disabled={!validateForm()}
      >
        Siguiente
      </button>
    </div>
  );
};

export default UserInfoForm;
