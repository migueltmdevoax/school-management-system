import { createStudent } from "./studentController.js"

let admissions = []

export const getAdmissions = (req, res) => {
    res.json(admissions)
}

export const createAdmission = (req, res) => {
    const newAdmission = {
        id: Date.now(), 
        status: "pending",
        createdAt: new Date(),
        ...req.body
    }

    admissions.push(newAdmission)
    res.status(201).json(newAdmission)
}

export const updateAdmission = (req, res) => {
    const { id } =req.params

    admissions = admissions.map( a =>
        a.id == id ? {...a, ...req.body} : a 
    )

    res.json({ message: "Updated" })
}

export const deleteAdmission = (req, res) => {
    const { id } = req.params

    admissions = admissions.filter(a => a.id !== Number(id))
    res.json({ message: "Deleted" })
}

export const convertToStudent = (req, res) => {
    const {id} = req.params

    const admission = admissions.find(a => a.id == id)

    if (!admission) {
        return res.status(404).json({ message: "Admission not found" })
    }

    const newStudent = {
        id: Date.now(),
        name: admission.name,
        age: admission.age
    }

    import("../controllers/studentController.js").then(module => {
        module.defaultStudents?.push(newStudent)
    })

    admission.status = "completed"

    res.json({ message: "Converted to student", student: newStudent })
}

