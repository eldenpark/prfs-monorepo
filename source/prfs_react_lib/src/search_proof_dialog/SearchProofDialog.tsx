import React from "react";
import cn from "classnames";
import {
  useFloating,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  useId,
  FloatingFocusManager,
  offset,
  autoUpdate,
} from "@floating-ui/react";
import { IoIosSearch } from "@react-icons/all-files/io/IoIosSearch";
import { PrfsProofType } from "@taigalabs/prfs-entities/bindings/PrfsProofType";

import styles from "./SearchProofDialog.module.scss";
import { i18nContext } from "../i18n/i18nContext";
import ProofTypeModal from "./ProofTypeModal";
import CaptionedImg from "../captioned_img/CaptionedImg";

const SearchIcon = () => {
  return (
    <div className={styles.searchIcon}>
      <IoIosSearch />
    </div>
  );
};

const SearchProofDialog: React.FC<SearchProofDialogProps> = ({
  isActivated,
  proofInstanceId,
  proofType,
  handleSelectProofType,
  webappConsoleEndpoint,
}) => {
  const i18n = React.useContext(i18nContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(0)],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
  const headingId = useId();
  const descriptionId = useId();

  const extendedProofTypeClickHandler = React.useCallback(
    (proofType: PrfsProofType) => {
      setIsOpen(false);
      handleSelectProofType(proofType);
    },
    [handleSelectProofType, setIsOpen],
  );

  return (
    <div
      className={cn({
        [styles.wrapper]: true,
        [styles.isActivated]: !!proofType || isActivated,
        [styles.isOpen]: !!isOpen,
      })}
    >
      <button className={styles.button} ref={refs.setReference} {...getReferenceProps()}>
        {proofType ? (
          <div className={styles.proofTypeBtn}>
            <CaptionedImg img_url={proofType.img_url} size={32} />
            <p className={styles.label}>{proofType.label}</p>
            <div className={styles.searchBtn}>
              <IoIosSearch />
            </div>
          </div>
        ) : (
          <div className={styles.placeholderBtn}>
            {isOpen && <SearchIcon />}
            <p className={cn(styles.placeholder, { [styles.proofInstanceId]: proofInstanceId, [inter.] })}>
              {proofInstanceId ?? i18n.find_what_to_prove}
            </p>
            <div className={cn(styles.searchBtn)}>
              <IoIosSearch />
            </div>
          </div>
        )}
      </button>
      {isOpen && (
        <FloatingFocusManager context={context}>
          <div
            className={styles.modalWrapper}
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
            {...getFloatingProps()}
          >
            <ProofTypeModal
              handleSelectVal={extendedProofTypeClickHandler}
              webappConsoleEndpoint={webappConsoleEndpoint}
            />
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
};

export default SearchProofDialog;

export interface SearchProofDialogProps {
  isActivated?: boolean;
  proofInstanceId?: string | undefined;
  proofType: PrfsProofType | undefined;
  handleSelectProofType: (proofType: PrfsProofType) => void;
  webappConsoleEndpoint: string;
}
