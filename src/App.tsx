
import './App.css'
import MainLayout from './components/layout/MainLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'

function App() {

  return (
    <>
      {/* <h1>Test</h1> */}
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </>
  )
}

export default App
