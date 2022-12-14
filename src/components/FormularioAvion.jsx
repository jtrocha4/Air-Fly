import React, { useEffect, useState } from 'react'
import axios from '../api';
import Swal from 'sweetalert2'

function FormularioAvion() {

    const [aviones, setAviones] = React.useState([])
    const [form, setForm] = React.useState({
        codigo: "",
        id_tipo_ea: "",
    });
    const [edicion, setEdicion] = React.useState(false)

    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getAviones()
    }, [])

    const getAviones = async () => {
        try {
            const { data } = await axios.post("/avion/getAviones")
            console.log(data)
            setAviones(data)
        } catch (error) {
            console.log(error)
        }
    }

    const create = async (e) => {
        e.preventDefault()
        try {
            if (form.codigo.trim() && form.id_tipo_ea.trim()) {
                await axios.post("/avion/", form)
                getAviones()
                setForm({ codigo: "", id_tipo_ea: "" })
                setEdicion(false)
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
                await axios.put(`/avion/${form.updateId}`, {
                    codigo: form.codigo,
                    id_tipo_ea: form.id_tipo_ea
                })
                getAviones();
                setForm({ codigo: "", id_tipo_ea: "" });
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/avion/${id}`, {});
            getAviones();
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Los datos se han eliminado exitosamente',
            })
        } catch (error) {
            console.log(error)
        }
    };

    const handleUpdateClick = (data) => {
        setForm({ updateId: data.id, codigo: data.codigo, id_tipo_ea: data.id_tipo_ea })
        setEdicion(true)
    }

    const cancelar = () => {
        setForm({ codigo: "", id_tipo_ea: "" })
        setEdicion(false)
    }

    return (
        <div className='container'>
            <div className="col mt-2">
                <h4 className='text-center'>Registro de Avion</h4>
                <form action="" onSubmit={(edicion) ? (update) : (create)}>
                    <div className='mb-3'>
                        <label htmlFor="codigo" className='form-label'>Codigo</label>
                        <input type="text" className='form-control' name='codigo' id='codigo' value={form.codigo} onChange={onInputChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="tipoAvion" className='form-label'>Tipo de avion</label>
                        <input type="text" className='form-control' name='id_tipo_ea' id='tipoAvion' value={form.id_tipo_ea} onChange={onInputChange} />
                    </div>
                    <button className='btn btn-primary'>{(edicion) ? (<>Editar</>) : (<>Crear</>)}</button>
                    <button type='button' className='btn btn-secondary ms-2' onClick={() => cancelar()}>Cancelar</button>
                </form>

                <br />
                <hr />

                <table className='table table-bordered'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope='col' className='text-center'>Codigo</th>
                            <th scope='col' className='text-center'>Tipo de avion</th>
                            <th scope='col' className='text-center'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aviones.length > 0 ?
                            (
                                <>{aviones.map((e, index) => (
                                    <tr key={`e${index}`}>
                                        <td className='text-center'>{e.codigo}</td>
                                        <td className='text-center'>{e.id_tipo_ea}</td>
                                        <td className='text-center'>
                                            <button className='btn btn-warning' onClick={() => handleUpdateClick(e)}>Editar</button>
                                            <button type='button' className='btn btn-danger ms-2' onClick={() => handleDelete(e.id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}</>
                            ) : (<><tr><th colSpan={2}></th></tr></>)}
                    </tbody>
                </table>

            </div>
        </div >
    )
}

export default FormularioAvion