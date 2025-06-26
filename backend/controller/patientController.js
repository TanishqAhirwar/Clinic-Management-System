const Patient = require("../model/patientModel");
const ApiResponse = require("../response/pattern");

async function addPatients(req, res) {
  const { name, age, diagnose, gender, phone } = req.body;
  try {
    let patient = await Patient.create({
      name,
      age,
      diagnose,
      gender,
      phone,
      receptionist: req.user._id,
      clinic: req.user.clinic,
    });

    if (!patient) {
      return res.json(new ApiResponse(false, null, "patient not register"));
    }

    return res.json(
      new ApiResponse(true, patient, "patient registered successfully")
    );
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
}

async function getMyPatients(req, res) {
  try {
    let patients;

    if (req.user.role === "Doctor") {
      patients = await Patient.find(); // Doctor can view all patients
    } else if (req.user.role === "Receptionist") {
      patients = await Patient.find({ receptionist: req.user._id }); // Only own patients
    } else {
      return res
        .status(403)
        .json(new ApiResponse(false, null, "Access Denied"));
    }

    if (!patients || patients.length === 0) {
      return res.json(new ApiResponse(false, [], "No patients found"));
    }

    return res.json(new ApiResponse(true, patients, "Success"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(false, null, error.message));
  }
}


const getPatientsByClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;

    const patients = await Patient.find({ clinic: clinicId });

    if (!patients || patients.length === 0) {
      return res.json(new ApiResponse(true, [], "No patients found"));
    }

    return res.json(new ApiResponse(true, patients, "Patients fetched successfully"));
  } catch (error) {
    console.error(error);
    return res.json(new ApiResponse(false, null, error.message));
  }
};


module.exports = { addPatients, getMyPatients, getPatientsByClinic };
