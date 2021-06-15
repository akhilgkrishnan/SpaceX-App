import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';
import ListLaunches from '../ListLaunches'
import Header from '../Header'
import axios from 'axios';
import './index.scss';
import Pagination from '../Pagination';
import Filter from '../Filter';

function Dashboard() {
  const launchesPerPage = 12;
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([])
  const [currentLaunches, setCurrentLaunches] = useState([])

  useEffect(() => {
    axios.get("https://api.spacexdata.com/v3/launches")
      .then((response) => {
        setLaunches(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if (launches.length > 0) {
      setLoading(true)
      setTimeout(() => {
        if (filteredLaunches.length > 0) {
          setPageCount(Math.ceil(filteredLaunches.length / launchesPerPage))
          setCurrentLaunches(filteredLaunches)
        }
        setLoading(false)
      }, 300) // For showing the spinner
    }
  }, [filteredLaunches, launches]);

  useEffect(() => {
    if (launches.length > 0) {
      setPageCount(Math.ceil(launches.length / launchesPerPage))
      setCurrentLaunches(launches)
    }
  }, [launches]);

  const filterHandler = (e) => {
    e.preventDefault()
    let selectedFilter = e.target.value;
    let filteredLaunch;
    switch (selectedFilter) {
      case 'upcoming':
        filteredLaunch = launches.filter((launch) =>
          launch.upcoming
        )
        setFilteredLaunches(filteredLaunch)
        break;
      case 'success':
        filteredLaunch = launches.filter((launch) => {
          return launch.launch_success && !launch.upcoming
        })
        setFilteredLaunches(filteredLaunch)
        break;
      case 'failed':
        filteredLaunch = launches.filter((launch) => {
          return !launch.launch_success && !launch.upcoming
        })
        setFilteredLaunches(filteredLaunch)
        break;
      default:
        setFilteredLaunches(launches)
    }
  }

  const changePage = ({ selected }) => setCurrentPage(selected + 1);

  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;

  return (
    <>
      <Header />
      <div className="container">
        <Filter filterHandler={filterHandler} />
        <Card>
          <Table hover>
            <thead>
              <tr>
                <th>No:</th>
                <th>Launched (UTC)</th>
                <th>Location</th>
                <th>Mission</th>
                <th>Orbit</th>
                <th className="text-center">Launch Status</th>
                <th>Rocket</th>
              </tr>
            </thead>
            <tbody>
              <ListLaunches launches={currentLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch)} loading={loading} />
            </tbody>
          </Table>
        </Card>
        <Pagination pageCount={pageCount} handlePageClick={changePage} />
      </div>
    </>
  )
}

export default Dashboard;
