# PTOOGH_PROJECT

Այս նախագիծը բաղկացած է backend (Node.js/Express, MySQL) և frontend (React) մասերից։

## Նախագծի կառուցվածք

```
PTOOGH_PROJECT/
│
├── backend/                    # Backend (Node.js/Express, MySQL)
│   ├── node_modules/           # Backend dependencies
│   ├── add_phone_column.js     # Օգնական script՝ բազայում phone դաշտ ավելացնելու համար
│   ├── index.js                # Գլխավոր backend server ֆայլ (API-ներ, auth, profile)
│   ├── package.json            # Backend-ի dependency-ները
│   ├── package-lock.json       # Backend dependency lock
│   └── ptoogh_db.sql           # Բազայի կառուցվածքի և նախնական տվյալների SQL ֆայլ
│
├── node_modules/               # Frontend dependencies
├── public/                     # Հասարակական ֆայլեր (օրինակ՝ favicon, նկարներ)
│
├── src/                        # Frontend (React)
│   ├── component/              # Բոլոր React կոմպոնենտները
│   │   ├── aboutComponent/         # "Մեր մասին" էջի կոմպոնենտներ
│   │   ├── blocComponent/          # Բլոգի կոմպոնենտներ
│   │   ├── cssComponent/           # CSS ֆայլեր ըստ կոմպոնենտների
│   │   ├── footerComponent/        # Footer կոմպոնենտ
│   │   ├── hedercomponent/         # Header կոմպոնենտ
│   │   ├── imgComponent/           # Նկարներ (լոգո, թիմ, ապրանքներ)
│   │   ├── mainPageComponent/      # Գլխավոր էջի կոմպոնենտներ
│   │   ├── productListComponent/   # Ապրանքների ցուցակի կոմպոնենտներ
│   │   ├── LoginDialog.jsx         # Մուտքի/գրանցման popup կոմպոնենտ
│   │   ├── LoginPage.jsx           # Մուտքի էջ
│   │   ├── LogoutPage.jsx          # Դուրս գալու էջ
│   │   ├── ProfilePage.jsx         # Անձնական տվյալների էջ
│   │   └── RegisterPage.jsx        # Գրանցման էջ
│   │
│   ├── App.jsx                 # Հիմնական React App կոմպոնենտ
│   ├── i18n.js                 # Բազմալեզու (i18n) կոնֆիգուրացիա
│   ├── index.css               # Հիմնական CSS
│   └── main.jsx                # React-ի մուտքային ֆայլ (entry point)
│
├── .gitignore                  # Git-ի համար անտեսվող ֆայլերի ցանկ
├── eslint.config.js            # ESLint կոնֆիգուրացիա
├── index.html                  # Հիմնական HTML ֆայլ (React-ի համար)
├── package.json                # Frontend-ի dependency-ները
├── package-lock.json           # Frontend dependency lock
└── README.md                   # Նախագծի նկարագրություն (այս ֆայլը)
```

## Ամենակարևոր ֆայլերի բացատրություն

- **backend/index.js** — Express backend, API-ներ, auth, profile, գրանցում, մուտք, բազայի հետ կապ։
- **backend/ptoogh_db.sql** — Բազայի աղյուսակների կառուցվածք և նախնական տվյալներ։
- **src/component/** — Բոլոր React կոմպոնենտները ըստ էջերի և ֆունկցիոնալության։
- **src/i18n.js** — Բազմալեզու թարգմանությունների կոնֆիգ (react-i18next)։
- **src/main.jsx** — React հավելվածի մուտքային ֆայլ, այստեղից է սկսվում հավելվածը։
- **src/App.jsx** — Հիմնական App կոմպոնենտ, որտեղ հավաքվում են բոլոր էջերը։
- **public/** — Հասարակական ֆայլեր, որոնք անմիջապես հասանելի են (օրինակ՝ favicon)։
- **index.html** — React-ի համար հիմնական HTML ֆայլ։

---

Այս կառուցվածքը շատ հստակ է, և ցանկացած նոր մարդ, ով բացի նախագիծը, անմիջապես կհասկանա՝ որտեղ ինչ է գտնվում և ինչի համար է։
