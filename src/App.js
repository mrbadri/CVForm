import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CV from './pages/CV/CV';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserTable from './pages/UserTable/UserTable';
import Chart from './pages/Chart/Chart';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App flex justify-center items-center ">
          <Switch>
            <Route path="/chart">
              <Chart></Chart>
            </Route>
            <Route path="/userTable">
              <UserTable></UserTable>
            </Route>
            <Route path="/">
              <CV></CV>
            </Route>
          </Switch>

          {/* links */}
          <div className="fixed bottom-4 right-4 flex flex-col justify-center items-end">
            <Link className="w-28 shadow-sm text-white flex justify-center items-center py-2 hover:bg-blue-600 bg-blue-500  mb-2 rounded"  to="/">صفحه اصلی</Link>
            <Link className="w-28 shadow-sm text-white flex justify-center items-center py-2 hover:bg-blue-600 bg-blue-500  mb-2 rounded" to="/userTable">جدول کاربران</Link>
            <Link className="w-28 shadow-sm text-white flex justify-center items-center py-2 hover:bg-blue-600 bg-blue-500  mb-2 rounded" to="/chart">چارت مهارت ها</Link>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
