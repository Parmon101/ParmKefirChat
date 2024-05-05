import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from "react-query";

import { Comments } from './pages/Comments';

const StyledApp = styled.div`
    min-width: 272px;
    max-width: 562px;
    width: 100%;
    margin: auto;
    text-align: center;
    font-family: Lato;
`;

const ContentWrapper = styled.div`
  padding: 52px 24px 64px 24px;

  @media screen and (max-width: 562px) {
    padding: 32px 24px 76px 24px;
  }
`;

function App() {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <StyledApp>
                <ContentWrapper>
                    <Comments />
                </ContentWrapper>
            </StyledApp>
        </QueryClientProvider>
    );
}

export default App;
