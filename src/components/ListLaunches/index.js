import React, { Fragment, useState } from "react";
import "./index.scss";
import LaunchModal from "../LaunchModal";
import Loader from "../Loader";
function ListLaunches(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLaunch, setSelectedLaunch] = useState({});

  const showModal = (modalData) => {
    setSelectedLaunch(modalData);
    setIsOpen(true);
  };
  
  const hideModal = () => setIsOpen(false);
  return (
    <>
      {showModal ? (
        <LaunchModal
          showModal={isOpen}
          closeModal={hideModal}
          data={selectedLaunch}
        />
      ) : null}
      {props.loading ? (
        <Loader />
      ) : (
        <>
          {props.launches.length > 0 ? (
            <>
              {props.launches.map((launch, key) => {
                var launch_status;
                if (launch.upcoming) {
                  launch_status = "Upcoming";
                } else {
                  if (launch.launch_success) {
                    launch_status = "Success";
                  } else {
                    launch_status = "Failed";
                  }
                }
                return (
                  <Fragment key={key}>
                    <tr onClick={() => showModal(launch)}>
                      <td>{launch.flight_number}</td>
                      <td>
                        {new Date(launch.launch_date_utc).toLocaleString(
                          undefined,
                          {
                            dateStyle: "long",
                            timeStyle: "short",
                          }
                        )}
                      </td>
                      <td>{launch.launch_site.site_name}</td>
                      <td>{launch.mission_name}</td>
                      <td>{launch.rocket.second_stage.payloads[0].orbit}</td>
                      <td>
                        <div className="badge">
                          <div
                            className={
                              "mission-status " + launch_status.toLowerCase()
                            }
                          >
                            {launch_status}
                          </div>
                        </div>
                      </td>
                      <td>{launch.rocket.rocket_name}</td>
                    </tr>
                  </Fragment>
                );
              })}
            </>
          ) : (
            <tr className="tr-center">
              <td className="no-data td-center">
                No results found for the specified filter
              </td>
            </tr>
          ) }
        </>
      )}
    </>
  );
}

export default ListLaunches;
