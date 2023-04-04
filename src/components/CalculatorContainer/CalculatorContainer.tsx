import { useCallback, useEffect, useState } from "react";
import "./calculator-container.css";

const operations = ["+", "-", "%"];

const keyBlocks = [
  [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "%" }],
  [{ label: "4" }, { label: "5" }, { label: "6" }, { label: "*" }],
  [{ label: "7" }, { label: "8" }, { label: "9" }, { label: "+" }],
  [{ label: "0", colspan: 2 }, { label: "." }, { label: "=" }],
  [{ label: "RESET", colspan: 3 }],
];

function CalculatorContainer() {
  const [display, setDisplay] = useState("");

  const parseStringToMath = (string: string) =>
    Function(`'use strict'; return (${string})`)();

  function handleClick({ target: { innerHTML: value } }: any) {
    try {
      if (
        operations.includes(value) &&
        (display.charAt(display.length - 1) === value || !display)
      )
        return;
      if (value === "=") return setDisplay(parseStringToMath(display));
      if (value === "RESET") return setDisplay("");
      setDisplay((state) => state + value);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  return (
    <div id="calculator-container">
      <table cellSpacing={27} id="calculator-table">
        <tbody>
          <tr id="display">
            <td colSpan={4}>
              {display.length > 9
                ? `...${display.substring(display.length - 8)}`
                : display}
            </td>
          </tr>
          {keyBlocks.map((row) => (
            <tr>
              {row.map((cell) => (
                <td onClick={handleClick} colSpan={cell?.colspan ?? 1}>
                  {cell.label}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CalculatorContainer;
