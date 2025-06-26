# 🏥 Clinic Management System – MERN Stack

This is a full-stack **Clinic Management System** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It provides an intuitive interface for doctors and receptionists to manage clinics, patients, and appointments efficiently.

---


## 📝 Overview

This system is designed for:
- A **single doctor** managing **multiple clinics**
- Each clinic has **one receptionist**
- Receptionists handle patient entries and appointments
- The doctor can view **all patients and appointments** across all clinics

---

## 👥 System Roles

### 👨‍⚕️ Doctor
- View all patients from all clinics
- View all appointments

### 👩‍💼 Receptionist (per clinic)
- Register new patients (clinic-specific)
- Book appointments for the doctor
- View clinic-specific data

---

## 🔑 Core Features

- Secure login for doctor and receptionists
- Doctor Dashboard:
  - View all patients
  - View all appointments
- Receptionist Dashboard:
  - Add new patients
  - Book appointments
  - View clinic-specific patient list
- Role-based access control using JWT
- RESTful API integration
- MongoDB-based storage with clinic-patient-appointment relationships

---

## 🛠 Tech Stack

| Technology | Role |
|------------|------|
| MongoDB    | Database |
| Express.js | Backend framework |
| React.js   | Frontend framework |
| Node.js    | Backend runtime |
| JWT        | Authentication |
| Mongoose   | ODM for MongoDB |
| Tailwind CSS / Bootstrap | UI Styling |

---

 

