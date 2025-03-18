const Header = ({ name, type }) => {
  console.log('Header - name:', name, '- type:', type);
  if (type === 1) {
    return <h1>{name}</h1>
  } else if (type === 2) {
    return <h2>{name}</h2>
  } else {
    return <h3>{name}</h3>
  }
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
      <Header name={name} type={2} />
      <Content parts={parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header name={'Web development curriculum'} type={1} />
      {courses.map(({ name, id, parts }) => 
        <Course key={id} name={name} parts={parts} />
      )}
    </div>
  )
}

export default App
