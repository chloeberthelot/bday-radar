export function daysUntilBirthday(dob) {
  const [, month, day] = dob.split("-").map(Number);
  const today = new Date();
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  let next = new Date(today.getFullYear(), month - 1, day);
  if (next < todayMidnight) {
    next = new Date(today.getFullYear() + 1, month - 1, day);
  }

  const diffMs = next - todayMidnight;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}
