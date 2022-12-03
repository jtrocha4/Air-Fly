import React, { useEffect } from 'react'
import axios from '../api'
import Swal from 'sweetalert2'

function FormularioValorParametro() {
    const [edicion, setEdicion] = React.useState(false)
    const [valorparametro, setValorParametro] = React.useState([])
    const [form, setForm] = React.useState({
        nombre: "",
        id_parametro: ""
    })

    useEffect(() => {
        getValorParametro()
    }, [])

    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const getValorParametro = async () => {
        try {
            const { data } = await axios.post("/valorParametro/getValorParametros")
            setValorParametro(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const create = async (e) => {
        e.preventDefault()
        try {
            if (form.nombre.trim() && form.id_parametro.trim()) {
                await axios.post("/valorParametro/", form)
                getValorParametro()
                setEdicion(false)
                setForm({ nombre: "", id_parametro: "" })
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
                await axios.put(`/valorParametro/${form.updateId}`, {
                    nombre: form.nombre,
                    id_parametro: form.id_parametro
                })
                getValorParametro()
                setForm({ nombre: "", id_parametro: "" })
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

    const handlerDelete = async (id) => {
        try {
            await axios.delete(`/valorParametro/${id}`, {})
            getValorParametro()
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
        setForm({ updateId: data.id, nombre: data.nombre, id_parametro: data.id_parametro })
        setEdicion(true)
    }

    const cancelar = async () => {
        setForm({ nombre: "", id_parametro: "" })
        setEdicion(false)
    }

    return (
        <div>

            <h4 className='text-center'>Registro de valor parametro</h4>
            <form action="" onSubmit={(edicion) ? (update) : (create)}>
                <div className='mb-3'>
                    <label htmlFor="nombre" className='form-label'>Nombre</label>
                    <input type="text" className='form-control' name='nombre' id='nombre' value={form.nombre} onChange={onInputChange} />
                </div>

                <div className='mb-3'>
                    <label htmlFor="id_parametro" className='form-label'>Parametro</label>
                    <input type="text" className='form-control' name='id_parametro' id='id_parametro' value={form.id_parametro} onChange={onInputChange} />
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
                        <th scope='col' className='text-center'>Parametro</th>
                        <th scope='col' className='text-center'>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {valorparametro.length > 0 ?
                        (<>
                            {valorparametro.map((e, index) => (
                                <tr key={`e${index}`}>
                                    <td className='text-center'>{e.nombre}</td>
                                    <td className='text-center'>{e.id_parametro}</td>
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
    )
}

export default FormularioValorParametro