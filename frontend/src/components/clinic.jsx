export default function clinic({ clinics, onClinicClick, selectedId }) {
  return (
    <>
      <div className="flex justify-center">
        {clinics.map((clinic, indx) => (
          <div
            key={clinic._id}
            onClick={() => onClinicClick(clinic)}
            className={`cursor-pointer h-[170px] w-[230px] bg-blue-500 text-white text-3xl flex justify-center items-center rounded-xl shadow-xl/30 ml-5 ${
              selectedId === clinic._id
                ? "bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {clinic.name}
          </div>
        ))}
      </div>
    </>
  );
}
