// ─────────────────────────────────────────────────────────────────────────────
// SPEAKERS DATA
// To add a new speaker:
//   1. Drop their photo into /public/images/  (name it e.g. speaker-jane-doe.png)
//   2. Add one entry to the array below
//   3. Save — the Speakers section on the home page and the /speakers page
//      both update automatically
// ─────────────────────────────────────────────────────────────────────────────

export type Speaker = {
  name:    string;
  title:   string;
  org:     string;
  img:     string;     // path from /public  e.g. "/images/speaker-jane-doe.png"
  keynote: boolean;    // true = highlighted as keynote speaker
  topic?:  string;     // optional session topic / talk title
};

export const speakers: Speaker[] = [
  {
    name:    "H.E. Prof. Dr. Pratikno",
    title:   "Coordinating Minister of Human Development and Culture",
    org:     "Republic of Indonesia",
    img:     "/images/speaker-dr-pratikno.png",
    keynote: false,
  },
  {
    name:    "Vivi Yulaswati",
    title:   "Deputy for Economic Affairs and Digital Transformation",
    org:     "BAPPENAS",
    img:     "/images/speaker-vivi-yulaswati.png",
    keynote: false,
  },
  {
    name:    "Wempi Saputra",
    title:   "Executive Director",
    org:     "The World Bank",
    img:     "/images/speaker-wempi-saputra.png",
    keynote: false,
  },
  {
    name:    "Arie Purwanto",
    title:   "Deputy Director of Data Science and Governance",
    org:     "Badan Pemeriksa Keuangan",
    img:     "/images/speaker-arie-purwanto.png",
    keynote: false,
  },
  {
    name:    "Sujala Pant",
    title:   "Deputy Resident Representative",
    org:     "UNDP Indonesia",
    img:     "/images/speaker-sujala-pant.png",
    keynote: false,
  },
  {
    name:    "Eryk Budi Pratama",
    title:   "Vice Chairman of Standing Committee for AI and PDP",
    org:     "Indonesian Chamber of Commerce and Industry (KADIN)",
    img:     "/images/speaker-eryk-pratama.png",
    keynote: false,
  },
  {
    name:    "Sajal Bhatnagar",
    title:   "Chief Digital Officer",
    org:     "PT Allo Bank Indonesia Tbk",
    img:     "/images/speaker-sajal-bhatnagar.png",
    keynote: false,
  },
  {
    name:    "Mark Jefferson Go",
    title:   "Chief Strategy, Research and Development Officer",
    org:     "PT. Erajaya Swasembada, Tbk",
    img:     "/images/speaker-mark-jefferson-go.png",
    keynote: false,
  },
];
