import { useState, useEffect } from "react";
import "./App.css";
import BirthdayForm from "./components/BirthdayForm";
import BirthdayList from "./components/BirthdayList";
import "./css/shared.css";
import { daysUntilBirthday } from "./utils/birthday";

function App() {
  const [people, setPeople] = useState(() => {
    const stored = localStorage.getItem("people");
    return stored ? JSON.parse(stored) : [];
  });

  const [notif, setNotif] = useState(Notification.permission);
  useEffect(() => {
    if (notif === "granted") {
      const todaysBirthdays = people.filter(
        (person) => daysUntilBirthday(person.dob) === 0,
      );
      todaysBirthdays.forEach((person) => {
        new Notification(`it's ${person.name} birthday today`);
      });
    }
  }, [people, notif]);

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
      <div>
        <button
          onClick={() => {
            Notification.requestPermission().then((permission) => {
              setNotif(permission);
            });
          }}
        >
          Activer les rappels
        </button>
      </div>
    </div>
  );
}

export default App;
