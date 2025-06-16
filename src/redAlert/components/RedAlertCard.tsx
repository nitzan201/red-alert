import { useRedAlert } from "../useRedAlert";

export const ReaAlertCard = () => {
  const { activeLoop, setActiveLoop, alertsData } = useRedAlert();

  return (
    <>
      <div className="absolute left-4 top-4 bg-amber-950 text-white p-6 rounded-xl shadow-lg w-64">
        <h2 className="text-lg font-semibold mb-4">Red Alert System</h2>
        <p className="mb-4">
          Status:{" "}
          <span
            className={`font-bold ${
              activeLoop ? "text-green-400" : "text-red-400"
            }`}
          >
            {activeLoop ? "Active" : "Inactive"}
          </span>
        </p>
        <button
          onClick={() => setActiveLoop((prev) => !prev)}
          className="w-full bg-amber-700 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {activeLoop ? "Stop Alerts" : "Start Alerts"}
        </button>
      </div>

      <div className="absolute right-4 top-4 bg-amber-950 text-white p-6 rounded-xl shadow-lg w-72">
        <h2 className="text-lg font-semibold mb-2">{alertsData[0]?.title}</h2>

        <div className="overflow-y-auto max-h-[40rem] pr-1 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-amber-950 space-y-2">
          {alertsData[0]?.alarmCites.map((city) => (
            <div
              key={city.label_he}
              className="bg-amber-700/40 px-3 py-1 rounded-md text-right"
              dir="rtl"
            >
              {city.label_he}
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-right" dir="rtl">
          {alertsData[0]?.desc}
        </div>
        <div className="mt-4 text-sm text-right" dir="rtl">
          {alertsData[0]?.timeStamp &&
            new Date(alertsData[0]?.timeStamp).toLocaleString()}
        </div>
      </div>
    </>
  );
};
