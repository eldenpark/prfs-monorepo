import React from "react";
import { useQuery } from "@taigalabs/prfs-react-lib/react_query";
import { shyApi2 } from "@taigalabs/shy-api-js";
import Spinner from "@taigalabs/prfs-react-lib/src/spinner/Spinner";
import Link from "next/link";
import dayjs from "dayjs";
import { MdGroup } from "@react-icons/all-files/md/MdGroup";

import styles from "./TopicContent.module.scss";
import { paths } from "@/paths";
import { toShortDate } from "@/utils/time";
// import { PostInner } from "./PostComponent";
// import PostMenu from "./TopicMenu";
import { useI18N } from "@/i18n/hook";
import Post from "../post/Post";

const TopicContent: React.FC<PostContentProps> = ({ topicId }) => {
  const i18n = useI18N();
  const { data: postData, isFetching: postDataIsFetching } = useQuery({
    queryKey: ["get_shy_topic", topicId],
    queryFn: async () => {
      return shyApi2({ type: "get_shy_topic", topic_id: topicId });
    },
  });
  const topic = postData?.payload?.shy_topic_syn1;

  // const publicKey = React.useMemo(() => {
  //   return topic?.inner.shy_topic.author_public_key.substring(0, 10) || "";
  // }, [topic?.inner.shy_topic.author_public_key]);

  // const date = React.useMemo(() => {
  //   if (topic?.updated_at) {
  //     const now = dayjs();
  //     return toShortDate(topic?.updated_at, now);
  //   } else return "";
  // }, [topic?.updated_at]);

  return (
    <div className={styles.wrapper}>
      {topic ? (
        <>
          <div className={styles.titleRow}>
            <p className={styles.title}>{topic.inner.shy_topic.title}</p>
            <div className={styles.postMeta}>
              <button className={styles.participants} type="button">
                <MdGroup />
                <span>{i18n.participants}</span>
              </button>
            </div>
          </div>
          <Post
            author_public_key={topic.inner.shy_topic.author_public_key}
            content={topic.inner.shy_topic.content}
            proof_identity_input={topic.inner.proof_identity_input}
            updated_at={topic.updated_at}
          />
          {/* <PostInner> */}
          {/*   <div className={styles.meta}> */}
          {/*     <div className={styles.left}> */}
          {/*       <div className={styles.item}> */}
          {/*         <p className={styles.publicKey}>{publicKey}</p> */}
          {/*       </div> */}
          {/*       <div className={styles.item}> */}
          {/*         <p className={styles.proofIdentityInput}>{topic.inner.proof_identity_input}</p> */}
          {/*       </div> */}
          {/*     </div> */}
          {/*     <div className={styles.right}> */}
          {/*       <p className={styles.date}>{date}</p> */}
          {/*     </div> */}
          {/*   </div> */}
          {/*   <div */}
          {/*     className={styles.content} */}
          {/*     dangerouslySetInnerHTML={{ */}
          {/*       __html: topic.inner.shy_topic.content, */}
          {/*     }} */}
          {/*   /> */}
          {/*   <TopicMenu topicId={topicId} /> */}
          {/* </PostInner> */}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TopicContent;

export interface PostContentProps {
  topicId: string;
}
