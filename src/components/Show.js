import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { collection,getDocs,getDoc,deleteDoc, getFirestore, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const Show = () => {
    //1.- CONFIGURAMOS LOS HOOKS
    const[producs,setProducts]=  useState( [] )




    //2.- REFERENCIAMOS A LA DATABASE DE FIRESTORE
      const productsCollection =  collection(db, "productos");


    //3.- FUNCION PARA MOSTRAR TODOS LOS DOCS
    const getProducts = async () =>{
       const data = await getDocs(productsCollection)
       //console.log(data.docs)
       setProducts(
        data.docs.map((doc) => ({...doc.data(), id:doc.id}))
    )
    //console.log(producs)
    }
   
    



    //4.- FUNCION PARA ELIMINAR UN DOCUMENTO
 const deleteProduct =async (id) =>{
    const producDoc = doc(db, "productos", id)
   await deleteDoc(producDoc)
   getProducts()
 }


    //5.- FUNCION DE CONFIRMACIÓN PARA SWEET ALERT 2
    const confirmDelete = (id) =>{
      MySwal.fire({
        title: '¿Deseas eliminar este producto?',
        text: "No hay vuelta atras!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor:'#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, quiero  eliminarlo!'
      }).then((result)=>{
        if (result.isConfirmed){
          deleteProduct(id)
          Swal.fire(
            '¡Eliminado!',
            'El archivo fue eliminado correctamente.',
            'Listo'
          )
        }
      })
    }

    //6.-USAMOS USEEFFECT

    useEffect ( () => {
        getProducts()
        //eslint-disable-next-line
    }, [] )


    //7.- RETORNAR LAS VISTAS DE NUESTRO COMPONENTE
  return (
    <>
    
    <div className='container'> 
        <div className='row'>
            <div className='col'>
                <div className="d-grid gao-2">
                    <Link to="/create" className='btn btn-secondary mt-2 mb-2' >Create</Link>
                </div>

                <table className='table table-dark table-hover'>
                  <thead>
                   <tr>
                      <th>Descrición</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr> 
                  </thead>

                <tbody>
                  { producs.map( (product) => (
                    <tr key={product.id}>
                      <td>{product.description}</td>
                      <td>{product.stock}</td>
                      <td>
                      <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pen-to-square"></i></Link>

                        <button onClick={()=> {confirmDelete(product.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  ) ) }
                  
                  
                </tbody>

                </table>
            </div>
        </div>
    </div>
    </>

  )
}

export default Show