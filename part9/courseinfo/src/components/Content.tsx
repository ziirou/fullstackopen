import type { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part) =>
        <div key={part.name} style={{ marginBottom: "0.5rem" }}>
          <Part part={part} />
        </div>
      )}
    </div>
  );
};

export default Content;
