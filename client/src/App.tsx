import * as React from 'react';
import './App.css';
import {AppState} from './store';
import {Route} from 'react-router';
import {ReportsContainer} from './components/reports/reports.container';
import {ReportContainer} from './components/report/report.container';
import {Link} from 'react-router-dom';

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Report Ticker</h1>
            <nav>
              <Link to="/" className="text-white">Reports</Link>
            </nav>
        </header>

        <Route path="/" exact={true} component={ReportsContainer} />
        <Route path="/report/:reportId" exact={true} component={ReportContainer} />
      </div>
    );
  }
}

export default App;
