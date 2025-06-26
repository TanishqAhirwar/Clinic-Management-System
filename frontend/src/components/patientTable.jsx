const PatientTable = ({ patients }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Age</th>
            <th className="px-4 py-2 border-b">Gender</th>
            <th className="px-4 py-2 border-b">Phone</th>
            <th className="px-4 py-2 border-b">Diagnose</th>
            <th className="px-4 py-2 border-b">Medical History</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{patient.name}</td>
              <td className="px-4 py-2 border-b">{patient.age}</td>
              <td className="px-4 py-2 border-b">{patient.gender}</td>
              <td className="px-4 py-2 border-b">{patient.phone}</td>
              <td className="px-4 py-2 border-b">{patient.diagnose}</td>
              <td className="px-4 py-2 border-b">{patient.MedicalHistory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;