import ReactBSAlert from "react-bootstrap-sweetalert";

const showSuccessAlert = (setAlert, label) => {
  setAlert(null);
  setAlert(
    <ReactBSAlert
      success
      style={{ display: "block", marginTop: "-100px" }}
      title="Success"
      onConfirm={() => setAlert(null)}
      onCancel={() => setAlert(null)}
      confirmBtnBsStyle="success"
      btnSize=""
    >
      {label}
    </ReactBSAlert>
  );
};

const showWarningAlert = (setAlert, label) => {
  setAlert(null);
  setAlert(
    <ReactBSAlert
      error
      style={{ display: "block", marginTop: "-100px" }}
      title="Warning"
      onConfirm={() => setAlert(null)}
      onCancel={() => setAlert(null)}
      confirmBtnBsStyle="success"
      btnSize=""
    >
      {label}
    </ReactBSAlert>
  );
};

export { showSuccessAlert, showWarningAlert };
