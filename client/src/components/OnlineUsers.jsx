const OnlineUsers = ({ amountOnline }) => {
  return (
    <div
      className="flex"
      style={{
        justifyContent: "left",
        marginTop: "-55px",
        marginBottom: "60px",
      }}
    >
      <div
        style={{
          height: "10px",
          width: "10px",
          backgroundColor: "#21B042",
          borderRadius: "99px",
          marginRight: "5px",
        }}
      ></div>
      <p style={{ fontSize: "14px" }}>
        {" "}
        <span style={{ fontWeight: "600" }}>
          {" "}
          {amountOnline} users are currently live{" "}
        </span>{" "}
        and ready to be conversated with!
      </p>
    </div>
  );
};

export default OnlineUsers;