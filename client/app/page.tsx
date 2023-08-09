import TodoLanding from "./TodoLanding"

const Home = () => {
  return (
    <div>
      <h1 className='text-4xl p-5'>Task</h1>
      <section className="flex items-center justify-center h-80">
      <TodoLanding></TodoLanding>
    </section>
    </div>
    
  )
}

export default Home