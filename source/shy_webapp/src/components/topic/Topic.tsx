"use client";

import React from "react";
import { shyApi2 } from "@taigalabs/shy-api-js";
import Spinner from "@taigalabs/prfs-react-lib/src/spinner/Spinner";
import { useRouter } from "next/navigation";
import { useQuery } from "@taigalabs/prfs-react-lib/react_query";
import { useRerender } from "@taigalabs/prfs-react-lib/src/hooks/use_rerender";

import styles from "./Topic.module.scss";
import { useSignedInShyUser } from "@/hooks/user";
import {
  InfiniteScrollMain,
  InfiniteScrollRight,
  InfiniteScrollWrapper,
  InfiniteScrollInner,
  InfiniteScrollLeft,
} from "@/components/infinite_scroll/InfiniteScrollComponents";
import GlobalHeader from "@/components/global_header/GlobalHeader";
import ChannelMeta from "@/components/channel/ChannelMeta";
import Loading from "@/components/loading/Loading";
import { useHandleScroll } from "@/hooks/scroll";
import TopicContent from "./TopicContent";
import PostList from "@/components/post_list/PostList";

const Topic: React.FC<TopicProps> = ({ topicId, channelId, subChannelId }) => {
  const parentRef = React.useRef<HTMLDivElement | null>(null);
  const rightBarContainerRef = React.useRef<HTMLDivElement | null>(null);
  const { isCredentialInitialized, shyCredential } = useSignedInShyUser();
  const router = useRouter();
  const { data: channelData, isFetching: channelDataIsFetching } = useQuery({
    queryKey: ["get_shy_channel"],
    queryFn: async () => {
      return shyApi2({ type: "get_shy_channel", channel_id: channelId });
    },
  });
  const { rerender, nonce } = useRerender();
  const channel = channelData?.payload?.shy_channel;

  const handleScroll = useHandleScroll(parentRef, rightBarContainerRef);

  return (
    <InfiniteScrollWrapper innerRef={parentRef} handleScroll={handleScroll}>
      <GlobalHeader />
      <InfiniteScrollInner>
        <InfiniteScrollLeft>{null}</InfiniteScrollLeft>
        <InfiniteScrollMain>
          {channel ? (
            <>
              <ChannelMeta channel={channel} noDesc noSubChannel small />
              <TopicContent
                topicId={topicId}
                channel={channel}
                rerender={rerender}
                subChannelId={subChannelId}
              />
              <PostList
                parentRef={parentRef}
                channel={channel}
                topicId={topicId}
                subChannelId={subChannelId}
                nonce={nonce}
                rerender={rerender}
              />
              {/* <TopicFooter topicId={topicId} channel={channel} subChannelId={subChannelId} /> */}
            </>
          ) : (
            <Loading centerAlign>
              <Spinner />
            </Loading>
          )}
        </InfiniteScrollMain>
        <InfiniteScrollRight>{null}</InfiniteScrollRight>
      </InfiniteScrollInner>
    </InfiniteScrollWrapper>
  );
};

export default Topic;

export interface TopicProps {
  topicId: string;
  channelId: string;
  subChannelId: string;
}
