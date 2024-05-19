import React from "react";
import dayjs from "dayjs";
import { ShyChannel } from "@taigalabs/shy-entities/bindings/ShyChannel";
import { usePrfsI18N } from "@taigalabs/prfs-i18n/react";
import { useRouter } from "next/navigation";
import { Proof } from "@taigalabs/prfs-driver-interface";

import styles from "./Comment.module.scss";
import { CommentWrapper, CommentInner } from "./CommentComponents";
import ContentMarkdown from "@/components/content_markdown/ContentMarkdown";
import CommentMenu from "./CommentMenu";
import CreateComment from "@/components/create_comment/CreateComment";
import { toShortDate } from "@/utils/time";
import ProofImage from "@/components/proof_image/ProofImage";

const Comment: React.FC<PostContentProps> = ({
  topicId,
  channel,
  author_public_key,
  // imgUrl,
  // expression,
  content,
  author_proof_ids,
  // author_proof_identity_inputs,
  updated_at,
  subChannelId,
  handleSucceedPost,
  // proof,
  // proof_type_id,
}) => {
  const i18n = usePrfsI18N();
  const [isCommentActive, setIsCommentActive] = React.useState(false);
  const router = useRouter();

  const handleOpenComment = React.useCallback(() => {
    setIsCommentActive(true);
  }, [setIsCommentActive]);

  const handleClickCancel = React.useCallback(() => {
    setIsCommentActive(false);
  }, [setIsCommentActive]);

  const handleSucceedPostExtended = React.useCallback(() => {
    setIsCommentActive(false);

    if (handleSucceedPost) {
      handleSucceedPost();
    }
    // router.push(`${paths.c}/${channel.channel_id}/${pathParts.t}/${topicId}`);
  }, [handleSucceedPost, setIsCommentActive, router]);

  const publicKey = React.useMemo(() => {
    return author_public_key.substring(0, 8) || "";
  }, [author_public_key]);

  const date = React.useMemo(() => {
    const now = dayjs();
    return toShortDate(updated_at, now);
  }, [updated_at]);

  return (
    <CommentWrapper>
      <CommentInner>
        <div className={styles.meta}>
          <div className={styles.left}>
            <div className={styles.item}>
              <p className={styles.publicKey}>{publicKey}</p>
            </div>
            <div className={styles.item}>
              {/* <ProofDialog */}
              {/*   imgUrl={imgUrl} */}
              {/*   author_proof_ids={author_proof_ids} */}
              {/*   // author_proof_identity_inputs={author_proof_identity_inputs} */}
              {/*   // proof={proof} */}
              {/*   // proof_type_id={proof_type_id} */}
              {/* /> */}
              {/* <div className={styles.proofIdentity}> */}
              {/*   <ProofImage className={styles.proofImage} imgUrl={imgUrl} /> */}
              {/*   <p className={styles.proofIdentityInput}>{author_proof_identity_inputs}</p> */}
              {/* </div> */}
            </div>
          </div>
          <div className={styles.right}>
            <p className={styles.date}>{date}</p>
          </div>
        </div>
        <div className={styles.content}>
          <ContentMarkdown className={styles.content} html={content} />
        </div>
        <CommentMenu
          content={content}
          originalPostAuthorPubkey={publicKey}
          handleClickReply={handleOpenComment}
        />
        {isCommentActive && (
          <CreateComment
            isActive={true}
            handleOpenComment={handleOpenComment}
            handleClickCancel={handleClickCancel}
            channel={channel}
            topicId={topicId}
            handleSucceedPost={handleSucceedPostExtended}
            subChannelId={subChannelId}
          />
        )}
      </CommentInner>
    </CommentWrapper>
  );
};

export default Comment;

export interface PostContentProps {
  author_public_key: string;
  author_proof_ids: string[];
  // author_proof_identity_inputs: string;
  content: string;
  updated_at: string;
  channel: ShyChannel;
  topicId: string;
  handleSucceedPost: React.DispatchWithoutAction;
  subChannelId: string;
  // imgUrl: string;
  // expression: string;
  // proof: Proof;
  // proof_type_id: string;
}
