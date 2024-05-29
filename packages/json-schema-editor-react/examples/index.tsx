import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { JSONSchemaInputDemo } from "./JSONSchemaInputDemo";
import { StartAppDemo } from "./StartAppDemo";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <StartAppDemo />
    <JSONSchemaInputDemo />
  </StrictMode>,
);
