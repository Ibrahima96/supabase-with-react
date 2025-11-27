import { useState } from "react";
import supabase from "../supabase-client";
import { toast } from "react-toastify";

const Form = ({ rows, onInsert }) => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const newDeal = {
      name: formData.get("name"),
      value: Number(formData.get("value")),
    };

    try {
      //INSERTION
      const { error } = await supabase
        .from("sales_deals")
        .insert(newDeal);

      if (error) throw error;

      toast.success("Solde enregistré avec succès !");
      e.target.reset(); // reset form
      onInsert?.(); // refresh parent si besoin

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center gap-10 px-8 flex-col md:flex-row mt-5">

        <input
          type="text"
          defaultValue={rows?.[0]?.name}
          name="name"
          className="input w-full px-4 md:inline-block"
        />

        <input
          type="number"
          defaultValue={rows?.[0]?.value}
          name="value"
          className="input w-full px-4 md:inline-block py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary py-2"
        >
          {loading ? "Loading..." : "Add"}
        </button>

      </div>
    </form>
  );
};

export default Form;
