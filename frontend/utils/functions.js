export function getMonthName(monthNumber) {
  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  if (monthNumber < 1 || monthNumber > 12) {
    return "Mois invalide";
  }

  return monthNames[monthNumber - 1];
}

export function getDayName(dayNumber) {
  const dayNames = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  if (dayNumber < 1 || dayNumber > 7) {
    return "Jour invalide";
  }

  return dayNames[dayNumber - 1];
}

