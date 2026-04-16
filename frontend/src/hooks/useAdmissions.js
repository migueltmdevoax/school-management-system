
import { useEffect, useState } from "react"

const API_URL = "http://localhost:3000/api/admissions"

export function useAdmissions() {
    const [admissions, setAdmissions] = useState([])

    const fetchAdmissions = async () => {
        try {
            const res = await fetch(API_URL)

            if(!res.ok) {
                throw new Error("Error fetching admissions")
            }

            const data = await res.json()
            setAdmissions(data)
        }   catch (error) {
            console.error("FETCH ADMISSION ERROR:", error)
        }
    }

    const addAdmission = async (admission) => {
        try {
            console.log("SENDING:", admission)

            const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admission)
            })

            if (!res.ok) {
                throw new Error("Addmission was not added")
            }

            await fetchAdmissions()
        }   catch (error) {
            console.error("ADD ADMISSION ERROR:", error)
        }
    }

    const deleteAdmission = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
            })

            if (!res.ok) {
                throw new Error("Addmission was not deleted")
            }

            await fetchAdmissions()
        }   catch (error) {
            console.error("DELETE ADMISSION ERROR:", error)
        }
        
    }

    const convertAdmission = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}/convert`, {
            method: "POST"
        })

        if (!res.ok) {
                throw new Error("Addmission was not converted")
            }

            await fetchAdmissions()
        }   catch (error) {
            console.error("CONVERT ADMISSION ERROR:", error)
        }
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