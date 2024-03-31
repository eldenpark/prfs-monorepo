import React from "react";
import { ShyChannel } from "@taigalabs/shy-entities/bindings/ShyChannel";
import Link from "next/link";

import styles from "./ChannelRow.module.scss";
import { paths } from "@/paths";

const ChannelRow: React.FC<RowProps> = ({ channel }) => {
  return (
    <Link href={`${paths.c}/${channel.channel_id}`}>
      <div className={styles.wrapper}>
        <div className={styles.labelRow}>
          <span className={styles.label}>{channel.label}</span>
          <span className={styles.locale}>{channel.locale}</span>
        </div>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: channel.desc,
          }}
        />
      </div>
    </Link>
  );
};

export default ChannelRow;

export interface RowProps {
  channel: ShyChannel;
}
