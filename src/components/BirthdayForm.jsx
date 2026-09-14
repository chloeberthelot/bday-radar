import { useState } from "react";
import "../css/BirthdayForm.css";

function BirthdayForm({ onAdd }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, dob, category });
    setName("");
    setDob("");
    setCategory("");
  };

  return (
    <div>
      <form className="birthday-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Prénom"
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date de naissance"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="family">Famille</option>
          <option value="friend">Ami</option>
          <option value="colleague">Collègue</option>
          <option value="other">Autre</option>
        </select>
        <button className="submit-btn" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default BirthdayForm;
