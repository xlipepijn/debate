const OnlineUsers = ({ amountOnline }) => {
  return (
    <div style={{marginTop:'5px'}}>
      <div
        className="flex online-users-container"
        style={{
          justifyContent: "left",
        }}
      >
        
        <div className="pointer-online-users-container"></div>
        
        <div className='flex' style={{zIndex:'99'}}>
          <div
            style={{
              minHeight: "10px",
              minWidth: "10px",
              backgroundColor: "#21B042",
              borderRadius: "99px",
              marginRight: "5px",
            }}
          ></div>
          <p style={{ fontSize: "14px", color:'white' }}>
            {" "}
            <span style={{ fontWeight: "600", color:'white' }}>
              {" "}
              {amountOnline} users are currently online{" "}
            </span>{" "}
            and ready to be conversated with!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
