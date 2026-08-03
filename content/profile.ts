export const profile = {
  name: "Mohamed Ben Yahmed",

  professionalStartDate: new Date("2022-01-15"),

  /**
   * Profil LinkedIn principal.
   * Utilisé par le Hero, Contact et les futurs boutons sociaux.
   */
  linkedin: "https://www.linkedin.com/in/mohamed-ben-yahmed-77175420a",

  /**
   * Dépôt GitHub principal.
   * Utilisé par le Hero et les futurs liens vers les projets.
   */
  github: "https://github.com/BenYah10",

  /**
   * Adresse professionnelle.
   * Utilisée pour le bouton "Email me".
   */
  email: "benyahmed.mohamed17@Gmail.com",
};

export function getYearsOfExperience(startDate: Date): number {
  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();

  const anniversaryPassed =
    today.getMonth() > startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() &&
      today.getDate() >= startDate.getDate());

  if (!anniversaryPassed) {
    years--;
  }

  return years;
}