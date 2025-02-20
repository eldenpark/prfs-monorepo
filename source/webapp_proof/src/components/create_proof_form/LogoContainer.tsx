import React from "react";
import ImageLogo from "@taigalabs/prfs-react-components/src/image_logo/ImageLogo";
import cn from "classnames";

import styles from "./LogoContainer.module.scss";

const LogoContainer: React.FC<LogoContainerProps> = ({ proofTypeChosen }) => {
  return (
    <div className={cn({ [styles.wrapper]: true, [styles.proofTypeChosen]: proofTypeChosen })}>
      <ImageLogo width={proofTypeChosen ? 55 : 140} />
    </div>
  );
};

export default LogoContainer;

export interface LogoContainerProps {
  proofTypeChosen: boolean;
}
