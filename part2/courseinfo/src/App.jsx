const Header = ({ name }) => {
  console.log('Header - name:', name);
  return <h1>{name}</h1>
}

const Part = ({ name, exercises }) => {
  console.log('Part - name:', name, '- exercises:', exercises);
  return <p>{name}: {exercises}</p>
}

const Content = ({ parts }) => {
  console.log('Content - parts:', parts);
  return (
    <>
      {parts.map(({ name, exercises, id }) => 
        <Part key={id} name={name} exercises={exercises} />
      )}
    </>
  )
}

const Course = ({ course }) => {
  console.log('Course - course:', course);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
