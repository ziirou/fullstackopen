const H2Header = ({ name }) => {
  console.log('H2Header - name:', name);
  return <h2>{name}</h2>
}

const Part = ({ name, exercises }) => {
  console.log('Part - name:', name, '- exercises:', exercises);
  return <p>{name}: {exercises}</p>
}

const Total = ({ parts }) => {
  console.log('Total - parts:', parts);
  const total = parts.reduce((total_exercises, part) => {
    console.log('Total - total:', total_exercises,
                '- adding exercises from part:', part)
    return total_exercises + part.exercises
  }, 0) // 0 is the initial value
  console.log('Total - total:', total);
  return <p><b>total of {total} exercises</b></p>
}

const Content = ({ parts }) => {
  console.log('Content - parts:', parts);
  return (
    <>
      {parts.map(({ name, exercises, id }) => 
        <Part key={id} name={name} exercises={exercises} />
      )}
      <Total parts={parts} />
    </>
  )
}

const Course = ({ name, parts }) => {
  console.log('Course - name:', name, '- parts:', parts);
  return (
    <>
      <H2Header name={name} />
      <Content parts={parts} />
    </>
  )
}

export default Course
