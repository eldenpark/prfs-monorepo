"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import { useSearchParams } from "next/navigation";
import Tutorial1MD from "@/markdown/tutorial/tutorial_1.mdx";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

import styles from "./TutorialStepper.module.scss";
import { i18nContext } from "@/contexts/i18n";
import { paths } from "@/paths";
import { useAppSelector } from "@/state/hooks";

const TutorialStepper: React.FC<TutorialStepperProps> = ({
  children,
  steps,
  fullWidth,
  mainAxisOffset,
  crossAxisOffset,
}) => {
  const searchParams = useSearchParams();

  const { refs, floatingStyles, context } = useFloating({
    placement: "top-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: mainAxisOffset || 10,
        crossAxis: crossAxisOffset || 5,
      }),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });

  const isTutorial = React.useMemo(() => {
    if (searchParams.get("tutorial_id")) {
      return true;
    } else {
      return false;
    }
  }, [searchParams]);

  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([focus, dismiss, role]);

  const step = useAppSelector(state => state.tutorial.tutorialStep);

  return isTutorial && steps.includes(step) ? (
    <>
      <div
        className={cn({ [styles.wrapper]: true, [styles.fullWidth]: fullWidth })}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children}
      </div>
      <FloatingPortal>
        <div
          className={styles.tooltip}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        ></div>
      </FloatingPortal>
    </>
  ) : (
    children
  );
};

export default TutorialStepper;

export interface TutorialStepperProps {
  children: React.ReactNode;
  steps: number[];
  fullWidth?: boolean;
  mainAxisOffset?: number;
  crossAxisOffset?: number;
}
