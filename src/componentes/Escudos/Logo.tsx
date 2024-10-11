import React from "react";

interface UnpProps {
  size: string;
  src: string;
  alt: string;
}

const Unp: React.FC<UnpProps> = ({ size, src, alt }) => {
  return <img style={{ width: size }} src={src} alt={alt} />;
};

export default Unp;
