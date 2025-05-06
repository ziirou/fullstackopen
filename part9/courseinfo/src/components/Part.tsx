import type { CoursePart } from "../types";

interface PartProps {
  part: CoursePart;
}

/* Helper function for exhaustive type checking */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><em>{part.description}</em></div>
        </div>
      );
    case "group":
      return (
        <div>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>project exercises {part.groupProjectCount}</div>
        </div>
      );
    case "background":
      return (
        <div>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><em>{part.description}</em></div>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><em>{part.description}</em></div>
          <div>required skills: {part.requirements.join(", ")}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
