import { useEffect, useMemo, useState } from "react";
import { getMessage } from "../services/horoscopo.service";

function Home() {
  const [data, setData] = useState(null);
  const date: string = "";

  const stringifiedData = useMemo(() => {
    return JSON.stringify(data || {});
  }, [data]);

  useEffect(() => {
    setData(null);
    getMessage(date).then((res: any) => {
      if (res) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <div>
      <form>
        <input type="text"></input>
      </form>
    </div>
  );
}

export default Home;
