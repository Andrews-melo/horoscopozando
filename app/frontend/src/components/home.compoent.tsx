import { useEffect, useMemo, useState } from "react";
import { getMessage } from "../services/horoscopo.service";

function Home() {
  const [data, setData] = useState(null);

  const stringifiedData = useMemo(() => {
    return JSON.stringify(data || {});
  }, [data]);

  useEffect(() => {
    getMessage("09-11").then((res: any) => {
      if(res) {
        console.log(res);
      
        setData(res.data);
      }     
    });
  }, []);

  return <div>{stringifiedData}</div>;
}

export default Home;
