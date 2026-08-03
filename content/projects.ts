/**
 * États fonctionnels autorisés pour un projet.
 *
 * L'utilisation d'un union type empêche l'ajout accidentel
 * de libellés incohérents dans le catalogue de projets.
 *
 * Toute nouvelle valeur ajoutée ici devra aussi être évaluée
 * dans les composants qui affichent project.status.
 */
export type ProjectStatus =
  | "Completed"
  | "In development"
  | "Product concept"
  | "Live";

/**
 * Médias associés à un projet.
 *
 * image :
 * - visuel utilisé par défaut ;
 * - sert actuellement de source principale sur la Homepage.
 *
 * imageEn et imageFr :
 * - préparent la future localisation des visuels ;
 * - permettent d'afficher une image différente selon la langue ;
 * - restent optionnels pour les projets qui utilisent le même visuel
 *   en français et en anglais.
 *
 * alt :
 * - description textuelle destinée à l'accessibilité ;
 * - doit décrire le contenu utile du visuel, et non son style graphique.
 */
export type ProjectMedia = {
  image: string;
  alt: string;
  imageEn?: string;
  imageFr?: string;
};

/**
 * Contrat de données commun à tous les projets affichés
 * dans la section Selected Work.
 *
 * Centraliser cette structure garantit que ProjectCard et ProjectMedia
 * reçoivent toujours des données cohérentes.
 */
export type Project = {
  /**
   * Nom officiel affiché dans la carte.
   */
  title: string;

  /**
   * Segment utilisé par la route dynamique :
   * /projects/[slug]
   *
   * Cette valeur doit rester identique dans :
   * - ce catalogue ;
   * - le fichier de case study correspondant ;
   * - le registre content/case-studies/index.ts.
   */
  slug: string;

  /**
   * Domaine principal du projet.
   *
   * La catégorie aide le recruteur à identifier rapidement
   * le contexte : produit, données, intelligence artificielle, voyage, etc.
   */
  category: string;

  /**
   * Résumé court affiché directement dans la carte.
   *
   * Il doit expliquer le produit et sa valeur sans reproduire
   * l'ensemble du contenu de l'étude de cas.
   */
  description: string;

  /**
   * Contribution ou rôle principal démontré par le projet.
   */
  role: string;

  /**
   * Niveau d'avancement du projet.
   */
  status: ProjectStatus;

  /**
   * Contrôle l'interactivité de la carte.
   *
   * true :
   * - ProjectCard rend toute la carte sous forme de lien ;
   * - le lien dirige vers /projects/[slug].
   *
   * false :
   * - ProjectCard rend un article statique ;
   * - la carte affiche "Case study coming soon".
   */
  caseStudyAvailable: boolean;

  /**
   * Compétences ou capacités principales démontrées par le projet.
   *
   * Elles sont affichées sous forme de badges dans ProjectCard.
   */
  capabilities: string[];

  /**
   * Détermine si le projet apparaît dans Selected Work.
   *
   * Cette propriété ne désigne pas nécessairement le projet principal.
   * Le projet principal est actuellement déterminé par sa première
   * position dans la liste filtrée.
   */
  featured: boolean;

  /**
   * Média facultatif associé à la carte.
   *
   * L'absence de média est supportée par ProjectMedia et ProjectCard.
   */
  media?: ProjectMedia;
};

/**
 * Catalogue central des projets du portfolio.
 *
 * L'ordre est important :
 * - SelectedWork conserve l'ordre de ce tableau ;
 * - ProjectCard considère le premier projet filtré comme projet principal ;
 * - BlueKioskTech doit donc rester en première position tant qu'il conserve
 *   la grande présentation featured sur la Homepage.
 *
 * Pour ajouter un projet :
 * 1. respecter le contrat Project ;
 * 2. définir un slug unique ;
 * 3. ajouter sa case study au registre si elle est disponible ;
 * 4. définir featured sur true uniquement s'il doit apparaître sur l'accueil ;
 * 5. fournir un texte alternatif précis si un média est ajouté.
 */
export const projects: Project[] = [
  /**
   * Projet principal de la Homepage.
   *
   * BlueKioskTech reçoit une présentation spéciale :
   * - carte sur deux colonnes ;
   * - machine positionnée en absolu ;
   * - traitement d'image avec object-contain ;
   * - priorité de chargement accordée au visuel.
   */
  {
    title: "BlueKioskTech",
    slug: "bluekiosk",
    category: "Product Innovation",
    description:
      "An intelligent self-service bottle sanitization ecosystem combining hygiene, automation and smart kiosk operations for gyms, campuses and workplaces.",
    role: "Product Strategy · Functional Analysis · System Design",
    status: "In development",
    caseStudyAvailable: true,
    capabilities: [
      "Product Discovery",
      "Requirements",
      "System Architecture",
    ],
    featured: true,
    media: {
      /**
       * Les trois propriétés utilisent actuellement le même visuel.
       *
       * imageEn et imageFr pourront recevoir des ressources distinctes
       * lors de l'implémentation du sélecteur global FR / EN.
       */
      image:
        "/images/projects/bluekiosktech/BlueKioskTech-machine-Prod-Innovation-v4.png",
      imageEn:
        "/images/projects/bluekiosktech/BlueKioskTech-machine-Prod-Innovation-v4.png",
      imageFr:
        "/images/projects/bluekiosktech/BlueKioskTech-machine-Prod-Innovation-v4.png",
      alt: "BlueKioskTech self-service bottle sanitization machine",
    },
  },

  /**
   * Projet de Business Intelligence.
   *
   * Le média est affiché dans un cadre 16/9 par ProjectMedia.
   * Le cadrage devra préserver la lisibilité des KPI et du dashboard.
   */
  {
    title: "BIXI Operations Dashboard",
    slug: "bixi-operations-dashboard",
    category: "Data & Business Intelligence",
    description:
      "A Power BI operations dashboard built with real-world mobility data to monitor station availability, identify operational pressure points and support faster decision-making.",
    role: "Data Analysis · BI Modeling · Dashboard Design",
    status: "Completed",
    caseStudyAvailable: true,
    capabilities: [
      "Power BI",
      "Data Modeling",
      "Operational KPIs",
    ],
    featured: true,
    media: {
      image:
        "/images/projects/bixi/BIXI-Operations-Dashboard-v1.png",
      imageEn:
        "/images/projects/bixi/BIXI-Operations-Dashboard-v1.png",
      imageFr:
        "/images/projects/bixi/BIXI-Operations-Dashboard-v1.png",
      alt:
        "BIXI Power BI operations dashboard showing station availability and operational KPIs",
    },
  },

  /**
   * Produit d'apprentissage professionnel assisté par intelligence artificielle.
   *
   * Le titre officiel affiché dans le portfolio est :
   * Executive AI English Coach.
   */
  {
    title: "Executive AI English Coach",
    slug: "executive-ai-english-coach",
    category: "AI Product",
    description:
      "An AI-powered learning platform designed as a scalable product for long-term professional English development.",
    role:
      "AI Product Architecture · Learning Experience · Product Strategy",
    status: "In development",
    caseStudyAvailable: true,
    capabilities: [
      "AI Architecture",
      "Product Governance",
      "UX Strategy",
    ],
    featured: true,
    media: {
      image:
        "/images/projects/executive-english-coach/Executive-English-Coach-Dashboard-v1.png",
      imageEn:
        "/images/projects/executive-english-coach/Executive-English-Coach-Dashboard-v1.png",
      imageFr:
        "/images/projects/executive-english-coach/Executive-English-Coach-Dashboard-v1.png",

      /**
       * TODO — Final content pass:
       * aligner le texte alternatif avec le nom officiel actuel
       * si l'ancienne marque personnelle ne doit plus apparaître.
       */
      alt: "Ben's Executive English Coach AI learning platform",
    },
  },

  /**
   * Concept de produit dédié à l'intelligence de voyage personnalisée.
   *
   * Le projet combine :
   * - Travel DNA ;
   * - scoring de compatibilité ;
   * - aide à la décision ;
   * - composition d'itinéraires.
   */
  {
    title: "TripScore AI",
    slug: "tripscore",
    category: "Travel Product",
    description:
      "A travel decision platform designed to evaluate complete itineraries through transparent scoring and personalized travel profiles.",
    role:
      "Product Discovery · Business Analysis · Experience Design",
    status: "Product concept",
    caseStudyAvailable: true,
    capabilities: [
      "Product Thinking",
      "Scoring Model",
      "Travel UX",
    ],
    featured: true,
    media: {
      image:
        "/images/projects/tripscore/TripScore-AI-Dashboard-v1.png",
      imageEn:
        "/images/projects/tripscore/TripScore-AI-Dashboard-v1.png",
      imageFr:
        "/images/projects/tripscore/TripScore-AI-Dashboard-v1.png",
      alt:
        "TripScore AI travel intelligence dashboard with Travel DNA and compatibility scoring",
    },
  },
];