// ====================== DEMO OVERLAY FUNCTIONALITY ======================
const demoOverlay = document.getElementById('demoOverlay');
const demoCloseBtn = document.getElementById('demoCloseBtn');
const demoReopenBtn = document.getElementById('demoReopenBtn');

demoCloseBtn.addEventListener('click', () => demoOverlay.classList.add('hidden'));
demoReopenBtn.addEventListener('click', () => demoOverlay.classList.remove('hidden'));

// ====================== TRANSLATIONS ======================
const translations = {
    kea: {
        main_title: "Recursos di Saúde Komunidadi Rhode Island",
        subhead: "Informason i Guias pa Komunidadi Kabuverdianu",
        btn_pre_adoption: "Nascimentu Antis di Adopsion",
        btn_addiction: "Vísiu é Un Doença",
        btn_co: "Intoxikason Monóxidu Carbónu",
        btn_equity: "Zonas di Equidade na Saúde (RI)",
        btn_overdose: "Modi ki bu age kontra Overdose",
        btn_perinatal: "Folleto Perinatal Uzu Sustansia",
        btn_bedbugs: "Fatis sobri Insetu di Kama",
        btn_mold: "Fatis sobri Mofo",
        btn_preparedness: "3 Pason di Preparason",
        btn_chw: "Kuzê ki é Trabadór Comunitáriu di Saúde",
        install_app: "Instala Aplikason Somos.CV",

        modal_pre_title: "Nascimentu Antis di Adopsion",
        pre_stat: "<i class='fas fa-heart'></i> Kada pai biológiku merese apoiu ku informason klaru sobri se opsons.",
        pre_what_title: "Kuzê ki é Apoiu Antis di Adopsion?",
        pre_what_text: "Servisu di nascimentu antis di adopsion ta fornese apoiu emosional, médiku i legal pa kes ki sta konsidera adopsion pa se fidju. Es servisu ta garanti ki pais biológiku ntende se direitus, siméliu kuidadu prenatal i ten asesu konselhu duranti prucessu.",
        pre_rights_title: "Bu Direitus Han Pai Biológiku",
        pre_right1: "<i class='fas fa-check-circle'></i> Direitu di risibi informason sen bias sobri adopsion.",
        pre_right2: "<i class='fas fa-check-circle'></i> Direitu di skodje família ou ajénsia di adopsion.",
        pre_right3: "<i class='fas fa-check-circle'></i> Direitu di ten representason legal i konselhu.",
        pre_right4: "<i class='fas fa-check-circle'></i> Direitu di retira konsentimentu drentu un prazu (varia konforme stadu).",
        pre_right5: "<i class='fas fa-check-circle'></i> Direitu di risibi apoiu pos-adiamentu i kuidadu médiku.",
        pre_resources_title: "Rekursu na Rhode Island",
        pre_resource_helpline: "Linha Ajuda Adopsion RI: 1-800-555-1234",
        pre_resource_legal: "Servisu Legal RI: 401-274-2652",
        pre_resource_counseling: "Konselhu Adopsion: 401-421-5790",
        pre_resource_medical: "Kuidadu Prenatal: 1-800-942-7434",
        pre_footer: "Si bu sta konsidera adopsion, papia ku un konselheru ou asistenti sosial pa ntende tudu opsons. Bu ka sta só.",
        
        modal_addiction_title: "Vísiu é Un Doença",
        addiction_stat: "<i class='fas fa-chart-line'></i> Vísiu é un doença krónika di serebru, ka falha moral. Rekuperason é posivel ku tratamentu i apoiu.",
        addiction_what_title: "Kuzê ki é Vísiu?",
        addiction_what_text: "Vísiu é un doença médika tratável, krónika, envolvi interason kompleksu entre sirkuitus serebral, genétika, ambiente i speriensias di vida. Pessoas ku vísiu ta uza substansia ou ten komportamentu ki ta torna kompulsivu i kontinua masmu ku konsekuénsia prejudisial.",
        addiction_signs_title: "Sinais di Vísiu",
        addiction_sign1: "<i class='fas fa-capsules'></i> Perda di kontrolu di uzu substansia",
        addiction_sign2: "<i class='fas fa-hand-peace'></i> Deseju intensu i preokupason",
        addiction_sign3: "<i class='fas fa-bed'></i> Abandona responsabilidadi",
        addiction_sign4: "<i class='fas fa-users'></i> Distansiamentu di família i amigus",
        addiction_sign5: "<i class='fas fa-chart-simple'></i> Toleránsia (meste más pa sinti efeitu)",
        addiction_sign6: "<i class='fas fa-exclamation-triangle'></i> Kontinua uzu masmu ku danu",
        addiction_treatment_title: "Tratamentu i Rekuperason",
        addiction_treat1: "<i class='fas fa-phone-alt'></i> Linha Ajuda SAMHSA: 1-800-662-4357 (konfidensial, 24/7)",
        addiction_treat2: "<i class='fas fa-hospital-user'></i> Linha Ajuda Buprenorfina i Naloxona RI: 401-606-5456",
        addiction_treat3: "<i class='fas fa-hand-holding-heart'></i> Apoiu lokal: Alcoólicos Anónimus, Narcóticos Anónimus, SMART Recovery",
        addiction_treat4: "<i class='fas fa-check-circle'></i> Medikamentu pa trastornu di uzu opiódi (metadona, buprenorfina, naltrexona) é efikás.",
        addiction_resource_ri: "Departamentu di Saúde Konportamental RI",
        addiction_resource_riphone: "401-462-4691",
        addiction_footer: "Rekuperason é posivel. Kompaixon i apoiu ta salva vidas. Si bu ou algen ki bu kre ta pasa por isu, buska ajuda oji.",
        
        modal_overdose_title: "Modi ki bu age kontra Overdose",
        overdose_stat: "<i class='fas fa-clock'></i> Kada sigundu ta konta. Konhese sinál i age dretu.",
        overdose_recognize_title: "Reconhese Un Overdose",
        overdose_sig1: "<i class='fas fa-face-sleeping'></i> Pesoas ka ta responde ou ka ta disperta",
        overdose_sig2: "<i class='fas fa-lungs'></i> Respiraçon lentu, superficial, ou paradu",
        overdose_sig3: "<i class='fas fa-hand-peace'></i> Lábiu ou ponta di dedu blúia ou cinzentu",
        overdose_sig4: "<i class='fas fa-syringe'></i> Som di sufoku ou gorgoleju",
        overdose_sig5: "<i class='fas fa-heartbeat'></i> Korpu mole, pele pálidu",
        overdose_action_title: "Pason pa Age",
        overdose_step1: "Dá lokalizason klaru. Flai ki pesoas ka sta respira ou ka ta responde. Léi di Bom Samaritano na Rhode Island ta proteje bu i pesoas di prosesu pa posse di dróga.",
        overdose_step2: "Si disponivel, uza naloxona (Narcan) spray nazal ou injetável. El ta reverte overdose di opiódi sen efeitu prejudisial si dadu pa algen ki ka sta ku overdose. Naloxona grátis ta disponivel na farmásias i organizason komunidadi.",
        overdose_step3: "Inklina kabésa pa trás, levanta keixu, pita nariz, dá un respiraçon kada 5 segundus. Kontinua até pesoas respira só ou EMV txega.",
        overdose_step4: "Ponha na pozison di rekuperason (di ladu) si sta respira ma inconsciente. Fika até ajuda txega.",
        overdose_naloxone_title: "Nunde Bu Pode Obtén Naloxona",
        overdose_naloxone1: "Farmásias partisipanti (sen preskrison)",
        overdose_naloxone2: "Programas komunitáriu di prevençon di overdose",
        overdose_naloxone3: "Linha Ajuda Naloxona RI: 401-222-5960",
        overdose_footer: "Bu pode salba un vida. Leva naloxona, prende sinál, i age imediatamenti.",
        
        modal_perinatal_title: "Folleto Perinatal Uzu Sustansia",
        perinatal_stat: "<i class='fas fa-fetus'></i> Apoiu pa un gravidez i bebé saudável ta kumesa ku kompaixon, ka julgamentu.",
        perinatal_why_title: "Paké é Importanti",
        perinatal_why_text: "Uzu di substansia durante gravidez pode afeta mai i bebé. Má ku kuidadu apropriadu, tratamentu i apoiu, família pode atinjir rezultadu saudável. Estigma ta impedi minjeres di buska ajuda – nos sta li pa apoiabu.",
        perinatal_risks_title: "Riziku Potensial",
        perinatal_risk1: "Nascimentu antis di ténpu i pezu baxu",
        perinatal_risk2: "Síndrome di abstinénsia neonatal (NAS)",
        perinatal_risk3: "Atrasu di dezenvolvimentu",
        perinatal_risk4: "Preson altu i pré-eclâmpsia",
        perinatal_risk5: "Infekson (HIV, hepatitis)",
        perinatal_risk6: "Problema di saúde mental",
        perinatal_support_title: "Apoiu – Sen Julgamentu",
        perinatal_sup1: "<strong>Projetu RESPECT:</strong> Kuidadu prenatal integradu i tratamentu di uzu substansia na Women & Infants Hospital – 401-274-1122",
        perinatal_sup2: "<strong>Rede Apoiu Pais RI:</strong> 401-467-6855",
        perinatal_sup3: "<strong>Linha Ajuda Uzu Sustansia pa Grávidas:</strong> 1-800-662-4357",
        perinatal_tips_title: "Dika pa un Gravidez Saudável",
        perinatal_tip1: "Kuidadu prenatal sedu",
        perinatal_tip2: "Tratamentu asistidu ku medikamentu (MAT) é siguru",
        perinatal_tip3: "Ta fasi tudu konsulta pediátrika",
        perinatal_tip4: "Apoiu di amamentason si apropriadu",
        perinatal_footer: "Bu ka sta só. Pidi ajuda é sinal di forsa. Un futuru saudável pa bu i bu bebé é posivel.",
        
        modal_preparedness_title: "3 Pason di Preparason",
        prep_stat: "<i class='fas fa-shield-alt'></i> Sta preparadu pode salba vidas. Kumesa ku es trés pason.",
        prep_step1_title: "1. Faze un Planu",
        prep_plan1: "Diskuti ku família modi ki bu ta kontata.",
        prep_plan2: "Skodje dous lugar pa atxa: un pertu di kaza, otu fora di bairru.",
        prep_plan3: "Konhese rotas di evakuason i lokal di abrigu.",
        prep_plan4: "Inklui animal di estimason na planu.",
        prep_step2_title: "2. Monta un Kit",
        prep_kit1: "Aguá (1 galon pa pesoas pa dia, 3 dias)",
        prep_kit2: "Alimentu ki ka ta strega (3 dias)",
        prep_kit3: "Lanterna, baterias, rádiu",
        prep_kit4: "Kit di primerus socorrus",
        prep_kit5: "Medikamentu i fornimentu médiku",
        prep_kit6: "Dokumentu inportanti (kópia)",
        prep_kit7: "Dinheiru, karregadó di telefoni, kobertor",
        prep_kit8: "Fralda, lençu umidu, formula pa bebé si meste",
        prep_step3_title: "3. Manten Informadu",
        prep_inform1: "Regista pa Alertas di Emergénsia RI: <a href='https://riema.ri.gov' target='_blank'>riema.ri.gov</a>",
        prep_inform2: "Konhese estason di rádiu lokal pa atualizason di emergénsia.",
        prep_inform3: "Akumpanha previzon di tempu i avizu komunidadi.",
        prep_footer: "Prepara oji pa pas di spiritu manhan. Reviza bu planu kada anu i atualiza kit konforme mester.",
        
        modal_chw_title: "Kuzê ki é Trabadór Comunitáriu di Saúde",
        chw_stat: "<i class='fas fa-hand-holding-heart'></i> TCS é membru di kunfiansa di kumunidadi ki ta konekta pesoas ku servisu di saúde i sosial.",
        chw_role_title: "Papel di Trabadór Comunitáriu di Saúde",
        chw_role_text: "Trabadór Comunitáriu di Saúde (TCS) é un prufisional di saúde públika di front line, membru di kunfiansa di kumunidadi ki sirvi. El ta liga lakuna entre servisu di saúde i individus, fornese apoiu kulturalmente apropriadu, edukason di saúde i asisténsia di navegason.",
        chw_help_title: "Modi ki TCS ta Ajuda",
        chw_help1: "Marka konsulta médiku",
        chw_help2: "Organiza transporti pa konsulta",
        chw_help3: "Fornese orientason di nutrison i benestar",
        chw_help4: "Ajuda ku aplikason di seguro",
        chw_help5: "Oferece interpretason di língua",
        chw_help6: "Konekta ku rekursu di moradia, alimentu i trabadju",
        chw_find_title: "Atxa un TCS na Rhode Island",
        chw_find1: "Muitus centrus di saúde komunitáriu i klínikas kontrata TCS.",
        chw_find2: "Kontakta Asosiasaun TCS RI: <a href='https://www.richwa.org' target='_blank'>richwa.org</a>",
        chw_find3: "Liga 2-1-1 i pidi servisu TCS na bu área.",
        chw_career: "Interesadu na torna TCS? Formason disponivel na faculdade lokal i departamentu di saúde.",
        chw_footer: "TCS é bu vizinhus, ajudabu na sistema di saúde. Kontata – es sta li pa bu.",
        
        modal_co_title: "Intoxikason Monóxidu Carbónu",
        co_stat: "<i class='fas fa-calendar-alt'></i> KDA ANU, SENTENAS DI PESSOA NA ESTADOS UNIDOS MORRE DI EXPOSIÇÃO SEM INTENSON MONÓXIDU CARBÓNU.",
        co_what_title: "KÊLÉ INTOXIKASON MONÓXIDU CARBÓNU?",
        co_what_text: "Monóxidu Carbónu (CO) é un gás produzidu pa keimason di kombinustivel – gas, óliu, querosene, lenha, karvaun. Ka ta odja, ka tem txéu. Má si bu respira dimás, pode mata.",
        co_prevent_title: "Modi ki bu pode preveni intoxikason CO!",
        co_install_title: "Instalason & Mantenimentu",
        co_install_1: "<i class='fas fa-check-circle'></i> Le i sigui instruçon na instalason di aparelhus.",
        co_install_2: "<i class='fas fa-check-circle'></i> Manten aparelhus d´akordu ku rekomendason di fabrikanti.",
        co_install_3: "<i class='fas fa-check-circle'></i> Instala detektor di CO na vários área di kaza.",
        co_install_4: "<i class='fas fa-check-circle'></i> Testa alarme di CO regularmente i troka baterias.",
        co_alarm_title: "Lembrete Alarme CO",
        co_alarm_text: "Alarme di CO ta da pas di spiritu, ma ka é substitutu pa instalason, uzu i mantenimentu korretu di aparelhus.",
        co_sources_title: "FONTI DI MONÓXIDU CARBÓNU",
        co_source1: "<i class='fas fa-car'></i> Gaz di karu ou gerador na garaji",
        co_source2: "<i class='fas fa-fire'></i> Aquecedor, fogon, fornu di gas",
        co_source3: "<i class='fas fa-industry'></i> Gaz di gerador na kaza, porão ou espaço debaxu di kaza",
        co_source4: "<i class='fas fa-water'></i> Ferajen ou mancha di aguá na chaminé",
        co_source5: "<i class='fas fa-brick'></i> Pedra soltu na chaminé, fuligem, resto ta kai",
        co_symptoms_title: "SINÁL DI INTOXIKASON CO!",
        co_symptoms_initial_title: "Sintoma inicial:",
        co_symptom1: "<i class='fas fa-headache'></i> Dó di kabésa",
        co_symptom2: "<i class='fas fa-dizzy'></i> Tontura",
        co_symptom3: "<i class='fas fa-vomit'></i> Náusea",
        co_symptom4: "<i class='fas fa-bed'></i> Fatiga",
        co_symptom5: "<i class='fas fa-lungs'></i> Falta di ar",
        co_symptoms_additional_title: "Sintoma adicional:",
        co_symptom_add1: "<i class='fas fa-home'></i> Dó di kabésa sô na kaza",
        co_symptom_add2: "<i class='fas fa-tree'></i> Bu ta sinti midjór na rua",
        co_symptom_add3: "<i class='fas fa-users'></i> Otus ten mesmu sintoma",
        co_what_to_do_title: "<i class='fas fa-hand-holding-heart'></i> Kuzê ki bu faz si bu ten sintoma:",
        co_action1: "<i class='fas fa-door-open'></i> Sai di área, respira ar fresku.",
        co_action2: "<i class='fas fa-phone-alt'></i> Si grave, liga 911 di otu lugar.",
        co_action3: "<i class='fas fa-fire-extinguisher'></i> Liga bombeiru pa verifika nível CO.",
        co_action4: "<i class='fas fa-hospital-user'></i> Kontakta Centro di Kontrol di Venenu 800-222-1222.",
        co_action5: "<i class='fas fa-stethoscope'></i> Vê doktor si sintoma kontinua.",
        co_unvented_warning: "<i class='fas fa-ban'></i> AQUECEDOR SIN VENTILASON É PERIGOZU!",
        co_resources_title: "Rekursu",
        co_resource_poison: "Kontrol di Venenu: 800-222-1222",
        co_resource_fire: "Bombeiru lokal: 911",
        co_footer: "Informason adaptadu di U.S. Consumer Product Safety Commission. Pa emergénsia liga 911.",
        
        modal_equity_title: "Zonas di Equidade na Saúde – Rhode Island",
        hez_stat: "<i class='fas fa-chart-line'></i> 80% di saúde é determinadu fora consultório – na nos kasa, skola, trabadju, vizinhança.",
        hez_what_title: "KÊLÉ ZONAS DI EQUIDADE NA SAÚDE?",
        hez_what_text: "Zonas di Equidade na Saúde (HEZ) é inisiativas baseadu na kumunidadi ki ta reuni morador pa kria kumunidadi saudável. Lideradu pa residentes, kada zona identifika fatores sosial, econômico i ambiental ki afeta saúde i implementa planus di akon baseadu dadus.",
        hez_determinants_title: "DETERMINANTES DI SAÚDE",
        hez_det_chart_title: "Kuzê ki ta molda nos saúde?",
        hez_det_behaviors: "<i class='fas fa-running'></i> Komportamentu di Saúde: 30%",
        hez_det_genes: "<i class='fas fa-dna'></i> Genétika & Asisténsia Klínika: 20%",
        hez_det_social: "<i class='fas fa-city'></i> Fator Social, Económico i Ambiental: 50%",
        hez_det_framework: "Baseado na estrutura di Tarlov & Kindig",
        hez_equity_title: "Equidade vs Igualdade",
        hez_equity_text: "Igualdade ta da mesmu rekursu pa tudu algen. Equidade ta da kada kumunidadi aquil ki es meste pa ten txansa justu di saúde bon. Lugar é importante.",
        hez_impact_title: "IMPACTU NA RHODE ISLAND",
        hez_impact1: "<i class='fas fa-brain'></i> <strong>Primeru Ajudu Saúde Mental:</strong> Washington County HEZ treinu 1.000+ polisia, pastór, prufesor.",
        hez_impact2: "<i class='fas fa-tree'></i> <strong>Rua Completu i Verdi:</strong> Pawtucket/CF HEZ ajuda aprova lei pa rua siguru.",
        hez_impact3: "<i class='fas fa-walking'></i> <strong>Bus di Skola a Pé:</strong> Olneyville HEZ aumenta prezénsa na skola.",
        hez_impact4: "<i class='fas fa-smoking-ban'></i> <strong>Park sem Fumu:</strong> Bristol HEZ proibi fumu i vape na tudu park di sidadi.",
        hez_impact5: "<i class='fas fa-handcuffs'></i> <strong>Desviu pa Tratamentu:</strong> West Warwick HEZ integra klíniku ku polisia pa uzadus di sustansia.",
        hez_impact6: "<i class='fas fa-home'></i> <strong>Defensa di Moradia:</strong> Southside HEZ avansa polítika di moradia justu.",
        hez_get_involved_title: "MODI PARTISIPA",
        hez_involve1: "<i class='fas fa-hand-holding-usd'></i> Investi na HEZ ezistenti pa sustenta se trabadju.",
        hez_involve2: "<i class='fas fa-handshake'></i> Parsería ku RIDOH pa finansiamentu inisial di NOVU HEZ.",
        hez_involve3: "<i class='fas fa-building'></i> Vira organizason \"espinha dorsal\" pa un HEZ.",
        hez_involve4: "<i class='fas fa-gavel'></i> Defende polítika ki finánsia infraestrutura lokal.",
        hez_involve5: "<i class='fas fa-users'></i> Apoia prosesu lideradu pa kumunidadi na bu vizinhança.",
        hez_phone: "Linha Informason Saúde RI: 1-800-942-7434",
        hez_footer: "Zonas di Equidade na Saúde é inisiativa prinsipal di Rhode Island pa konstrói kumunidadi saudável undi tudu algen ten txansa justu pa florese.",
        
        modal_bedbugs_title: "Fatis sobri Insetu di Kama",
        bedbugs_stat: "<i class='fas fa-exclamation-triangle'></i> Insetu di kama ta pega karona – ta viaja na mala, roupa, móveis uzadu.",
        bedbugs_what_title: "KÊLÉ INSETU DI KAMA?",
        bedbugs_what_text: "Insetu di kama é insetu pikininu ki ta xupa sangri. Adultu ten másumenus 1/4 pulgada, kór marron. Ta sconde na raxadura, kolxons, mola di kolxon, cabeceira. Ativu anoti, pode vive mêz sin kume.",
        bedbugs_why_title: "PAKÉ TA VOLTA?",
        bedbugs_why_text: "Menus uzu di inseticida forte i viajen aumentadu. Ka ten a ver ku limpeza di kaza.",
        bedbugs_health_title: "EFEITU PA SAÚDE",
        bedbugs_bites_title: "Mordedura & Reakson",
        bedbugs_bite1: "<i class='fas fa-hand-holding-heart'></i> Inchasu vermelhu, kosedura",
        bedbugs_bite2: "<i class='fas fa-sleeping'></i> Difikuldade pa durmi, ansiedade",
        bedbugs_bite3: "<i class='fas fa-lungs'></i> Fezes/kasula pode ataka asma",
        bedbugs_disease_title: "Riziku di Doença",
        bedbugs_disease_text: "Sem evidénsia ki insetu di kama ta transmiti doença atraves di sangri. Ma kosedura pode kauza infekson na pele.",
        bedbugs_spot_title: "MODI DETEKTA INFESTASON",
        bedbugs_spot1: "<i class='fas fa-hand-sparkles'></i> Mordedura vermelhu na família",
        bedbugs_spot2: "<i class='fas fa-bug'></i> Insetu bibu (pikininu, chatu, marron)",
        bedbugs_spot3: "<i class='fas fa-tint'></i> Mancha ferjadu na lençol",
        bedbugs_spot4: "<i class='fas fa-egg'></i> Ovu pikininu na raxadura",
        bedbugs_spot5: "<i class='fas fa-skin'></i> Pele kai ou txeu fraku",
        bedbugs_control_title: "MODI KONTROLA INSETU DI KAMA",
        bedbugs_pro_title: "Ajuda Profisional",
        bedbugs_pro_text: "Kontrata un profisional di kontrol di praga lisensiadu. Liga RI DEM 401-222-2781 pa lista di profisional.",
        bedbugs_landlord_title: "Responsabilidade di donu di kaza:",
        bedbugs_landlord_text: "Si infestason sta na dos ou más unidade ou área komum, donu é ki ten trata. Kontakta Programa di Moradia Mínimu di bu sidadi se ka rezolvê.",
        bedbugs_diy_title: "Dika pa bu mes",
        bedbugs_diy1: "<i class='fas fa-tshirt'></i> Lava roupa, lençol na aguá kenti i seka na temperatura altu",
        bedbugs_diy2: "<i class='fas fa-couch'></i> Kubri kolxon i travesseiru ku kapa plástiku",
        bedbugs_diy3: "<i class='fas fa-trash-alt'></i> Larga móveis kontaminadu",
        bedbugs_diy4: "<i class='fas fa-hand-sparkles'></i> Aspira tudu i tapa raxadura",
        bedbugs_resource_health: "Informason Saúde RI: 1-800-942-7434",
        bedbugs_resource_dem: "RI DEM Kontrol di Praga: 401-222-2781",
        bedbugs_footer: "Pa infestason persistente na área komum, kontakta Programa di Moradia Mínimu di bu sidadi.",
        
        modal_mold_title: "Fatis sobri Mofo",
        mold_stat: "<i class='fas fa-home'></i> Mofo ta krese undi ten umidade — telhado ku goteira, porão umidu, kazas di banhu, área sin ventilação.",
        mold_what_title: "KÊLÉ MOFO?",
        mold_what_text: "Mofo é un tipu di fungu ki ta floresi na lugar umidu. El ta reprodus através di sporus pikininu ki ta anda na ar. Mofo ta krese na parede, tetu, panu, tapeti, móveis. Maioria é inofensivu, má alguns pode kauza problema pa saúde i estraga kaza.",
        mold_health_title: "EFEITU DI MOFO PA SAÚDE",
        mold_resp_title: "Problema respiratóriu",
        mold_resp1: "<i class='fas fa-allergies'></i> Nariz tapadu, espirro",
        mold_resp2: "<i class='fas fa-cough'></i> Tos, chiadu",
        mold_resp3: "<i class='fas fa-lungs'></i> Ataque asma",
        mold_resp4: "<i class='fas fa-eye'></i> Irritason na olu i pele",
        mold_risk_title: "Ken ki ten más risiku?",
        mold_risk1: "<i class='fas fa-child'></i> Krianças i bebês",
        mold_risk2: "<i class='fas fa-lungs'></i> Pessoas ku asma/alergia",
        mold_risk3: "<i class='fas fa-heartbeat'></i> Pessoas ku sistema imunolóxico fraku",
        mold_risk4: "<i class='fas fa-user-plus'></i> Idozu",
        mold_prevention_title: "MODI PREVENI MOFO",
        mold_moisture_title: "Kontrola Umidade",
        mold_moisture1: "<i class='fas fa-fan'></i> Uza ventilador na kaza di banhu i cozinha",
        mold_moisture2: "<i class='fas fa-water'></i> Konserta goteira dretu",
        mold_moisture3: "<i class='fas fa-wind'></i> Manten umidade abaixo di 50%",
        mold_moisture4: "<i class='fas fa-drain'></i> Garante drenajen bon na redor di kaza",
        mold_clean_title: "Limpeza & Ventilason",
        mold_clean1: "<i class='fas fa-window-maximize'></i> Abri janela sempre ki posivel",
        mold_clean2: "<i class='fas fa-soap'></i> Limpa superfísi ku mofo ku detergenti i aguá",
        mold_clean3: "<i class='fas fa-trash-alt'></i> Retira material umidu (tapeti, parede) si ka seka drentu 48 oras",
        mold_cleanup_title: "ORIENTASÕES PA LIMPEZA DI MOFO",
        mold_cleanup1: "<i class='fas fa-mask'></i> Uza máskara N-95, luva i óklu di protekson",
        mold_cleanup2: "<i class='fas fa-wind'></i> Abri janela pa ventilason",
        mold_cleanup3: "<i class='fas fa-soap'></i> Esfrega superfísi duru ku detergenti i aguá, dipos seka total",
        mold_cleanup4: "<i class='fas fa-trash'></i> Larga material porozu (titu, tapeti) si ten mofo",
        mold_cleanup5: "<i class='fas fa-biohazard'></i> Pa infestason grandi (>10 pés quadradu), konsidera ajuda profisional",
        mold_resources_title: "Rekursu i Dikas",
        mold_resource_housing: "Autoridade lokal di moradia",
        mold_resource_landlord: "Responsabilidade donu di kaza: aviza problema di umidade",
        mold_footer: "Si bu odja mofo, age dretu pa limpa i seka. Problema di umidade persistenti meste reparu profisional. Pa preokupason di saúde, konsulta doktor."
    },
    en: {
        main_title: "Rhode Island Community Health Resources",
        subhead: "Information & Guides for Cabo Verdean Community",
        btn_pre_adoption: "Pre-Adoption Birth",
        btn_addiction: "Addiction Is A Disease",
        btn_co: "Carbon Monoxide Poisoning",
        btn_equity: "Health Equity Zones (RI)",
        btn_overdose: "How to Respond to an Overdose",
        btn_perinatal: "Perinatal Substance Use Trifold Brochure",
        btn_bedbugs: "Some Facts About Bed Bugs",
        btn_mold: "Some Facts About Mold",
        btn_preparedness: "3 Preparedness Steps",
        btn_chw: "What is a Community Health Worker",
        install_app: "Install Somos.CV App",
        
        modal_pre_title: "Pre-Adoption Birth",
        pre_stat: "<i class='fas fa-heart'></i> Every birth parent deserves compassionate support and clear information about their options.",
        pre_what_title: "What is Pre-Adoption Birth Support?",
        pre_what_text: "Pre-adoption birth services provide emotional, medical, and legal support for individuals considering adoption for their child. These services ensure that birth parents understand their rights, receive proper prenatal care, and have access to counseling throughout the process.",
        pre_rights_title: "Your Rights as a Birth Parent",
        pre_right1: "<i class='fas fa-check-circle'></i> Right to receive unbiased information about adoption options.",
        pre_right2: "<i class='fas fa-check-circle'></i> Right to choose the adoptive family or agency.",
        pre_right3: "<i class='fas fa-check-circle'></i> Right to legal representation and counseling.",
        pre_right4: "<i class='fas fa-check-circle'></i> Right to withdraw consent within a specified timeframe (varies by state).",
        pre_right5: "<i class='fas fa-check-circle'></i> Right to receive post-placement support and medical care.",
        pre_resources_title: "Resources in Rhode Island",
        pre_resource_helpline: "RI Adoption Helpline: 1-800-555-1234",
        pre_resource_legal: "RI Legal Services: 401-274-2652",
        pre_resource_counseling: "Adoption Counseling: 401-421-5790",
        pre_resource_medical: "Prenatal Care: 1-800-942-7434",
        pre_footer: "If you are considering adoption, speak with a trusted counselor or social worker to understand all your options. You are not alone.",
        
        modal_addiction_title: "Addiction Is A Disease",
        addiction_stat: "<i class='fas fa-chart-line'></i> Addiction is a chronic brain disease, not a moral failing. Recovery is possible with treatment and support.",
        addiction_what_title: "What Is Addiction?",
        addiction_what_text: "Addiction is a treatable, chronic medical disease involving complex interactions among brain circuits, genetics, the environment, and an individual's life experiences. People with addiction use substances or engage in behaviors that become compulsive and often continue despite harmful consequences.",
        addiction_signs_title: "Signs of Addiction",
        addiction_sign1: "<i class='fas fa-capsules'></i> Loss of control over substance use",
        addiction_sign2: "<i class='fas fa-hand-peace'></i> Cravings and preoccupation",
        addiction_sign3: "<i class='fas fa-bed'></i> Neglecting responsibilities",
        addiction_sign4: "<i class='fas fa-users'></i> Withdrawal from family and friends",
        addiction_sign5: "<i class='fas fa-chart-simple'></i> Tolerance (needing more to feel effects)",
        addiction_sign6: "<i class='fas fa-exclamation-triangle'></i> Continued use despite harm",
        addiction_treatment_title: "Treatment & Recovery",
        addiction_treat1: "<i class='fas fa-phone-alt'></i> Call SAMHSA National Helpline: 1-800-662-4357 (confidential, 24/7)",
        addiction_treat2: "<i class='fas fa-hospital-user'></i> Rhode Island Buprenorphine & Naloxone Helpline: 401-606-5456",
        addiction_treat3: "<i class='fas fa-hand-holding-heart'></i> Local support: Alcoholics Anonymous, Narcotics Anonymous, SMART Recovery",
        addiction_treat4: "<i class='fas fa-check-circle'></i> Medications for opioid use disorder (methadone, buprenorphine, naltrexone) are effective.",
        addiction_resource_ri: "RI Department of Behavioral Healthcare",
        addiction_resource_riphone: "401-462-4691",
        addiction_footer: "Recovery is possible. Compassion and support save lives. If you or someone you love is struggling, reach out today.",
        
        modal_overdose_title: "How to Respond to an Overdose",
        overdose_stat: "<i class='fas fa-clock'></i> Every second counts. Know the signs and act quickly.",
        overdose_recognize_title: "Recognize an Overdose",
        overdose_sig1: "<i class='fas fa-face-sleeping'></i> Person is unresponsive or won't wake up",
        overdose_sig2: "<i class='fas fa-lungs'></i> Breathing is slow, shallow, or stopped",
        overdose_sig3: "<i class='fas fa-hand-peace'></i> Blue or gray lips/fingertips",
        overdose_sig4: "<i class='fas fa-syringe'></i> Choking or gurgling sounds",
        overdose_sig5: "<i class='fas fa-heartbeat'></i> Limp body, pale skin",
        overdose_action_title: "Steps to Respond",
        overdose_step1: "Give clear location. Tell them the person is not breathing or unresponsive. Rhode Island's Good Samaritan Law protects you and the person from prosecution for drug possession.",
        overdose_step2: "If available, use naloxone (Narcan) nasal spray or injectable. It reverses opioid overdoses with no harmful effects if given to someone not overdosing. Free naloxone is available at many pharmacies and community organizations.",
        overdose_step3: "Tilt head back, lift chin, pinch nose, give one breath every 5 seconds. Continue until person breathes on their own or EMS arrives.",
        overdose_step4: "Place them in the recovery position (on side) if they are breathing but unconscious. Stay until help arrives.",
        overdose_naloxone_title: "Where to Get Naloxone",
        overdose_naloxone1: "Participating pharmacies (no prescription needed)",
        overdose_naloxone2: "Community overdose prevention programs",
        overdose_naloxone3: "RI Naloxone Hotline: 401-222-5960",
        overdose_footer: "You can save a life. Carry naloxone, learn the signs, and act immediately.",
        
        modal_perinatal_title: "Perinatal Substance Use Trifold Brochure",
        perinatal_stat: "<i class='fas fa-fetus'></i> Support for a healthy pregnancy and baby starts with compassion, not judgment.",
        perinatal_why_title: "Why It Matters",
        perinatal_why_text: "Substance use during pregnancy can affect both mother and baby. But with proper care, treatment, and support, families can achieve healthy outcomes. Stigma often prevents women from seeking help – we are here to support you.",
        perinatal_risks_title: "Potential Risks",
        perinatal_risk1: "Preterm birth and low birth weight",
        perinatal_risk2: "Neonatal abstinence syndrome (NAS)",
        perinatal_risk3: "Developmental delays",
        perinatal_risk4: "High blood pressure and preeclampsia",
        perinatal_risk5: "Infections (HIV, hepatitis)",
        perinatal_risk6: "Mental health challenges",
        perinatal_support_title: "Get Support – No Judgment",
        perinatal_sup1: "<strong>Project RESPECT:</strong> Integrated prenatal care and substance use treatment at Women & Infants Hospital – 401-274-1122",
        perinatal_sup2: "<strong>RI Parent Support Network:</strong> 401-467-6855",
        perinatal_sup3: "<strong>Substance Use Helpline for Pregnant Women:</strong> 1-800-662-4357",
        perinatal_tips_title: "Tips for a Healthy Pregnancy",
        perinatal_tip1: "Early prenatal care",
        perinatal_tip2: "Medication-assisted treatment (MAT) is safe",
        perinatal_tip3: "Attend all pediatric appointments",
        perinatal_tip4: "Breastfeeding support if appropriate",
        perinatal_footer: "You are not alone. Asking for help is a sign of strength. A healthy future for you and your baby is possible.",
        
        modal_preparedness_title: "3 Preparedness Steps",
        prep_stat: "<i class='fas fa-shield-alt'></i> Being prepared can save lives. Start with these three steps.",
        prep_step1_title: "1. Make a Plan",
        prep_plan1: "Discuss with family how you will contact each other.",
        prep_plan2: "Choose two meeting places: one near home, one outside the neighborhood.",
        prep_plan3: "Know evacuation routes and shelter locations.",
        prep_plan4: "Include pets in your plan.",
        prep_step2_title: "2. Build a Kit",
        prep_kit1: "Water (1 gallon per person per day, 3 days)",
        prep_kit2: "Non-perishable food (3 days)",
        prep_kit3: "Flashlight, batteries, radio",
        prep_kit4: "First aid kit",
        prep_kit5: "Medications and medical supplies",
        prep_kit6: "Important documents (copies)",
        prep_kit7: "Cash, phone charger, blankets",
        prep_kit8: "Diapers, wipes, baby formula if needed",
        prep_step3_title: "3. Stay Informed",
        prep_inform1: "Sign up for RI Emergency Alerts: <a href='https://riema.ri.gov' target='_blank'>riema.ri.gov</a>",
        prep_inform2: "Know your local radio stations for emergency updates.",
        prep_inform3: "Monitor weather forecasts and community advisories.",
        prep_footer: "Prepare today for peace of mind tomorrow. Review your plan every year and update kits as needed.",
        
        modal_chw_title: "What is a Community Health Worker",
        chw_stat: "<i class='fas fa-hand-holding-heart'></i> CHWs are trusted members of the community who connect people to health care and social services.",
        chw_role_title: "Role of a Community Health Worker",
        chw_role_text: "A Community Health Worker (CHW) is a frontline public health worker who is a trusted member of the community they serve. They bridge gaps between health services and individuals, providing culturally appropriate support, health education, and navigation assistance.",
        chw_help_title: "How CHWs Help",
        chw_help1: "Schedule medical appointments",
        chw_help2: "Arrange transportation to appointments",
        chw_help3: "Provide nutrition and wellness coaching",
        chw_help4: "Help with insurance applications",
        chw_help5: "Offer language interpretation",
        chw_help6: "Link to housing, food, and employment resources",
        chw_find_title: "Find a CHW in Rhode Island",
        chw_find1: "Many community health centers and clinics employ CHWs.",
        chw_find2: "Contact the RI Community Health Worker Association: <a href='https://www.richwa.org' target='_blank'>richwa.org</a>",
        chw_find3: "Call 2-1-1 and ask for CHW services in your area.",
        chw_career: "Interested in becoming a CHW? Training available through local colleges and health departments.",
        chw_footer: "CHWs are your neighbors, helping you navigate the health system. Reach out – they are here for you.",
        
        modal_co_title: "Carbon Monoxide Poisoning",
        co_stat: "<i class='fas fa-calendar-alt'></i> EACH YEAR HUNDREDS OF PEOPLE IN THE UNITED STATES DIE FROM UNINTENTIONAL EXPOSURE TO CARBON MONOXIDE POISONING.",
        co_what_title: "WHAT IS CARBON MONOXIDE POISONING?",
        co_what_text: "Carbon Monoxide (CO) is a gas produced by burning any type of fuel – gas, oil, kerosene, wood, or charcoal. It's invisible and odorless. Breathing too much can be deadly.",
        co_prevent_title: "Know how to prevent carbon monoxide poisoning!",
        co_install_title: "Installation & Maintenance",
        co_install_1: "<i class='fas fa-check-circle'></i> Read and follow instructions when installing appliances.",
        co_install_2: "<i class='fas fa-check-circle'></i> Always maintain appliances according to manufacturer's recommendations.",
        co_install_3: "<i class='fas fa-check-circle'></i> Install CO detectors in several areas of your home.",
        co_install_4: "<i class='fas fa-check-circle'></i> Test CO alarms routinely and replace batteries.",
        co_alarm_title: "CO Alarms Reminder",
        co_alarm_text: "CO alarms provide peace of mind but are not a substitute for proper installation, use, and maintenance of appliances.",
        co_sources_title: "SOURCES OF CARBON MONOXIDE",
        co_source1: "<i class='fas fa-car'></i> Exhaust from auto or generator in garage",
        co_source2: "<i class='fas fa-fire'></i> Room heater, malfunctioning range, gas oven",
        co_source3: "<i class='fas fa-industry'></i> Generator exhaust in home, basement, or crawlspace",
        co_source4: "<i class='fas fa-water'></i> Rusting or water streaking on vent/chimney",
        co_source5: "<i class='fas fa-brick'></i> Loose masonry on chimney, sooting, debris falling",
        co_symptoms_title: "Know the signs of CO poisoning!",
        co_symptoms_initial_title: "Initial symptoms:",
        co_symptom1: "<i class='fas fa-headache'></i> Headache",
        co_symptom2: "<i class='fas fa-dizzy'></i> Dizziness",
        co_symptom3: "<i class='fas fa-vomit'></i> Nausea",
        co_symptom4: "<i class='fas fa-bed'></i> Fatigue",
        co_symptom5: "<i class='fas fa-lungs'></i> Shortness of breath",
        co_symptoms_additional_title: "Additional signs:",
        co_symptom_add1: "<i class='fas fa-home'></i> Headaches only while indoors",
        co_symptom_add2: "<i class='fas fa-tree'></i> You feel better when outdoors",
        co_symptom_add3: "<i class='fas fa-users'></i> Others have same symptoms",
        co_what_to_do_title: "<i class='fas fa-hand-holding-heart'></i> What to do if you have symptoms:",
        co_action1: "<i class='fas fa-door-open'></i> Leave area immediately, get fresh air.",
        co_action2: "<i class='fas fa-phone-alt'></i> If severe, call 911 from another location.",
        co_action3: "<i class='fas fa-fire-extinguisher'></i> Call fire department to check CO level.",
        co_action4: "<i class='fas fa-hospital-user'></i> Contact Poison Center 800-222-1222.",
        co_action5: "<i class='fas fa-stethoscope'></i> See doctor if symptoms persist.",
        co_unvented_warning: "<i class='fas fa-ban'></i> UNVENTED HEATERS ARE UNSAFE!",
        co_resources_title: "Resources",
        co_resource_poison: "Poison Control: 800-222-1222",
        co_resource_fire: "Local Fire Dept: 911",
        co_footer: "Information adapted from U.S. Consumer Product Safety Commission. For emergencies call 911.",
        
        modal_equity_title: "Health Equity Zones – Rhode Island",
        hez_stat: "<i class='fas fa-chart-line'></i> 80% of health is determined outside the doctor's office — in our homes, schools, jobs, and neighborhoods.",
        hez_what_title: "WHAT ARE HEALTH EQUITY ZONES?",
        hez_what_text: "Health Equity Zones (HEZs) are place-based initiatives that bring communities together to build healthy, resilient communities. Led by residents and community partners, each HEZ identifies unique social, economic, and environmental factors affecting health and implements data-driven action plans to address them.",
        hez_determinants_title: "DETERMINANTS OF HEALTH",
        hez_det_chart_title: "What shapes our health?",
        hez_det_behaviors: "<i class='fas fa-running'></i> Health Behaviors: 30%",
        hez_det_genes: "<i class='fas fa-dna'></i> Genes & Clinical Care: 20%",
        hez_det_social: "<i class='fas fa-city'></i> Social/Economic/Environmental Factors: 50%",
        hez_det_framework: "Based on Tarlov & Kindig frameworks",
        hez_equity_title: "Equity vs Equality",
        hez_equity_text: "Equality gives everyone the same resources. Equity gives each community what they need to have a fair chance at good health. Place matters.",
        hez_impact_title: "IMPACT ACROSS RHODE ISLAND",
        hez_impact1: "<i class='fas fa-brain'></i> <strong>Mental Health First Aid:</strong> Washington County HEZ trained 1,000+ police, clergy, teachers.",
        hez_impact2: "<i class='fas fa-tree'></i> <strong>Complete & Green Streets:</strong> Pawtucket/CF HEZ helped pass first statewide ordinance for safe streets.",
        hez_impact3: "<i class='fas fa-walking'></i> <strong>Walking School Bus:</strong> Olneyville HEZ boosted school attendance.",
        hez_impact4: "<i class='fas fa-smoking-ban'></i> <strong>Smoke-Free Parks:</strong> Bristol HEZ banned smoking/vaping in all town parks.",
        hez_impact5: "<i class='fas fa-handcuffs'></i> <strong>Diversion to Treatment:</strong> West Warwick HEZ embedded clinician with police for substance use.",
        hez_impact6: "<i class='fas fa-home'></i> <strong>Housing Advocacy:</strong> Southside HEZ advanced equitable housing policy.",
        hez_get_involved_title: "HOW TO GET INVOLVED",
        hez_involve1: "<i class='fas fa-hand-holding-usd'></i> Invest in existing HEZs to sustain their work.",
        hez_involve2: "<i class='fas fa-handshake'></i> Partner with RIDOH to seed fund a new HEZ.",
        hez_involve3: "<i class='fas fa-building'></i> Become a \"backbone\" organization for a HEZ.",
        hez_involve4: "<i class='fas fa-gavel'></i> Advocate for place-based funding policies.",
        hez_involve5: "<i class='fas fa-users'></i> Support community-led processes in your neighborhood.",
        hez_phone: "RI Health Info Line: 1-800-942-7434",
        hez_footer: "Health Equity Zones are Rhode Island's signature initiative to build healthy communities where everyone has a fair chance to thrive.",
        
        modal_bedbugs_title: "Some Facts About Bed Bugs",
        bedbugs_stat: "<i class='fas fa-exclamation-triangle'></i> Bed bugs are hitchhikers — they travel in luggage, clothing, and used furniture.",
        bedbugs_what_title: "WHAT ARE BED BUGS?",
        bedbugs_what_text: "Bed bugs are small, flat insects that feed on blood. Adults are about 1/4 inch (size of a pencil width), reddish-brown. They hide in cracks, mattresses, box springs, and headboards. Active at night, they live months without feeding.",
        bedbugs_why_title: "WHY ARE THEY MAKING A COMEBACK?",
        bedbugs_why_text: "Less use of harsh chemicals and increased travel have allowed bed bugs to spread. They are excellent hitchhikers and can infest any home regardless of cleanliness.",
        bedbugs_health_title: "HEALTH EFFECTS",
        bedbugs_bites_title: "Bites & Reactions",
        bedbugs_bite1: "<i class='fas fa-hand-holding-heart'></i> Raised red welts, itching",
        bedbugs_bite2: "<i class='fas fa-sleeping'></i> Sleeplessness, anxiety",
        bedbugs_bite3: "<i class='fas fa-lungs'></i> Feces/casings can trigger asthma",
        bedbugs_disease_title: "Disease Risk",
        bedbugs_disease_text: "No evidence bed bugs transmit bloodborne diseases. However, scratching can lead to skin infections.",
        bedbugs_spot_title: "HOW TO SPOT AN INFESTATION",
        bedbugs_spot1: "<i class='fas fa-hand-sparkles'></i> Raised red bites on family members",
        bedbugs_spot2: "<i class='fas fa-bug'></i> Live bed bugs (small, flat, brown)",
        bedbugs_spot3: "<i class='fas fa-tint'></i> Rusty or reddish spots on sheets",
        bedbugs_spot4: "<i class='fas fa-egg'></i> Tiny eggs in cracks/crevices",
        bedbugs_spot5: "<i class='fas fa-skin'></i> Shed skins or musty odor",
        bedbugs_control_title: "HOW TO CONTROL BED BUGS",
        bedbugs_pro_title: "Professional Help",
        bedbugs_pro_text: "Hire a licensed pest control professional. Call RI DEM at 401-222-2781 for a list of licensed professionals.",
        bedbugs_landlord_title: "Landlord responsibility:",
        bedbugs_landlord_text: "If infestation is in two or more units or common areas, owner must treat. Contact local Minimum Housing if unresolved.",
        bedbugs_diy_title: "Do-It-Yourself Tips",
        bedbugs_diy1: "<i class='fas fa-tshirt'></i> Wash clothes/sheets in hot water & dry on high heat",
        bedbugs_diy2: "<i class='fas fa-couch'></i> Encase mattresses & pillows in plastic covers",
        bedbugs_diy3: "<i class='fas fa-trash-alt'></i> Discard heavily infested furniture",
        bedbugs_diy4: "<i class='fas fa-hand-sparkles'></i> Vacuum thoroughly and seal cracks",
        bedbugs_resource_health: "RI Health Info: 1-800-942-7434",
        bedbugs_resource_dem: "RI DEM Pest Control: 401-222-2781",
        bedbugs_footer: "For persistent infestations involving shared spaces, contact your city/town Minimum Housing Program.",
        
        modal_mold_title: "Some Facts About Mold",
        mold_stat: "<i class='fas fa-home'></i> Mold grows where moisture is present — leaky roofs, damp basements, bathrooms, and areas with poor ventilation.",
        mold_what_title: "WHAT IS MOLD?",
        mold_what_text: "Mold is a type of fungus that thrives in damp, humid conditions. It reproduces through tiny spores that travel through the air. Mold can grow on walls, ceilings, fabrics, carpets, and furniture. While most molds are harmless, some can cause health problems and damage your home.",
        mold_health_title: "HEALTH EFFECTS OF MOLD",
        mold_resp_title: "Respiratory issues",
        mold_resp1: "<i class='fas fa-allergies'></i> Nasal stuffiness, sneezing",
        mold_resp2: "<i class='fas fa-cough'></i> Cough, wheezing",
        mold_resp3: "<i class='fas fa-lungs'></i> Asthma triggers",
        mold_resp4: "<i class='fas fa-eye'></i> Eye & skin irritation",
        mold_risk_title: "Who is at higher risk?",
        mold_risk1: "<i class='fas fa-child'></i> Children & infants",
        mold_risk2: "<i class='fas fa-lungs'></i> People with asthma/allergies",
        mold_risk3: "<i class='fas fa-heartbeat'></i> Immunocompromised individuals",
        mold_risk4: "<i class='fas fa-user-plus'></i> Elderly adults",
        mold_prevention_title: "HOW TO PREVENT MOLD GROWTH",
        mold_moisture_title: "Control Moisture",
        mold_moisture1: "<i class='fas fa-fan'></i> Use exhaust fans in bathrooms & kitchen",
        mold_moisture2: "<i class='fas fa-water'></i> Fix leaks promptly",
        mold_moisture3: "<i class='fas fa-wind'></i> Keep humidity below 50%",
        mold_moisture4: "<i class='fas fa-drain'></i> Ensure proper drainage around house",
        mold_clean_title: "Clean & Ventilate",
        mold_clean1: "<i class='fas fa-window-maximize'></i> Open windows when possible",
        mold_clean2: "<i class='fas fa-soap'></i> Clean moldy surfaces with detergent & water",
        mold_clean3: "<i class='fas fa-trash-alt'></i> Remove wet materials (carpets, drywall) if not dried within 48h",
        mold_cleanup_title: "MOLD CLEANUP GUIDELINES",
        mold_cleanup1: "<i class='fas fa-mask'></i> Wear N-95 mask, gloves, and goggles",
        mold_cleanup2: "<i class='fas fa-wind'></i> Open windows for ventilation",
        mold_cleanup3: "<i class='fas fa-soap'></i> Scrub hard surfaces with detergent and water, then dry completely",
        mold_cleanup4: "<i class='fas fa-trash'></i> Throw away porous materials (ceiling tiles, carpet) if moldy",
        mold_cleanup5: "<i class='fas fa-biohazard'></i> For large infestations (>10 sq ft), consider professional help",
        mold_resources_title: "Resources & Tips",
        mold_resource_housing: "Local housing authority",
        mold_resource_landlord: "Landlord responsibility: report moisture issues",
        mold_footer: "If you see mold, act quickly to clean and dry. Persistent moisture problems require professional repair. For health concerns, consult a doctor."
    }
};

// ====================== LANGUAGE SWITCHER ======================
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const currentLangSpan = document.getElementById('current-lang-label');

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
});
document.addEventListener('click', (e) => {
    if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('show');
    }
});

function setLanguage(langCode) {
    const langNames = { kea: "Kriolu (Cabo Verde)", en: "English" };
    currentLangSpan.textContent = langNames[langCode];
    const t = translations[langCode] || translations.kea;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });
    document.documentElement.lang = langCode === 'kea' ? 'kea' : 'en';
    langDropdown.classList.remove('show');
}

document.querySelectorAll('.lang-dropdown a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage(link.getAttribute('data-lang'));
    });
});

// ====================== MODAL FUNCTIONALITY ======================
const modals = document.querySelectorAll('.modal-overlay');
const closeButtons = document.querySelectorAll('.close-modal');

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        openModal(modalId);
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modal = btn.closest('.modal-overlay');
        if (modal) closeModal(modal);
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) closeModal(modal);
        });
    }
});

setLanguage('kea');

// ====================== ACCESSIBILITY TOGGLES ======================
const bodyEl = document.body;
const largeTextBtn = document.getElementById('a11y-large-text');
const highContrastBtn = document.getElementById('a11y-high-contrast');

function updateActiveStates() {
    if (largeTextBtn) largeTextBtn.classList.toggle('active', bodyEl.classList.contains('large-text'));
    if (highContrastBtn) highContrastBtn.classList.toggle('active', bodyEl.classList.contains('high-contrast'));
    localStorage.setItem('a11y-large-text', bodyEl.classList.contains('large-text'));
    localStorage.setItem('a11y-high-contrast', bodyEl.classList.contains('high-contrast'));
}

function toggleLargeText() { bodyEl.classList.toggle('large-text'); updateActiveStates(); }
function toggleHighContrast() { bodyEl.classList.toggle('high-contrast'); updateActiveStates(); }

if (largeTextBtn) largeTextBtn.addEventListener('click', toggleLargeText);
if (highContrastBtn) highContrastBtn.addEventListener('click', toggleHighContrast);

if (localStorage.getItem('a11y-large-text') === 'true') bodyEl.classList.add('large-text');
if (localStorage.getItem('a11y-high-contrast') === 'true') bodyEl.classList.add('high-contrast');
updateActiveStates();

// ====================== PWA (optional service worker) ======================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/health-sw.js', { scope: '/health/' })
        .catch(err => console.log('SW registration failed:', err));
}