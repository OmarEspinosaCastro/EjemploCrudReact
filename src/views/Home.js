import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { db } from "../firebase/firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const Home = () => {

    const [products, setProducts] = useState([]);
    const productsCollection = collection(db, "products")

    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        setProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
    }

    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    const confirmDelete = (id) => {
        MySwal.fire({
            title: '¿Estas seguro de eliminar el Producto?',
            text: "Ya no podras revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, Eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                Swal.fire(
                    'Elininado!',
                    'Tu producto se ha eliminado.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1 style={{marginTop:20}}>Crud - React Js</h1>
                        <div style={{display:'flex'}}>
                            <Link to="/create" style={{}} className='btn btn-secondary mt-5 mb-4'> Crear Producto </Link>
                        </div>
                        <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Stock</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.description}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
