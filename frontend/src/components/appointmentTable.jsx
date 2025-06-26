 

export default function AppointmentTable({ appointments }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border-collapse border border-gray-300 rounded-lg shadow overflow-x-auto overflow-visible">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Patient</th>
            <th className="px-4 py-2 border">Booked on</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Status</th>
             
          </tr>
        </thead>
        <tbody>
          {appointments?.length > 0 ? (
            appointments.map((apt, index) => (
              <tr
                key={apt._id}
                className="hover:bg-gray-50 transition text-center"
              >
                <td className="px-4 py-2 border ">{index + 1}</td>
                <td className="px-4 py-2 border">
                  {apt.patient?.name || "N/A"}
                </td>

                <td className="px-4 py-2 border">
                  {new Date(apt.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">{apt.time}</td>
                <td className="px-4 py-2 border capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        apt.status === "pending" &&
                        "bg-yellow-100 text-yellow-700"
                      }
                      ${
                        apt.status === "completed" &&
                        "bg-green-100 text-green-700"
                      }
                      ${
                        apt.status === "cancelled" && "bg-red-100 text-red-700"
                      }`}
                  >
                    {apt.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
