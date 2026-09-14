import { useState, useEffect } from "react";
import "./App.css";
import BirthdayForm from "./components/BirthdayForm";
import BirthdayList from "./components/BirthdayList";
import "./css/shared.css";

function App() {
  const [people, setPeople] = useState(() => {
    const stored = localStorage.getItem("people");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  function addPerson(person) {
    setPeople([...people, { ...person, id: crypto.randomUUID() }]);
  }
  function deletePerson(id) {
    setPeople(people.filter((person) => person.id !== id));
  }

  return (
    <div className="app">
      <h1>Birthday List</h1>
      <BirthdayForm onAdd={addPerson} />
      <BirthdayList people={people} onDelete={deletePerson} />
    </div>
  );
}

export default App;
