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
      <header className="app-header">
        <div className="app-header-text">
          <h1>🎂 Birthday List</h1>
          <p>Ne rate plus jamais un anniversaire.</p>
        </div>
        {notif === "default" ? (
          <button
            className="reminder-btn"
            onClick={() => {
              Notification.requestPermission().then((permission) => {
                setNotif(permission);
              });
            }}
          >
            🔔 Activer les rappels
          </button>
        ) : (
          <span className={`reminder-status reminder-status--${notif}`}>
            {notif === "granted" ? "🔔 Rappels activés" : "🔕 Rappels bloqués"}
          </span>
        )}
      </header>

      <div className="card">
        <h2>Ajouter un anniversaire</h2>
        <BirthdayForm onAdd={addPerson} />
      </div>

      {people.length > 0 ? (
        <BirthdayList people={people} onDelete={deletePerson} />
      ) : (
        <div className="empty-state">
          <span className="emoji">🎉</span>
          <p>Aucun anniversaire pour l'instant. Ajoute quelqu'un pour commencer !</p>
        </div>
      )}
    </div>
  );
}

export default App;
