import React from "react";
import { useQuery } from "@taigalabs/prfs-react-lib/react_query";
import { shyApi2 } from "@taigalabs/shy-api-js";
import Spinner from "@taigalabs/prfs-react-lib/src/spinner/Spinner";
import Link from "next/link";

import styles from "./PostContent.module.scss";
import { paths } from "@/paths";
import { toShortDate } from "@/utils/time";
import dayjs from "dayjs";

const PostContent: React.FC<PostContentProps> = ({ postId }) => {
  const { data: postData, isFetching: postDataIsFetching } = useQuery({
    queryKey: ["get_shy_post", postId],
    queryFn: async () => {
      return shyApi2({ type: "get_shy_post", post_id: postId });
    },
  });
  const post = postData?.payload?.shy_post;

  const publicKey = React.useMemo(() => {
    return post?.inner.public_key.substring(0, 10) || "";
  }, [post?.inner.public_key]);

  const date = React.useMemo(() => {
    if (post?.updated_at) {
      const now = dayjs();
      return toShortDate(post?.updated_at, now);
    } else return "";
  }, [post?.updated_at]);

  return (
    <div className={styles.wrapper}>
      {post ? (
        <>
          <div className={styles.title}>{post.inner.title}</div>
          <div className={styles.meta}>
            <div>
              <p className={styles.publicKey}>{publicKey}</p>
              <div>{post.inner.proof_identity_input}</div>
            </div>
            <div>
              <p>{date}</p>
            </div>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: post.inner.content,
            }}
          />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PostContent;

export interface PostContentProps {
  postId: string;
}
