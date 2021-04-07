import { useEffect, useState } from "react";
import { STATIC_ASSETS_URL, API_ENDPOINT_URL } from "../constants/urls";

const useStaticData = () => {
  const [staticData, setStaticData] = useState([]);
  useEffect(() => {
    const main = async () => {
      try {
        const queueResponse = await fetch(`${STATIC_ASSETS_URL}/queues.json`);
        const queuesData = await queueResponse.json();
        setStaticData((prevState) => ({ ...prevState, queuesData }));

        const championsResponse = await fetch(
          `${STATIC_ASSETS_URL}/11.6.1/data/en_US/champion.json`,
        );
        const championsData = await championsResponse.json();
        setStaticData((prevState) => ({ ...prevState, championsData }));

        const summonerResponse = await fetch(
          `${STATIC_ASSETS_URL}/11.6.1/data/en_US/summoner.json`,
        );
        const summonerData = await summonerResponse.json();
        setStaticData((prevState) => ({ ...prevState, summonerData }));

        const runesResponse = await fetch(
          `${STATIC_ASSETS_URL}/11.6.1/data/en_US/runesReforged.json`,
        );
        const runesData = await runesResponse.json();
        setStaticData((prevState) => ({ ...prevState, runesData }));
      } catch (error) {
        console.error("Failed to fetch static data", error);
      }
    };

    main();
  }, []);

  return staticData;
};

export default useStaticData;
