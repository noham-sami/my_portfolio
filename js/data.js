// Contenu du portfolio. Tout ce qui est affiché dynamiquement (frise, projets,
// compétences, international…) vient d'ici : modifie ce fichier pour mettre à jour le site.
const ICONIFY = (name, color) => `https://api.iconify.design/${name}.svg${color ? `?color=${encodeURIComponent(color)}` : ''}`;
const WIKI = 'https://upload.wikimedia.org/wikipedia/commons/thumb';

window.PORTFOLIO_DATA = {
  // Carte de la Terre de nuit (NASA, domaine public), projection équirectangulaire.
  // Utilisée par le globe du hero et par la carte de la section International.
  earthNight: `${WIKI}/b/ba/The_earth_at_night.jpg/3840px-The_earth_at_night.jpg`,

  // Photo de profil : dépose ton fichier dans assets/images/profile.jpg.
  // Tant qu'il n'existe pas, un monogramme s'affiche à la place.
  profilePhoto: 'assets/images/profile.jpg',
  profileFallback: 'assets/images/profile-placeholder.svg',

  visuals: {
    dijon: `${WIKI}/d/de/Dijon_-_Place_de_la_Lib%C3%A9ration_-_Nuit_-_02.jpg/1280px-Dijon_-_Place_de_la_Lib%C3%A9ration_-_Nuit_-_02.jpg`,
    santander: `${WIKI}/d/dd/Santander_-_beach.jpg/1280px-Santander_-_beach.jpg`,
    montreal: `${WIKI}/d/d0/Montreal_August_2017_05.jpg/1280px-Montreal_August_2017_05.jpg`,
    montrealNight: `${WIKI}/5/55/Montreal_skyline_at_night%2C_Nov_2018.jpg/1280px-Montreal_skyline_at_night%2C_Nov_2018.jpg`,
    motorway: `${WIKI}/9/9f/A4-A104_french_highways_interchange_aerialview.jpg/1280px-A4-A104_french_highways_interchange_aerialview.jpg`,
    wipes: `${WIKI}/5/5d/Inappropriate_Disposal_of_Wet_Wipes_Again...._130_365_%2841972818642%29.jpg/1280px-Inappropriate_Disposal_of_Wet_Wipes_Again...._130_365_%2841972818642%29.jpg`
  },

  brandLogos: {
    aprr: 'https://upload.wikimedia.org/wikipedia/commons/1/17/APRR.svg'
  },

  timeline: [
    {
      id:'eseo', type:'study', years:'2020 — 2026', imageKey:'dijon',
      fr:{title:'ESEO Dijon',role:'Diplôme d’ingénieur — Smart City',bullets:['Formation généraliste en ingénierie','Systèmes connectés, logiciel, IoT et data','Gestion de projet et projets pluridisciplinaires']},
      en:{title:'ESEO Dijon',role:'Engineering degree — Smart City',bullets:['General engineering curriculum','Connected systems, software, IoT and data','Project management and multidisciplinary projects']}
    },
    {
      id:'santander', type:'study', years:'Fév. — Juil. 2022', yearsEn:'Feb. — Jul. 2022', imageKey:'santander',
      fr:{title:'Santander, Espagne',role:'Semestre d’échange — Universidad Europea del Atlántico',bullets:['Immersion académique internationale','Renforcement de l’espagnol','Adaptation à un nouvel environnement']},
      en:{title:'Santander, Spain',role:'Exchange semester — Universidad Europea del Atlántico',bullets:['International academic immersion','Improved Spanish skills','Adapting to a new environment']}
    },
    {
      id:'intraneos', type:'work', years:'Juil. — Nov. 2023', yearsEn:'Jul. — Nov. 2023', visualType:'code',
      fr:{title:'Intraneos Synergy',role:'Stage — développeur web',bullets:['Application web en Symfony','Recueil des besoins, maquettes Figma et tests','Préparation de données pour un projet IA']},
      en:{title:'Intraneos Synergy',role:'Internship — web developer',bullets:['Web application built with Symfony','Requirements, Figma mockups and testing','Data preparation for an AI project']}
    },
    {
      id:'sherbrooke', type:'study', years:'Août 2024 — Août 2025', yearsEn:'Aug. 2024 — Aug. 2025', imageKey:'montreal',
      fr:{title:'Université de Sherbrooke',role:'Maîtrise en gestion de l’ingénierie — Longueuil',bullets:['Double diplôme avec l’ESEO','Gestion de projet et d’équipe','Leadership, Six Sigma, résolution de problèmes']},
      en:{title:'Université de Sherbrooke',role:'Master’s in Engineering Management — Longueuil',bullets:['Double degree with ESEO','Project and team management','Leadership, Six Sigma, problem solving']}
    },
    {
      id:'reseau', type:'work', years:'Janv. — Avr. 2025', yearsEn:'Jan. — Apr. 2025', imageKey:'montrealNight',
      fr:{title:'Réseau Environnement',role:'Coordonnateur adjoint — secteur Eau, Montréal',bullets:['Animation de groupes de travail du secteur de l’eau','Réunions stratégiques avec le MAMH','Création d’une page Odoo selon les besoins métier']},
      en:{title:'Réseau Environnement',role:'Assistant Coordinator — Water sector, Montréal',bullets:['Facilitated water-sector working groups','Strategic meetings with Quebec’s MAMH','Built an Odoo page for business needs']}
    },
    {
      id:'aprr', type:'work', years:'Sept. 2025 — Sept. 2026', yearsEn:'Sep. 2025 — Sep. 2026', imageKey:'motorway',
      fr:{title:'APRR — Eiffage',role:'Alternance — assistant chef de projet',bullets:['Pilotage de projets IT avec 5 chefs de projet','Coordination entre équipes techniques et métiers','Accompagnement Azure DevOps et pratiques Agile']},
      en:{title:'APRR — Eiffage',role:'Apprenticeship — project management assistant',bullets:['IT project delivery alongside 5 project managers','Coordination between technical and business teams','Azure DevOps and Agile practices support']}
    }
  ],

  supplementary: [
    {mark:'ZD', fr:{title:'Zénith de Dijon',text:'Service client en forte affluence, responsabilité du bar, efficacité opérationnelle.'}, en:{title:'Zénith de Dijon',text:'Customer service at high-traffic events, bar responsibility, operational efficiency.'}},
    {mark:'MD', fr:{title:'Mairie de Dijon',text:'Accueil du public, médiation, dossiers d’identité et demandes administratives.'}, en:{title:'City of Dijon',text:'Public reception, mediation, identity records and administrative requests.'}}
  ],

  // logo : {img:url} pour un vrai logo, {text:'…'} pour un badge texte.
  // gallery : ajoute ici des captures (chemins locaux ou URLs) pour enrichir la fiche projet.
  // meta : durée / lieu / équipe affichés en bas de la fiche (laisser vide = non affiché).
  projects: [
    {
      id:'aprr', logo:{img:'https://upload.wikimedia.org/wikipedia/commons/1/17/APRR.svg', alt:'APRR'},
      gallery:['motorway','assets/images/project-aprr.svg'],
      fr:{
        title:'Transformation digitale chez APRR',short:'Contribution à la mise en place d’outils et de méthodes Agile pour améliorer la gestion de projet.',
        tags:['Gestion de projet','Agile','Azure DevOps'],
        context:'Au sein du pôle Digital & Services d’APRR, j’accompagne plusieurs chefs de projet dans le pilotage de projets numériques et l’harmonisation des pratiques.',
        problem:'Créer un cadre commun suffisamment clair pour faciliter le pilotage, tout en restant adapté aux réalités de plusieurs projets et équipes.',
        role:'Alternant assistant en chefferie de projet : suivi, coordination, backlogs, cérémonies Agile et accompagnement des équipes sur Azure DevOps.',
        actions:['Pilotage de projets informatiques aux côtés de 5 chefs de projet','Gestion et priorisation de backlogs avec les acteurs projet','Animation de réunions de suivi et de cérémonies Agile','Conception de tableaux de bord et d’indicateurs sous Azure DevOps','Accompagnement à l’adoption d’un cadre projet commun'],
        tools:['Azure DevOps','Agile / Scrum','Backlog','KPI','Coordination transverse'],
        result:'Une démarche structurée de transformation des pratiques projet, présentée et diffusée auprès des équipes du pôle Digital & Services.',
        meta:{duration:'12 mois — alternance',place:'Dijon, France',team:'5 chefs de projet'}
      },
      en:{
        title:'Digital transformation at APRR',short:'Helping roll out Agile tools and methods to improve project management.',
        tags:['Project management','Agile','Azure DevOps'],
        context:'Within APRR’s Digital & Services division, I support several project managers on digital initiatives and help harmonize project practices.',
        problem:'Create a shared framework that improves project steering while remaining practical for different projects and teams.',
        role:'Project management assistant (apprenticeship): tracking, coordination, backlogs, Agile ceremonies and Azure DevOps support for teams.',
        actions:['Managed IT projects alongside 5 project managers','Managed and prioritized backlogs with stakeholders','Facilitated follow-up meetings and Agile ceremonies','Built dashboards and indicators in Azure DevOps','Supported teams adopting a shared project framework'],
        tools:['Azure DevOps','Agile / Scrum','Backlog','KPIs','Cross-functional coordination'],
        result:'A structured approach to transforming project practices, shared with teams across the Digital & Services division.',
        meta:{duration:'12 months — apprenticeship',place:'Dijon, France',team:'5 project managers'}
      }
    },
    {
      id:'ondijon', logo:{text:'onDijon'},
      gallery:['dijon','assets/images/project-ondijon.svg'],
      fr:{
        title:'OnDijon — Mobilité intelligente',short:'Jumeau numérique de la circulation : données de mobilité, modélisation des flux et visualisation.',
        tags:['Smart City','Data','Mobilité'],
        context:'Projet réalisé dans le cadre de ma spécialisation Smart City, autour des données de circulation dijonnaises et de l’écosystème OnDijon.',
        problem:'Exploiter des données de mobilité pour mieux comprendre et visualiser les flux de circulation dans un contexte de ville intelligente.',
        role:'Analyse et traitement des données, modélisation des flux et conception d’une interface de visualisation.',
        actions:['Analyse et traitement de données de circulation','Structuration des données utiles au projet','Modélisation des flux de circulation','Développement d’une interface de visualisation pour le suivi'],
        tools:['Data','Modélisation','Visualisation','Smart City'],
        result:'Un projet qui relie directement ma spécialisation Smart City à un cas d’usage concret de mobilité urbaine.',
        meta:{duration:'Projet académique — ESEO',place:'Dijon, France',team:''}
      },
      en:{
        title:'OnDijon — Smart mobility',short:'Traffic digital twin: mobility data, traffic-flow modelling and visualization.',
        tags:['Smart City','Data','Mobility'],
        context:'Academic project linked to my Smart City specialization, based on Dijon traffic data and the OnDijon ecosystem.',
        problem:'Use mobility data to better understand and visualize traffic flows in a smart-city context.',
        role:'Data analysis and processing, traffic-flow modelling and design of a visualization interface.',
        actions:['Traffic-data analysis and processing','Structuring the data needed for the project','Traffic-flow modelling','Development of a visualization interface'],
        tools:['Data','Modelling','Visualization','Smart City'],
        result:'A project directly connecting my Smart City specialization with a concrete urban-mobility use case.',
        meta:{duration:'Academic project — ESEO',place:'Dijon, France',team:''}
      }
    },
    {
      id:'wipes', logo:{text:'Réseau Environnement', leaf:true},
      gallery:['wipes','assets/images/project-reseau.svg'],
      fr:{
        title:'Étude sur les lingettes non flushable',short:'Analyse de l’impact des lingettes sur les réseaux d’assainissement et recommandations.',
        tags:['Environnement','Analyse','Recommandations'],
        context:'Chez Réseau Environnement, j’ai travaillé sur la problématique des lingettes non flushable et leur impact sur les réseaux d’assainissement au Québec.',
        problem:'Mieux documenter les effets de ces produits sur les infrastructures et identifier des leviers d’action adaptés au contexte québécois.',
        role:'Recherche, synthèse, échanges avec les acteurs du secteur de l’eau et formulation de recommandations.',
        actions:['Analyse des enjeux environnementaux, économiques et infrastructurels','Synthèse d’informations issues du secteur de l’eau','Échanges avec des acteurs institutionnels et municipaux','Pistes de sensibilisation, d’étiquetage et de cadre normatif'],
        tools:['Recherche','Analyse','Synthèse','Recommandations'],
        result:'Une étude orientée vers des recommandations concrètes pour réduire l’impact des lingettes sur les réseaux d’assainissement.',
        meta:{duration:'4 mois',place:'Montréal, Canada',team:''}
      },
      en:{
        title:'Study on non-flushable wipes',short:'Analysis of how wipes impact wastewater networks, with recommendations.',
        tags:['Environment','Analysis','Recommendations'],
        context:'At Réseau Environnement, I worked on non-flushable wipes and their impact on wastewater systems in Quebec.',
        problem:'Better document their effects on infrastructure and identify possible actions suited to the Quebec context.',
        role:'Research, synthesis, discussions with water-sector stakeholders and recommendations.',
        actions:['Analyzed environmental, economic and infrastructure impacts','Synthesized information from the water sector','Discussions with institutional and municipal stakeholders','Awareness, labeling and standards-related options'],
        tools:['Research','Analysis','Synthesis','Recommendations'],
        result:'A study focused on actionable recommendations to reduce the impact of wipes on wastewater networks.',
        meta:{duration:'4 months',place:'Montréal, Canada',team:''}
      }
    }
  ],

  // icon : URL d'un logo ; symbol : nom d'une icône interne (voir ICONS dans app.js).
  skillGroups:[
    {icon:'kanban',fr:'Gestion de projet',en:'Project management',skills:[
      {name:'Azure DevOps',icon:ICONIFY('devicon/azuredevops')},
      {name:'Agile',symbol:'cycle'},
      {name:'Scrum',symbol:'target'},
      {name:'Kanban',symbol:'kanban'},
      {name:'Backlog',symbol:'list'},
      {name:'KPI',symbol:'chart'},
      {name:'MS Project',symbol:'gantt'},
      {name:'Lean / Six Sigma',symbol:'sigma'}
    ]},
    {icon:'code',fr:'Développement',en:'Development',skills:[
      {name:'Python',icon:ICONIFY('logos/python')},
      {name:'JavaScript',icon:ICONIFY('logos/javascript')},
      {name:'PHP',icon:ICONIFY('logos/php')},
      {name:'Symfony',icon:ICONIFY('simple-icons/symfony','#ffffff')},
      {name:'HTML',icon:ICONIFY('logos/html-5')},
      {name:'CSS',icon:ICONIFY('logos/css-3')},
      {name:'SQL',symbol:'database'},
      {name:'Java',icon:ICONIFY('logos/java')}
    ]},
    {icon:'chart',fr:'Data & outils',en:'Data & tools',skills:[
      {name:'Excel',icon:ICONIFY('vscode-icons/file-type-excel')},
      {name:'Power BI',icon:ICONIFY('logos/microsoft-power-bi')},
      {name:'PowerPoint',icon:ICONIFY('vscode-icons/file-type-powerpoint')},
      {name:'Microsoft 365',icon:ICONIFY('mdi/microsoft-office','#EB5A2B')},
      {name:'SharePoint',icon:ICONIFY('mdi/microsoft-sharepoint','#1AA5AB')},
      {name:'Figma',icon:ICONIFY('logos/figma')},
      {name:'MariaDB',icon:ICONIFY('simple-icons/mariadb','#C9835F')},
      {name:'Odoo',icon:ICONIFY('simple-icons/odoo','#C77DB5')}
    ]},
    {icon:'chip',fr:'Ingénierie & IoT',en:'Engineering & IoT',skills:[
      {name:'ESP32',icon:ICONIFY('simple-icons/espressif','#E7352C')},
      {name:'Arduino',icon:ICONIFY('logos/arduino')},
      {name:'MQTT',icon:ICONIFY('simple-icons/mqtt','#B98AE0')},
      {name:'C',icon:ICONIFY('logos/c')},
      {name:'Matlab',icon:ICONIFY('devicon/matlab')},
      {name:'Altium',icon:ICONIFY('simple-icons/altiumdesigner','#C9B37E')},
      {name:'Réseaux',nameEn:'Networks',symbol:'network'},
      {name:'Systèmes connectés',nameEn:'Connected systems',symbol:'wifi'}
    ]}
  ],

  values:[
    {icon:'globe',fr:{title:'Curiosité internationale',text:'3 pays, des cultures, une vision plus large du monde.'},en:{title:'International curiosity',text:'3 countries, new cultures, a broader view of the world.'}},
    {icon:'bulb',fr:{title:'Esprit projet',text:'De l’idée à l’impact concret.'},en:{title:'Project mindset',text:'From an idea to concrete impact.'}},
    {icon:'users',fr:{title:'Travail d’équipe',text:'J’aime apprendre et avancer avec les autres.'},en:{title:'Teamwork',text:'I enjoy learning and moving forward with others.'}},
    {icon:'rocket',fr:{title:'Toujours en mouvement',text:'De nouveaux défis, de nouvelles compétences.'},en:{title:'Always moving',text:'New challenges, new skills.'}}
  ],

  countries:[
    {imageKey:'dijon',fr:{country:'France',city:'Dijon',text:'Études, projets, APRR'},en:{country:'France',city:'Dijon',text:'Studies, projects, APRR'}},
    {imageKey:'santander',fr:{country:'Espagne',city:'Santander',text:'Semestre d’échange'},en:{country:'Spain',city:'Santander',text:'Exchange semester'}},
    {imageKey:'montrealNight',fr:{country:'Canada',city:'Montréal / Longueuil',text:'Double diplôme, Réseau Environnement'},en:{country:'Canada',city:'Montréal / Longueuil',text:'Double degree, Réseau Environnement'}}
  ],

  // Coordonnées réelles (degrés) : servent à placer les villes sur le globe et la carte.
  cities:[
    {id:'montreal',name:'Montréal',lat:45.50,lon:-73.57,label:'above'},
    {id:'dijon',name:'Dijon',lat:47.32,lon:5.04,label:'right'},
    {id:'santander',name:'Santander',lat:43.46,lon:-3.81,label:'below'}
  ],
  routes:[['dijon','santander'],['dijon','montreal']],

  interests:[
    {icon:'plane',fr:{title:'Voyages',text:'Découvrir de nouveaux pays, cultures et façons de travailler.'},en:{title:'Travel',text:'Discovering new countries, cultures and ways of working.'}},
    {icon:'pulse',fr:{title:'Sport',text:'Musculation, surf et activité physique pour garder l’équilibre.'},en:{title:'Sport',text:'Strength training, surfing and staying active.'}},
    {icon:'film',fr:{title:'Cinéma & culture',text:'Un intérêt de longue date pour le cinéma et la culture.'},en:{title:'Cinema & culture',text:'A long-standing interest in cinema and culture.'}},
    {icon:'sparkles',fr:{title:'Technologie',text:'Curieux des usages concrets du digital, de l’IA et de l’IoT.'},en:{title:'Technology',text:'Curious about practical uses of digital, AI and IoT.'}}
  ]
};
