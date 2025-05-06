interface TotalProps {
  exercises: number;
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises {props.exercises}
      </p>
    </div>
  );
};

export default Total;
