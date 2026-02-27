import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './providers/AppProvider';
import { router } from './routes';

function App() {
  return (
    <AppProvider>
      <div className="bg-background flex min-h-screen flex-col">
        <RouterProvider router={router} />
      </div>
    </AppProvider>
  );
}

export default App;
