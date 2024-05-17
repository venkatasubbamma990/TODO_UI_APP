import React from 'react';

const ToastMessage = ({ message }) => {
  return (
    <div
      style={{
        height: "100%",
        borderLeft: "5px solid #406882",
        display: "flex",
        alignItems: "center",
        paddingLeft: 5,
        progress: 0.2,
        backgroundColor: "#fff",
        textAlign: "center"
      }}
    >
      <span style={{ color: "#000", fontSize: "17px" }}>{message}</span>
    </div>
  );
};

export default ToastMessage;