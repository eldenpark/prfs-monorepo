"use client";

import React from "react";
import { useRouter } from "next/navigation";

import styles from "./Home.module.scss";
import { useSignedInShyUser } from "@/hooks/user";
import { paths } from "@/paths";
import { useIsFontReady } from "@/hooks/font";
import Loading from "@/components/loading/Loading";
import Channels from "@/components/channels/Channels";

const Home: React.FC<HomeProps> = () => {
  const isFontReady = useIsFontReady();
  const { isCredentialInitialized, shyCredential } = useSignedInShyUser();
  const router = useRouter();

  React.useEffect(() => {
    if (isCredentialInitialized && !shyCredential) {
      router.push(`${paths.account__sign_in}`);
    }
  }, [isCredentialInitialized, router, shyCredential]);

  return isFontReady && shyCredential ? (
    <Channels />
  ) : (
    <>
      <Loading />
      <span className={styles.fontLoadText} />
    </>
  );
};

export default Home;

export interface HomeProps {}
