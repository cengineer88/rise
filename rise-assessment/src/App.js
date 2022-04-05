import { Suspense } from "react";
import "antd/dist/antd.css";
import Container from "./container";
import { HeaderProvider } from "./contexts/header";

function App() {
  return (
    <div>
      <Suspense fallback>
        <HeaderProvider>
          <Container></Container>
        </HeaderProvider>
      </Suspense>
    </div>
  );
}

export default App;
