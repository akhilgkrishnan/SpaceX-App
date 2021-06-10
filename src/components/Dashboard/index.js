import React, {useEffect, useState} from 'react';
import { Table, Card } from 'react-bootstrap';
import ListLaunches from '../ListLaunches'
import Header from '../Header'
import axios from 'axios';
import './index.scss';

function Dashboard() {
  const [launches, setLaunches] = useState([]);
  useEffect(() => {
    axios.get("https://api.spacexdata.com/v3/launches").then((response) => {
      setLaunches(response.data)
    })
  }, []);
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="filter">
          <select name="filter" id="filter">
            <option value="all">All Launches</option>
            <option value="upcoming">Upcoming Launches</option>
            <option value="success">Succesful Launches</option>
            <option value="failed">Failed Launches</option>
          </select>
        </div>
        <Card>
          <Table hover>
            <thead>
              <tr>
                <th>No:</th>
                <th>Launched (UTC)</th>
                <th>Location</th>
                <th>Mission</th>
                <th>Orbit</th>
                <th>Launch Status</th>
                <th>Rocket</th>
              </tr>
            </thead>
            <tbody>
              <ListLaunches launches={launches} />
            </tbody>
          </Table>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default Dashboard;
