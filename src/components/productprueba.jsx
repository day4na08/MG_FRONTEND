import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ProductCrud2 = () => {
    const [name, setName] = useState("");
    const [material, setMaterial] = useState(0)
    const [color, setColor] = useState("");
    const [precio, setPrecio] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const [imagen3D, setImagen3D] = useState("");


    const add =()=> {
        Axios.post("http://localhost:3001/productos2",{
        
        name:name ,
        material:material,
        color:color,
        precio:precio,
        descripcion:descripcion,
        imagen3D:imagen3D
    }).then(()=>{
        alert("producto registrado")
    })
    }



    

    // Define the options for various fields
    const estiloOptions = ["", "Contemporáneo", "Rústico", "Moderno"];
    const telaOptions = ["", "Cuero", "Telabonita", "Lino"];
    const acabadoOptions = ["", "Cuero", "Aceite", "Liso", "Transparente", "Mate", "Brillante"];
    const colorOptions = ["", "Negro", "Madera", "Blanco", "Azul Marino", "Marrón", "Gris"];
    const tapizMaterialOptions = ["", "Cuero", "Tela"];
    const materialInternoOptions = ["", "Triplex", "Contrachapado", "Espuma", "Metal"];
    const materialOptions = ["", "Triplex", "Contrachapado", "tela", "lona"];
    const armadoOptions = ["No aplica", "Si", "No"];



    return (
        <div className='productos'>
            <div className='datos'>
                <label>name <input 
                onChange={(event)=>{
                    setName(event.target.value)
                }}
                type='text'/></label>
                <label>material<input 
                onChange={(event)=>{
                    setMaterial(event.target.value)
                }}
                type='text'/></label>
                <label>color<input 
                onChange={(event)=>{
                    setColor(event.target.value)
                }}
                type='text'/></label>
                <label>precio<input 
                onChange={(event)=>{
                    setPrecio(event.target.value)
                }}
                type='number'/></label>
                <label>descripcion<input 
                onChange={(event)=>{
                    setDescripcion(event.target.value)
                }}
                type='text'/></label>
                <label>model3D<input 
                onChange={(event)=>{
                    setImagen3D(event.target.value)
                }}
                type='text'/></label>
                <button onClick={add}>Registar</button>
            </div>
        </div>
    );
};

export default ProductCrud2;