import React from 'react';
import KanbanBoard from "./pages/KanbanBoard";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <KanbanBoard/>
        </QueryClientProvider>
    );
}

export default App;
