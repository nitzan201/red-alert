import { EntityType } from "@/interface/enum";
import { useRedAlert } from "../useRedAlert";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ReaAlertCard = () => {
  const { activeLoop, setActiveLoop, alertsData, toggleEntityVisibility } =
    useRedAlert();

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
          className="w-full bg-amber-700 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-xl transition-colors"
        >
          {activeLoop ? "Stop Alerts" : "Start Alerts"}
        </button>
      </div>

      <div
        className="absolute right-4 top-4 bg-amber-950 text-white p-6 rounded-xl shadow-lg w-fit "
        dir="rtl"
      >
        <h2 className="text-lg font-semibold mb-2">{alertsData[0]?.title}</h2>
        <Tabs className="col">
          <TabsList className="space-x-2">
            {alertsData.map((data, i) => (
              <TabsTrigger
                value={data.id}
                key={data.id}
                className="cursor-pointer border-2 border-accent rounded-xl "
              >
                {i + 1}. {data.title}{" "}
                {new Date(data.timeStamp).toLocaleTimeString()}
              </TabsTrigger>
            ))}
          </TabsList>
          {alertsData.map((data) => (
            <TabsContent value={data.id} id={data.id}>
              <div className="overflow-y-auto max-h-[40rem] pr-1 scrollbar-thin scrollbar-thumb-amber-700 scrollbar-track-amber-950 space-y-2">
                {data.alarmCites.map((city) => (
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
                {data?.desc}
              </div>
              <div
                className="mt-4 text-sm text-right row items-center space-x-2"
                dir="rtl"
              >
                <Checkbox
                  className=""
                  defaultChecked={true}
                  onCheckedChange={(value) => {
                    toggleEntityVisibility(
                      data.id,
                      EntityType.Points,
                      value as boolean
                    );
                    toggleEntityVisibility(
                      data.id,
                      EntityType.Polygon,
                      value as boolean
                    );
                  }}
                />
                <span>Show / Hide</span>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};
