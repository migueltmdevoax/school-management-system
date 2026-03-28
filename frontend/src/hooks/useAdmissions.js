
import { useEffect, useState } from "react"

const API_URL = "http://localhost:3000/api/admissions"

export function useAdmissions() {
    const [admissions, setAdmissions] = useState([])

    const fetchAdmissions = async () => {
        const res = await fetch(API_URL)
        const data = await res.json()
        setAdmissions(data)
    }

    const addAdmission = async (admission) => {
        console.log("SENDING:", admission)

        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(admission)
        })

        fetchAdmissions()
    }

    const deleteAdmission = async (id) => {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        })

        fetchAdmissions()
    }

    const convertAdmission = async (id) => {
        await fetch(`${API_URL}/${id}/convert`, {
            method: "POST"
        })

        fetchAdmissions()
    }

    useEffect(() => {
        fetchAdmissions()
    }, [])

    return {
        admissions,
        addAdmission,
        deleteAdmission,
        convertAdmission
    }
}