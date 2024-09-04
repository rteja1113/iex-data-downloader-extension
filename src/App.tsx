import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import DownloadButton from "./components/DownloadButton";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="card">
        <DownloadButton />
      </div>
    </QueryClientProvider>
  );
}

export default App;
