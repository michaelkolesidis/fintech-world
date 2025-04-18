import "./style/style.css";
import React from "react";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Loading from "./interface/Loading";
import Experience from "./Experience";
import Interface from "./interface/Interface";
import styledLog from "./utils/styledLog";

// Console logs
styledLog(
  "Welcome to Fintech World!",
  "rgb(0, 89, 195)",
  "rgb(255, 255, 255)",
  "22px",
  "600"
);
styledLog("© Michael Kolesidis. All rights reserved.");
styledLog("Licensed under the GNU AGPL");

// Prevent right click
document.addEventListener("contextmenu", (e) => e.preventDefault());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <div className="vignette" />
      <div className="sky" />
      <Interface />
      <Canvas flat shadows>
        <Experience />
      </Canvas>
    </Suspense>
  </React.StrictMode>
);
