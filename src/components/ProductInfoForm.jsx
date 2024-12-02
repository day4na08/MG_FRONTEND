import React from "react";

const ProductInfoForm = ({
  product,
  handleChange,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  validateForm,
}) => {
  return (
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
            value={product.cantComprada}
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
            value={product.precio}
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
            value={product.nameProduct}
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
            value={product.estilo}
            onChange={(e) => handleChange(e, currentStep - 2)}
            required
          />
        </div>
      </div>
      <div className="text-center mb-4">
        {currentStep < totalSteps && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={nextStep}
            disabled={!validateForm()}
          >
            Siguiente
          </button>
        )}
        {currentStep === totalSteps && (
          <button
            type="submit"
            className="btn btn-success"
            disabled={!validateForm()}
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
  );
};

export default ProductInfoForm;
