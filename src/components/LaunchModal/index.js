import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'react-bootstrap';
import './index.scss';
import wikipedia from '../../assets/wikipedia.svg';
import youtube from '../../assets/youtube.svg';
import nasa from '../../assets/nasa.svg';


function LaunchModal({ showModal, closeModal, data }) {
  const [modalData, setModalData] = useState({})
  useEffect(() => {
    setModalData(data)
  }, [data])

  var launch_status
  if (modalData.upcoming) {
    launch_status = "Upcoming";
  } else {
    if (modalData.launch_success) {
      launch_status = "Success";
    } else {
      launch_status = "Failed";
    }
  }

  return (
    <>
      {
        Object.keys(modalData).length > 0 ? (
          <>
            <Modal
              show={showModal}
              onHide={closeModal}
              aria-labelledby="contained-modal-title-vcenter"
              dialogClassName="custom-modal"
              centered
            >
              <Modal.Header>
                <div className="modal-label">
                  <img className="launch-image" alt="patch" src={modalData.links.mission_patch_small} />
                  <div className="modal-names">
                    <div className="first-line">
                      <div className="mission-name">{modalData.mission_name}</div>
                      <div className={"mission-status " + launch_status.toLowerCase()} >
                        {launch_status}
                      </div>
                    </div>
                    <div className="rocket-name">{modalData.rocket.rocket_name}</div>
                    <div className="links">
                      <a href={modalData.links.article_link} target="_blank" rel="noreferrer"><img src={nasa} alt="not found" /></a>
                      <a href={modalData.links.wikipedia} target="_blank" rel="noreferrer"><img src={wikipedia} alt="not found" /></a>
                      <a href={modalData.links.video_link} target="_blank" rel="noreferrer"><img src={youtube}  alt="not found"/></a>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn-close close-button" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
              </Modal.Header>
              <p>
                {modalData.details} {modalData.details != null ? (<a href={modalData.links.wikipedia} style={{ 'text-decoration': "none" }}>Wikipedia</a>) : null}
              </p>
              <Table className="modal-table">
                <tbody>
                  <tr>
                    <td> Flight Number </td>
                    <td> {modalData.flight_number} </td>
                  </tr>
                  <tr>
                    <td> Mission Name </td>
                    <td> {modalData.mission_name}  </td>
                  </tr>
                  <tr>
                    <td> Rocket Type </td>
                    <td> {modalData.rocket.rocket_type} </td>
                  </tr>
                  <tr>
                    <td> Rocket Name </td>
                    <td> {modalData.rocket.rocket_name} </td>
                  </tr>
                  <tr>
                    <td> Manufacturer </td>
                    <td> {modalData.rocket.second_stage.payloads[0].manufacturer} </td>
                  </tr>
                  <tr>
                    <td>Nationality </td><td> {modalData.rocket.second_stage.payloads[0].nationality}  </td>
                  </tr>
                  <tr>
                    <td> Launch Date </td>
                    <td>
                      {new Date(modalData.launch_date_utc).toLocaleString(undefined, {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td> Payload Type </td><td> {modalData.rocket.second_stage.payloads[0].payload_type} </td></tr>
                  <tr>
                    <td> Orbit </td>
                    <td> {modalData.rocket.second_stage.payloads[0].orbit} </td>
                  </tr>
                  <tr>
                    <td> Launch Site </td>
                    <td> {modalData.launch_site.site_name} </td>
                  </tr>
                </tbody>
              </Table>
            </Modal>
          </>
        ) : null
      }
    </>
  );
}

export default LaunchModal;