import { useState } from "react";
import axios from "axios";

type CatImage = {
  id: string;
  url: string;
};

const API_URL = "https://api.thecatapi.com/v1/images/search";

function App() {
  const [cat, setCat] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requestWithFetch = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("사진을 불러오지 못했습니다.");
      const data: CatImage[] = await response.json();
      setCat(data[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const requestWithAxios = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get<CatImage[]>(API_URL);
      setCat(response.data[0]);
    } catch {
      setError("사진을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>고양이 짤 불러오기</h1>
      <button onClick={requestWithFetch} disabled={loading}>
        fetch
      </button>
      <button onClick={requestWithAxios} disabled={loading}>
        axios
      </button>

      {loading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}
      {cat && <img src={cat.url} alt="고양이" />}
    </main>
  );
}

export default App;
