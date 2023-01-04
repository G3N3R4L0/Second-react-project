import './App.scss'
import { About, Footer, Header, Skills, Testimonial, Work } from './container';
import { Navbar } from './componenets';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;
