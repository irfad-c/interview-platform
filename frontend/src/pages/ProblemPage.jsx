import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";

function ProblemPage() {
  const navigate = useNavigate();
  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const { id } = useParams();
  const [output, setOutput] = useState(null);

  const currentProblem = PROBLEMS[currentProblemId];
  if (!currentProblem) {
    return <div>Problem not found</div>;
  }

  const handleProblemChange = (newProblemId) =>
    navigate(`/problem/${newProblemId}`);

  // update problem when URL param changes
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setOutput(null);
    }
  }, [id]);

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left panel- problem desc */}
          <Panel defaultSize={40} minSize={30}>
            {/*We are passing props to the ProblemDescription.jsx page */}
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>
          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
          {/* right panel- code editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Top panel - Code editor */}
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel />
              </Panel>
              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
              {/* Bottom panel - Output Panel*/}
              <Panel defaultSize={30} minSize={30}>
                <OutputPanel />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;
