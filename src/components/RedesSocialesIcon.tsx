import React from "react";
import { IconBaseProps } from "react-icons/lib";

interface SocialIconProps {
  color: string;
  IconComponent: React.ComponentType<IconBaseProps>;
}

const RedesSocialesICon: React.FC<SocialIconProps> = ({
  color,
  IconComponent,
}) => {
  const style = {
    backgroundColor: color,
    width: "43px",
    height: "43px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    marginRight: "4px",
    marginLeft: "4px",
  };

  return (
    <div style={style}>
      <IconComponent size={"1.5em"} color="#FFF" />
    </div>
  );
};

export default RedesSocialesICon;
