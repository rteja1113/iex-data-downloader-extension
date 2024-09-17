import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import DownloadForm from "./components/DownloadForm";

function App() {
  return (
    <ChakraProvider>
      <div className="card">
        <DownloadForm></DownloadForm>
      </div>
    </ChakraProvider>
  );
}

export default App;
