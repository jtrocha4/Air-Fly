import React from 'react'

function Formulario() {

    const [dni, setDni] = React.useState("");
    const [primerNombre, setPrimerNombre] = React.useState("");
    const [primerApellido, setPrimerApellido] = React.useState("");
    const [ciudad, setCiudad] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [correo, setCorreo] = React.useState("");

    return (
        <div>
            <div className="col mt-2">

                <h4 className='text-center'>Registro de Socios</h4>

                <form action="">
                    <div className='mb-3'>
                        <label htmlFor="dni" className='form-label'>Numero de identificacion</label>
                        <input type="text" className='form-control' id='dni' value={dni} onChange={(e) => setDni(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="primerNombre" className='form-label'>Primer nombre</label>
                        <input type="text" className='form-control' id='primerNombre' value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="primerApellido" className='form-label'>Primer apellido</label>
                        <input type="text" className='form-control' id='primerApellido' value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="ciudad" className='form-label'>Ciudad</label>
                        <input type="text" className='form-control' id='ciudad' value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='form-label'>Telefono</label>
                        <input type="text" className='form-control' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" className='form-label'>Correo</label>
                        <input type="text" className='form-control' value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Formulario