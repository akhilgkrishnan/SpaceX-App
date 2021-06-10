import React from 'react';
import './index.scss'
function ListLaunches(props) {
  return (
    <React.Fragment>
      {
        props.launches.map((launch, key) => {
          var launch_status;
          if (launch.upcoming) {
            launch_status = 'Upcoming'
          } else {
            if (launch.launch_success) {
              launch_status = 'Success'
            } else {
              launch_status = 'Failed'
            }
          }
          return (
            <tr key={key}>
              <td>{launch.flight_number}</td>
              <td>{new Date(launch.launch_date_utc).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}</td>
              <td>{launch.launch_site.site_name}</td>
              <td>{launch.mission_name}</td>
              <td>{launch.rocket.second_stage.payloads[0].orbit}</td>
              <td><div className="badge"><div className={'mission-status ' + launch_status.toLowerCase()}>{launch_status}</div></div></td>
              <td>{launch.rocket.rocket_name}</td>
            </tr>
          )
        })
      }
    </React.Fragment>
  )
}

export default ListLaunches;
