const OnlineUsers = ({ amountOnline }) => {
  return (
    <div
      className="flex"
      style={{
        justifyContent: "left",
      }}
    >
      <div
        style={{
          minHeight: "10px",
          minWidth: "10px",
          backgroundColor: "#21B042",
          borderRadius: "99px",
          marginRight: "5px",
        }}
      ></div>
      <p style={{ fontSize: "14px" }}>
        {" "}
        <span style={{ fontWeight: "600" }}>
          {" "}
          {amountOnline} users are currently online{" "}
        </span>{" "}
        and ready to be conversated with!
      </p>
    </div>
  );
};

export default OnlineUsers;
