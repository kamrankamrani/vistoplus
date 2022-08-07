import { Grid } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import "../../Styles/DotsProgress/dots-progress.css";

interface IProps {
  number: number;
  index: number;
}

export default function DotsProgress(Props: IProps) {
  const [dotsNumber, setDotsNumber] = useState(0);
  const [index, setIndex] = useState(0);
  const [element, setElement] = useState([] as ReactNode[]);

  useEffect(() => {
    if (Props.number) {
      setDotsNumber(Props.number);
    }
    if (typeof Props.index === "number" && Props.index >= 0) {
      setIndex(Props.index);

      for (let i = 0; i < dotsNumber; i++) {
        if (i <= Props.index) {
          document.querySelector(`#dots-${i}`)?.classList.add("selected-dot");
        } else {
          document
            .querySelector(`#dots-${i}`)
            ?.classList.remove("selected-dot");
        }
      }
    }
  }, [Props]);

  useEffect(() => {
    const arr = new Array(dotsNumber) as ReactNode[];
    for (let i = 0; i < dotsNumber; i++) {
      arr.push(
        <Grid
          className={"dots-item " + (i === 0 ? "selected-dot" : "")}
          item
          id={"dots-" + String(i)}
          key={i}
        ></Grid>
      );
    }
    setElement(arr);
  }, [dotsNumber]);

  return (
    <Grid container className="dots-container">
      {element.map((val) => val)}
    </Grid>
  );
}
