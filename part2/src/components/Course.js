const Content = ({ parts }) => {
    const total = parts.reduce(
        (sum, part) => sum + part.exercises
        , 0)

    return (
        <>
            {parts.map((part) =>
                <p key={part.id}>
                    {part.name} {part.exercises}
                </p>
            )}
            <b>total of {total} exercises</b>
        </>
    )
}
const Header = ({ name }) => {
    return (
        <h3>{name}</h3>
    )
}

const Course = ({ courses }) => {
    return (
        <>
            {
                courses.map(
                    course =>
                        <div key={course.id}>
                            <Header name={course.name} />
                            <Content parts={course.parts} />
                        </div>
                )
            }
        </>
    )
}

export default Course;