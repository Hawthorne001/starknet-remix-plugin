import { useState } from "react";

import Interaction from "../../features/Interaction";
import CompileAndDeploy from "../CompileAndDeploy";
import "./styles.css";
import TransactionHistory from "../../features/TransactionHistory";

interface NavProps {}

function Nav(props: NavProps) {
  const [activeTab, setActiveTab] = useState("compile");

  return (
    <div>
      <ul
        className="nav nav-tabs justify-content-center text-center m-0"
        style={{ borderBottom: "none" }}
      >
        <li
          className={`nav-link nav-item flex-fill ${
            activeTab === "compile" ? "active" : ""
          }`}
          onClick={() => setActiveTab("compile")}
        >
          Compile & Deploy
        </li>
        <li
          className={`nav-link nav-item flex-fill ${
            activeTab === "txnHistory" ? "active" : ""
          }`}
          onClick={() => setActiveTab("txnHistory")}
        >
          Transaction History
        </li>
      </ul>
      <div className="tab-content">
        <div
          className={`tab-pane ${activeTab === "compile" ? "active" : ""}`}
          id="compile"
        >
          {activeTab === "compile" && (
            <CompileAndDeploy setActiveTab={setActiveTab} />
          )}
        </div>
        <div
          className={`tab-pane ${activeTab === "txnHistory" ? "active" : ""}`}
          id="txnHistory"
        >
          {activeTab === "txnHistory" && <TransactionHistory />}
        </div>
      </div>
    </div>
  );
}

export default Nav;
