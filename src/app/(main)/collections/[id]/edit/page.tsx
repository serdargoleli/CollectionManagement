import React from "react";
import { NAVIGATION } from "@/core/constants/navigation";

import NextLink from "next/link";

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      detay {id}
      <NextLink href={NAVIGATION.HOME}>{NAVIGATION.HOME}</NextLink>
    </div>
  );
};

export default Page;
