import { daysUntilBirthday } from "../utils/birthday";
import "../css/BirthdayList.css";

const CATEGORY_LABELS = {
  family: "Famille",
  friend: "Ami",
  colleague: "Collègue",
  other: "Autre",
};

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
        const category = CATEGORY_LABELS[person.category] ? person.category : "other";

        return (
          <li
            key={person.id}
            className={`birthday-item ${isToday ? "today" : ""} ${isSoon ? "soon" : ""}`}
          >
            <span className={`avatar avatar--${category}`}>
              {person.name.charAt(0).toUpperCase()}
            </span>
            <div className="birthday-info">
              <p className="birthday-name">{person.name}</p>
              <span className={`badge badge--${category}`}>
                {CATEGORY_LABELS[category]}
              </span>
            </div>
            <span
              className={`days-pill ${isToday ? "days-pill--today" : isSoon ? "days-pill--soon" : ""}`}
            >
              {isToday ? "Aujourd'hui 🎉" : `Dans ${days} j`}
            </span>
            <button
              className="delete-btn"
              onClick={() => onDelete(person.id)}
              aria-label={`Supprimer ${person.name}`}
            >
              ✕
            </button>
          </li> /*pourquoi une fonction fléchée et pas juste onClick={onDelete(person.id)} ? Parce que la seconde forme appellerait immédiatement onDelete au moment du rendu (pour chaque personne, tout de suite), au lieu d'attendre le clic*/
        );
      })}
    </ul>
  );
}

export default BirthdayList;
