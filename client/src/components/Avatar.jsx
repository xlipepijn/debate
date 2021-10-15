// import face from '../images/face-outline.svg'
import {ReactComponent as Face} from '../images/face-outline.svg'
import {ReactComponent as FaceFill} from '../images/face-fill.svg'
// import faceFill from '../images/face-fill.svg'

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
        <div className={props.noTopFix === true ? "face-avatar" : 'face-avatar no-top'}>
          {/* <img style={{ width: "100%", height: "100%" }} src={face} alt="" /> */}
          <Face fill={props.color3} width='100%'/>
        </div>
        <div
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: props.color1,
          }}
        ></div>
        <div
          style={{
            width: "50%",
            height: "100%",
            backgroundColor: props.color2,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Avatar;
