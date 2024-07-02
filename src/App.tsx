import { AppProvider, ToastProvider } from '@channel.io/bezier-react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './page/Search'

declare global {
  interface Window {
    ChannelIOWam?: {
      open: (params: Record<string, any>) => void
      getWamData: (key: string) => any
      close: (params?: Record<string, any>) => void
      setSize: (params: Record<string, any>) => void
      callFunction: (params: Record<string, any>) => Promise<any>
      callNativeFunction: (params: Record<string, any>) => Promise<any>
      callCommand: (params: Record<string, any>) => void
    }
  }
}

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
