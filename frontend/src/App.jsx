import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      {
        <div className="App">
          <NavBar />
        </div>
      }
    </BrowserRouter>
  );
}

export default App;
