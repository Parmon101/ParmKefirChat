import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from "react-query";

import { Comments } from './components/Comments';

const StyledApp = styled.div`
  text-align: center;
  width: 562px;
  margin: auto;
  `;

function App() {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <StyledApp>
                <Comments />
            </StyledApp>
        </QueryClientProvider>
    );
}

export default App;
