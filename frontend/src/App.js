import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// page and layout imports
import Category from "./pages/Category";
import Homepage from './pages/Homepage';
import ReviewDetails from './pages/ReviewDetails';
import SiteHeader from './components/SiteHeader';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>        
        <div className="App">
          <SiteHeader />
          <Routes>
            {/* There must be 'exact' below due to fact every other route suits to '/' route */}
            <Route exact path='/' element={<Homepage />} /> 
            <Route path='/details/:id' element={<ReviewDetails />} /> 
            <Route path='/category/:id' element={<Category />} /> 
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
