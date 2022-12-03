import axios from '../api';
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'

function FormularioParametro() {
    const [edicion, setEdicion] = React.useState(false)
    const [parametro, setParametro] = React.useState([])
    const [form, setForm] = React.useState({
        nombre: ""
    })

    useEffect(() => {
        getParametro()
    }, [])

    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const getParametro = async () => {
        try {
            const { data } = await axios.post("/Parametro/getParametros")
            setParametro(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const create = async (e) => {
        e.preventDefault()
        try {
            if (form.nombre.trim()) {
                await axios.post("/Parametro/", form)
                getParametro()
                setEdicion(false)
                setForm({ nombre: "" })
                Swal.fire({
                    icon: 'success',
                    title: 'Exito',
                    text: 'Los datos se han guardado exitosamente',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Por favor rellene todos los campos',
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const update = async (e) => {
        e.preventDefault()
        try {
            if (form.updateId) {
                await axios.put(`/parametro/${form.updateId}`, {
                    nombre: form.nombre
                })
                getParametro()
                setForm({ nombre: "" })
                setEdicion(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Exito',
                    text: 'Los datos se han editado exitosamente',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo un error al editar los datos',
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = async () => {
        setForm({ nombre: "" })
        setEdicion(false)
    }

    const handlerDelete = async (id) => {
        try {
            await axios.delete(`/Parametro/${id}`, {})
            getParametro()
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Los datos se han eliminado exitosamente',
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handlerUpdateClick = async (data) => {
        setForm({ updateId: data.id, nombre: data.nombre })
        setEdicion(true)
    }

    return (
        <div className='container'>
            <div className="col mt-2">
                <h4 className='text-center'>Registro de Parametro</h4>
                <form action="" onSubmit={(edicion) ? (update) : (create)}>
                    <div className='mb-3'>
                        <label htmlFor="nombre" className='form-label'>Nombre</label>
                        <input type="text" className='form-control' name='nombre' id='nombre' value={form.nombre} onChange={onInputChange} />
                    </div>
                    <button className='btn btn-primary'>{(edicion) ? (<>Editar</>) : (<>Crear</>)}</button>
                    <button type='button' className='btn btn-secondary ms-2' onClick={() => cancelar()}>Cancelar</button>
                </form>

                <br />
                <hr />

                <table className='table table-bordered'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope='col' className='text-center'>Nombre</th>
                            <th scope='col' className='text-center'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parametro.length > 0 ?
                            (<>
                                {parametro.map((e, index) => (
                                    <tr key={`e${index}`}>
                                        <td className='text-center'>{e.nombre}</td>
                                        <td className='text-center'>
                                            <button className='btn btn-warning' onClick={() => handlerUpdateClick(e)}>Editar</button>
                                            <button className='btn btn-danger ms-2' onClick={() => handlerDelete(e.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            ) : (<><><tr><th colSpan={2}></th></tr></></>)}
                    </tbody>
                </table>

            </div>
        </div >
    )
}

export default FormularioParametro