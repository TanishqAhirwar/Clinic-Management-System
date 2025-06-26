const Clinic = require('../model/clinicModel')
const ApiResponse = require('../response/pattern')

async function getAllClinics(req, res) {
  try {
    let clinic = await Clinic.find()

    if(!clinic) {
      return res.json(new ApiResponse(false, null, "Clinic not found"));
    }

    return res.json(new ApiResponse(true, clinic, "success"));
    
  } catch (error) {
    console.log(error)
    return res.json(new ApiResponse(false, null, error.message));
  } 
}

const getClinicById = async (req, res) => {
  try {
    const { id } = req.params;  
    const userClinicId = req.user.clinic;  

    const clinic = await Clinic.findById(id); 

    if (!clinic) {
      return res.json(new ApiResponse(false, null, "Clinic not found")); 
    }

    if (clinic._id.toString() !== userClinicId.toString()) {
      return res.json(new ApiResponse(false, null, "Access denied: Not your clinic"));  
    }

    return res.json(new ApiResponse(true, clinic, "Success"));  

  } catch (error) {
    console.log(error);
    return res.json(new ApiResponse(false, null, error.message));  
  }
};


module.exports = {getAllClinics, getClinicById};