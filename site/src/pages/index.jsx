import React, { useState } from "react";
import Search from "../components/Search";
import Result from "../components/Result";


export default function Home() {

    const [output, setOutput] = useState(null);
    const [outputType, setOutputType] = useState(null);

    const handleResult = (inputType, { rawOutput }) => {
        const outputExists = rawOutput[0];
        if (!outputExists) {
            return
        }
        let outputType;
        (inputType === "ZIP" 
            ? outputType = "COORDS"
            : outputType = "ZIP"
        );
        setOutput(rawOutput);
        setOutputType(outputType);
    };

    return (
        <>
    
          <Search
              handleResult={handleResult}
          />

          {output && outputType && (
              <Result
                  output={output}
                  outputType={outputType}
              />
          )}

        </>
    );
    
};
