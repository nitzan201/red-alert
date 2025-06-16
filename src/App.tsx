import { CesiumViewerProvider } from "./context/CesiumViewer";
import { ReaAlertCard } from "./redAlert/components/RedAlertCard";

function App() {
  return (
    <CesiumViewerProvider>
      <ReaAlertCard />
    </CesiumViewerProvider>
  );
}

export default App;
