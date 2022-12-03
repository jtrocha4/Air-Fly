import React, { useEffect } from 'react'
import axios from '../api';
import Swal from 'sweetalert2'

function FormularioEmpleado() {
    const [empleados, setEmpleados] = React.useState([])
    const [form, setForm] = React.useState({
        codigo: "",
        nombre: "",
        telefono: "",
        correo: "",
        id_ocupacion_ea: ""
    });

    const [edicion, setEdicion] = React.useState(false)

    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getEmpleados()
    }, [])

    const getEmpleados = async () => {
        try {
            const { data } = await axios.post("/empleado/getEmpleados")
            console.log(data)
            setEmpleados(data)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         if (form.codigo.trim()) {
    //             if (form.updateId) {
    //                 await axios.put(`/empleado/${form.updateId}`, {
    //                     codigo: form.codigo,
    //                     nombre: form.nombre,
    //                     telefono: form.telefono,
    //                     correo: form.correo,
    //                     id_ocupacion_ea: form.id_ocupacion_ea
    //                 });
    //                 getEmpleados();
    //                 setForm({ codigo: "", nombre: "", telefono: "", correo: "", id_ocupacion_ea:"" });
    //             } else {
    //                 await axios.post("/empleado/", form);
    //                 getEmpleados();
    //                 setForm({ codigo: "", nombre: "", telefono: "", correo: "", id_ocupacion_ea:"" });
    //             }
    //         } else {
    //             console.log("Por favor ingrese todos los datos")
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const create = async (e) => {
        e.preventDefault()
        try {
            if (form.codigo.trim() && form.nombre.trim() && form.telefono.trim() && form.correo.trim() && form.id_ocupacion_ea.trim()) {
                await axios.post("/empleado/", form)
                getEmpleados()
                setForm({ codigo: "", nombre: "", telefono: "", correo: "", id_ocupacion_ea: "" })
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
                axios.put(`/empleado/${form.updateId}`, {
                    codigo: form.codigo,
                    nombre: form.nombre,
                    telefono: form.telefono,
                    correo: form.correo,
                    id_ocupacion_ea: form.id_ocupacion_ea
                })
                getEmpleados();
                setForm({ codigo: "", nombre: "", telefono: "", correo: "", id_ocupacion_ea: "" });
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
            await axios.delete(`/empleado/${id}`, {});
            getEmpleados();
            Swal.fire({
                icon: 'success',
                title: 'Exito',
                text: 'Los datos se han eliminado exitosamente',
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateClick = (data) => {
        setForm({ updateId: data.id, codigo: data.codigo, nombre: data.nombre, telefono: data.telefono, correo: data.correo, id_ocupacion_ea: data.id_ocupacion_ea })
        setEdicion(true)
    }

    const cancelar = () => {
        setForm({ codigo: "", nombre: "", telefono: "", correo: "", id_ocupacion_ea: "" })
        setEdicion(false)
    }

    return (
        <div>
            <div className="col mt-2">
                <h4 className='text-center'>Registro de Empleados</h4>
                <form action="" onSubmit={edicion ? (update) : (create)}>
                    <div className='mb-3'>
                        <label htmlFor="codigo" className='form-label'>Codigo</label>
                        <input type="text" className='form-control' name='codigo' id='codigo' value={form.codigo} onChange={onInputChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="nombre" className='form-label'>Nombre</label>
                        <input type="text" className='form-control' name='nombre' id='nombre' value={form.nombre} onChange={onInputChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="telefono" className='form-label'>Telefono</label>
                        <input type="text" className='form-control' name='telefono' id='telefono' value={form.telefono} onChange={onInputChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="correo" className='form-label'>Correo</label>
                        <input type="text" className='form-control' name='correo' id='correo' value={form.correo} onChange={onInputChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="ocupacion" className='form-label'>Ocupacion</label>
                        <input type="text" className='form-control' name='id_ocupacion_ea' id='ocupacion' value={form.id_ocupacion_ea} onChange={onInputChange} />
                    </div>

                    <button className='btn btn-primary'>{edicion ? (<>Editar</>) : (<>Crear</>)}</button>
                    <button type='button' className='btn btn-secondary ms-2' onClick={() => cancelar()}>Cancelar</button>
                </form>

                <br />
                <hr />

                <table className='table table-bordered'>
                    <thead className='table-dark'>
                        <tr>
                            <th scope='col' className='text-center'>Codigo</th>
                            <th scope='col' className='text-center'>Nombre</th>
                            <th scope='col' className='text-center'>Telefono</th>
                            <th scope='col' className='text-center'>Correo</th>
                            <th scope='col' className='text-center'>Ocupacion</th>
                            <th scope='col' className='text-center'>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.length > 0 ?
                            (
                                <>{empleados.map((e, index) => (
                                    <tr key={`e${index}`}>
                                        <td className='text-center'>{e.codigo}</td>
                                        <td className='text-center'>{e.nombre}</td>
                                        <td className='text-center'>{e.telefono}</td>
                                        <td className='text-center'>{e.correo}</td>
                                        <td className='text-center'>{e.id_ocupacion_ea}</td>
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
        </div>
    )
}

export default FormularioEmpleado