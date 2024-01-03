import { useFetch } from "@/hooks/useFetch";
import { useMemo, useState, useEffect } from "react";

const getSomeData = () => {
  return ["user"];
};

const AboutUsPage = () => {
  const { data } = useFetch(getSomeData);

  const sum = () => {};

  //   console.log(isServer());

  return <div></div>;
};

export default AboutUsPage;
