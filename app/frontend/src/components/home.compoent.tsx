import { useEffect, useMemo, useState } from "react";
import { getMessage } from "../services/horoscopo.service";

function Home() {
  const [data, setData] = useState(null);
  const date: string = "11-11";

  const stringifiedData = useMemo(() => {
    return JSON.stringify(data || {});
  }, [data]);

  useEffect(() => {
    
    getMessage(date).then((res: any) => {
      if (res) {
        setData(res.data);
        console.log(stringifiedData);
        
      }
    });
  }, []);

  return (
    <div>
      <form>
        <span>{stringifiedData}</span>
      </form>
    </div>
  );
}

export default Home;
