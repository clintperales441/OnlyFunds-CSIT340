<<<<<<< HEAD
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      {/* <Register/> */}
=======
import ScrollProgressBar from './pages/ScrollProgressBar';
import Homepage from './pages/Homepage';
import DonationCarousel from './pages/DonationCarousel';
import Footer from './pages/Footer';
function App() {
  return (
    <div className="App">
      <ScrollProgressBar/>
>>>>>>> 5defb87b7a932ebd221e977216034558a354d5bc
      <Homepage/>
      <DonationCarousel/>
      <Footer/>
    </div>
  );
}

export default App;
