import React from 'react';
import './index.scss'

function Loader() {
  return (
    <>
      <tr className="tr-loader"><td className="td-loader" colSpan="7" rowSpan="12"><div className="loading"><div className="loader">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div></div></td></tr>
    </>
  );
}

export default Loader;