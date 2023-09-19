import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export const Create = () => {

    const [ description, setDescription ] = useState('')
    const [ stock, setStock ] = useState(0)
    const navigate = useNavigate()

    const productsCollection = collection(db, "products")

    const store = async (e) => {
      e.preventDefault()
      await addDoc( productsCollection, { description: description, stock: stock } )
      navigate('/')
    }
  
  return (
    <div className='container'>
    <div className='row' >
            <h1>Create Product</h1>
             <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <input
                        value={description}
                        onChange={ (e) => setDescription(e.target.value)} 
                        type="text"
                        className='form-control'
                        required={true}
                    />
                </div>  
                <div className='mb-3'>
                    <label className='form-label'>Stock</label>
                    <input
                        value={stock}
                        onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                        onChange={ (e)=>  setStock(e.target.value)}
                        type="number"
                        className='form-control'
                        required={true}
                        pattern="[0-9]*"
                    />                 
                </div>  
                <button type='submit' className='btn btn-primary'>Guardar</button>
             </form>
    </div>
</div> 
  )
}
