import React from "react";
import { ShyChannel } from "@taigalabs/shy-entities/bindings/ShyChannel";
import { DateTimed } from "@taigalabs/shy-entities/bindings/DateTimed";
import { ShyPostSyn1 } from "@taigalabs/shy-entities/bindings/ShyPostSyn1";
import { Dayjs } from "dayjs";

import styles from "./PostRow.module.scss";
import Post from "@/components/post/Post";

const PostRow: React.FC<RowProps> = ({ post, channel, handleSucceedPost, subChannelId }) => {
  return (
    <Post
      topicId={post.inner.shy_post.topic_id}
      channel={channel}
      author_public_key={post.inner.shy_post.author_public_key}
      content={post.inner.shy_post.content}
      author_proof_identity_inputs={post.inner.proof_identity_input}
      updated_at={post.updated_at}
      handleSucceedPost={handleSucceedPost}
      subChannelId={subChannelId}
    />
  );
};

export default PostRow;

export interface RowProps {
  post: DateTimed<ShyPostSyn1>;
  now: Dayjs;
  channel: ShyChannel;
  handleSucceedPost: React.DispatchWithoutAction;
  subChannelId: string;
}
