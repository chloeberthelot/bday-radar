import { daysUntilBirthday } from "../utils/birthday";
import "../css/BirthdayList.css";

function BirthdayList({ people, onDelete }) {
  const sortedPeople = [...people].sort(
    (a, b) => daysUntilBirthday(a.dob) - daysUntilBirthday(b.dob),
  );
  return (
    <ul className="birthday-list">
      {sortedPeople.map((person) => {
        const days = daysUntilBirthday(person.dob);
        const isToday = days === 0;
        const isSoon = days > 0 && days <= 7;

        return (
          <li
            key={person.id}
            className={`birthday-item ${isToday ? "today" : ""} ${isSoon ? "soon" : ""}`}
          >
            {person.name} fête son anniversaire dans {days} jours 🎉{" "}
            <button className="delete-btn" onClick={() => onDelete(person.id)}>
              Supprimer
            </button>
          </li> /*pourquoi une fonction fléchée et pas juste onClick={onDelete(person.id)} ? Parce que la seconde forme appellerait immédiatement onDelete au moment du rendu (pour chaque personne, tout de suite), au lieu d'attendre le clic*/
        );
      })}
    </ul>
  );
}

export default BirthdayList;
