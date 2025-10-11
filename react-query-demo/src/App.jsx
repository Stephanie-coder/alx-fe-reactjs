import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostsComponent from './components/PostsComponent'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Advanced Data Handling with React Query</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  )
}

export default App
