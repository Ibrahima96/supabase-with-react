import { useEffect, useState, useMemo } from "react";
import supabase from "../supabase-client";
import { Chart } from "react-charts";
import Form from '../component/Form';
import Header from '../component/Header';

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {

      //RECUPERATION
      const { data, error } = await supabase
        .from("sales_deals")
        .select("name, value");

      if (error) throw error;

      // Défense : s'assurer que value est un nombre
      const normalized = (data || []).map((r) => ({
        name: r.name ?? "unknown",
        value: Number(r.value) || 0,
      }));

      setRows(normalized);
    } catch (e) {
      console.error("Erreur Supabase:", e.message || e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  // --- Aggregation : somme par name ---
  const grouped = useMemo(() => {
    const map = new Map();
    for (const { name, value } of rows) {
      map.set(name, (map.get(name) || 0) + value);
    }
    // Convertir en tableau trié (optionnel : tri décroissant)
    const arr = Array.from(map.entries()).map(([name, sum]) => ({ name, sum }));
    arr.sort((a, b) => b.sum - a.sum);
    return arr;
  }, [rows]);

  // total global
  const totalGlobal = useMemo(
    () => grouped.reduce((acc, g) => acc + g.sum, 0),
    [grouped]
  );

  // chartData pour react-charts
  const chartData = [
    {
      data: grouped.map((g) => ({
        primary: g.name,
        secondary: g.sum,
      })),
    },
  ];

  const primaryAxis = {
    getValue: (d) => d.primary,
    scaleType: "band",
    padding: 0.2,
    position: "bottom",
  };

  function y_max() {
    if (grouped.length > 0) {
      const maxValue = Math.max(...grouped.map((m) => m.sum));
      return maxValue + Math.ceil(maxValue * 0.1); // marge = 10%
    }
    return 100; // fallback
  }

  const secondaryAxes = [
    {
      getValue: (d) => d.secondary,
      scaleType: "linear",
      min: 0,
      max: y_max(),
      padding: { top: 20, bottom: 40 },
    },
  ];

  console.log(rows)
  return (
    <>
      <Header totalGlobal={totalGlobal} />
      <div className="max-w-full p-6">

        <h2 className="text-center mt-6 text-xl font-medium">welcome admin !</h2>

        <div style={{ height: 400, marginTop: 24 }}>
          <Chart
            options={{
              data: chartData,
              primaryAxis,
              secondaryAxes,
              type: "bar",
              // defaultColors: ['#58d675'], // react-charts may ignore this prop depending on version
              tooltip: { show: true },
            }}
          />
        </div>

        {loading && <p className="mt-4">Chargement...</p>}

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Détails</h3>
          <ul>
            {grouped.map((g) => (
              <li key={g.name}>
                {g.name} — {g.sum}
              </li>
            ))}
          </ul>
        </div>
        <Form rows={rows} onInsert={fetchData} />
      </div>
    </>
  );
};

export default Dashboard;
