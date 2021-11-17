import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Rename from "./components/rename";

function App() {
  return (
    <div className="App">
      <Rename />
      <h1>This is a basic functioning MERN app compatible with Heroku</h1>
      <h5>Rename models, components, and title</h5>
      <h5>
        Change mongodb string in .env file, and upload mongodb connection string
        to the heroku dyno you're using.
      </h5>
    </div>
  );
}

export default App;
