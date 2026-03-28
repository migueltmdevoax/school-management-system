import { useAdmissions } from "../hooks/useAdmissions"
import { useState } from "react"
import StudentForm from "../StudentForm"

export default function AdmissionsPage() {
    const { admissions, addAdmission, deleteAdmission, convertAdmission } = useAdmissions()

    const convert = (id) => {
        convertAdmission(id)
    }

    const [showForm, setShowForm] = useState(false)

    return(
        <div>
            <h1>Admissiones</h1>

            <button onClick={() => setShowForm(!showForm)}>
                + Nueva Admisión
            </button>

            {showForm && (
                <StudentForm
                onAdd={addAdmission}
                existingStudents={admissions}
                buttonText="Crear admisión"
                />
            )}

            {admissions.length === 0 ? (
              <p>No hay admisiones aún</p>
            ) : (
              <table>...</table>
            )}

            <table style= {{ marginTop: "20px", width: "100%"}}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Estado</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {admissions.map(a => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.age}</td>
                            <td>{a.status}</td>
                            <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => deleteAdmission(a.id)}>🗑</button>

                                <button onClick={() => convert(a.id)}>
                                    🎓 Convertir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}