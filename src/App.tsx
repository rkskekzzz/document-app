import { AppProvider, ToastProvider } from '@channel.io/bezier-react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './page/Search'

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <Search />
        {/* <BrowserRouter>
        <Routes>
          <Route
            path=""
            element={<Search />}
          />
        </Routes>
        </BrowserRouter> */}
      </ToastProvider>
    </AppProvider>
  )
}

export default App
