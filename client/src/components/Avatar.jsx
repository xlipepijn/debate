const Avatar = (props) => {
  return (
    <div>
      <div
        className="avatar"
        style={{
          width: props.size,
          height: props.size,
          position: "relative",
        }}
      >
        <div
          style={{ width: "50%", height: "100%", backgroundColor: props.color1 }}
        ></div>
        <div
          style={{ width: "50%", height: "100%", backgroundColor: props.color2 }}
        ></div>
        <div style={{position:'absolute', height:'30%',width:'30%', backgroundColor:props.color3, marginLeft:'35%', marginTop:'35%', borderRadius:'999px'}}></div>
      </div>
    </div>
  );
};

export default Avatar;
