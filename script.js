const DATA_VERSION = "16.18.1";

const EN_URL =
    `https://ddragon.leagueoflegends.com/cdn/${DATA_VERSION}/data/en_US/champion.json`;

const KO_URL =
    `https://ddragon.leagueoflegends.com/cdn/${DATA_VERSION}/data/ko_KR/champion.json`;

const IMAGE_URL =
    `https://ddragon.leagueoflegends.com/cdn/${DATA_VERSION}/img/champion/`;


/* =========================================
   INTRO SCREEN
========================================= */

const introScreen =
    document.getElementById("introScreen");

const introStatus =
    document.getElementById("introStatus");

const introMessages = [
    "INITIALIZING COUNTER ENGINE...",
    "LOADING CHAMPION DATABASE...",
    "PREPARING MATCHUP ANALYSIS...",
    "SYSTEM READY."
];

let introIndex = 0;

function updateIntroStatus() {

    if (!introStatus) return;

    introStatus.textContent =
        introMessages[introIndex];

    if (
        introIndex <
        introMessages.length - 1
    ) {
        introIndex++;
    }
}

updateIntroStatus();

const introInterval =
    setInterval(
        updateIntroStatus,
        450
    );

setTimeout(() => {

    clearInterval(introInterval);

    if (introStatus) {

        introStatus.textContent =
            "SYSTEM READY.";

    }

}, 1500);

setTimeout(() => {

    if (introScreen) {

        introScreen.classList.add(
            "finished"
        );

    }

}, 2200);


/* =========================================
   ELEMENTS
========================================= */

const championList =
    document.getElementById(
        "championList"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const matchup =
    document.getElementById(
        "matchup"
    );

const matchupContent =
    document.getElementById(
        "matchupContent"
    );

const closeMatchup =
    document.getElementById(
        "closeMatchup"
    );

const languageButton =
    document.getElementById(
        "languageButton"
    );

const languageText =
    document.getElementById(
        "languageText"
    );


/* =========================================
   LANGUAGE
========================================= */

let currentLanguage = "en";


/* =========================================
   CHAMPION DATA
========================================= */

let englishChampions = {};
let koreanChampions = {};
let champions = {};


/* =========================================
   COMPLETE MATCHUP DATABASE
========================================= */

const matchupData = {

    Aatrox: {

        counters: [
            "Fiora",
            "Gwen",
            "Vayne"
        ],

        countering: [
            "Sion",
            "Ornn",
            "Cho'Gath"
        ],

        advantage: {

            en:
                "Aatrox excels in extended fights because his Q can deal heavy damage while giving him opportunities to heal. His sustain and ability to threaten multiple targets make him dangerous when fights last longer.",

            ko:
                "아트록스는 긴 전투에서 강력합니다. Q를 이용해 높은 피해를 주면서 회복할 수 있으며, 강한 유지력과 여러 적을 압박하는 능력으로 장기전에서 위협적입니다."

        }

    },


    Ahri: {

        counters: [
            "Fizz",
            "Naafiri",
            "Anivia"
        ],

        countering: [
            "Azir",
            "Viktor",
            "Twisted Fate"
        ],

        advantage: {

            en:
                "Ahri combines long-range poke, crowd control, and mobility. Her Charm can create picks while her ultimate allows her to reposition during fights.",

            ko:
                "아리는 긴 사거리, 군중 제어와 기동력을 함께 가지고 있습니다. 매혹으로 적을 잡을 기회를 만들고 궁극기로 전투 중 위치를 빠르게 변경할 수 있습니다."

        }

    },


    Akali: {

        counters: [
            "Lissandra",
            "Galio",
            "Malzahar"
        ],

        countering: [
            "Xerath",
            "Vel'Koz",
            "Karthus"
        ],

        advantage: {

            en:
                "Akali is strongest when she controls the timing of an engagement. Her mobility and Shroud allow her to enter and leave fights while threatening vulnerable targets.",

            ko:
                "아칼리는 교전 타이밍을 조절할 때 강력합니다. 높은 기동력과 장막을 이용해 전투에 진입하고 빠져나오면서 취약한 적을 압박할 수 있습니다."

        }

    },


    Ashe: {

        counters: [
            "Samira",
            "Nilah",
            "Draven"
        ],

        countering: [
            "Jinx",
            "Kog'Maw",
            "Aphelios"
        ],

        advantage: {

            en:
                "Ashe provides damage, reliable slows, vision utility, and long-range engage through her ultimate.",

            ko:
                "애쉬는 피해량뿐만 아니라 안정적인 둔화, 시야 확보와 궁극기를 통한 장거리 이니시에이팅을 제공합니다."

        }

    },


    Darius: {

        counters: [
            "Vayne",
            "Quinn",
            "Kayle"
        ],

        countering: [
            "Garen",
            "Sion",
            "Nasus"
        ],

        advantage: {

            en:
                "Darius becomes increasingly threatening during extended fights. His passive increases his damage pressure and his pull punishes enemies who get too close.",

            ko:
                "다리우스는 장기전에서 더욱 강력해집니다. 패시브로 공격 압박을 높이고 E를 이용해 가까이 접근한 적을 끌어올 수 있습니다."

        }

    },


    Fiora: {

        counters: [
            "Malphite",
            "Gragas",
            "Poppy"
        ],

        countering: [
            "Aatrox",
            "Darius",
            "Sion"
        ],

        advantage: {

            en:
                "Fiora specializes in isolated fights and precise positioning. Her passive rewards hitting Vital points while Riposte can completely change a fight when it blocks an important ability.",

            ko:
                "피오라는 1대1 전투와 정확한 위치 선정에 특화되어 있습니다. 패시브의 급소를 활용할 수 있으며 응수로 핵심 스킬을 막으면 전투의 흐름을 크게 바꿀 수 있습니다."

        }

    },


    Garen: {

        counters: [
            "Vayne",
            "Kayle",
            "Quinn"
        ],

        countering: [
            "Nasus",
            "Sion",
            "Mordekaiser"
        ],

        advantage: {

            en:
                "Garen has reliable sustain and a simple trading pattern. His silence can interrupt enemy responses while his ultimate provides strong execute potential.",

            ko:
                "가렌은 안정적인 유지력과 간단하면서 강력한 교환 능력을 가지고 있습니다. 침묵으로 적의 대응을 방해하고 궁극기로 체력이 낮은 적을 마무리할 수 있습니다."

        }

    },


    Jinx: {

        counters: [
            "Draven",
            "Caitlyn",
            "Samira"
        ],

        countering: [
            "Kog'Maw",
            "Sivir",
            "Aphelios"
        ],

        advantage: {

            en:
                "Jinx becomes extremely dangerous after getting a takedown. Her increased movement and attack speed allow her to rapidly clean up team fights.",

            ko:
                "징크스는 적을 처치한 이후 매우 강력해집니다. 증가한 이동 속도와 공격 속도를 이용해 한타에서 적을 빠르게 정리할 수 있습니다."

        }

    },


    KSante: {

        counters: [
            "Gwen",
            "Fiora",
            "Vayne"
        ],

        countering: [
            "Sion",
            "Ornn",
            "Malphite"
        ],

        advantage: {

            en:
                "K'Sante combines durability, mobility, and crowd control. He can absorb pressure while creating opportunities for his team.",

            ko:
                "크산테는 높은 내구도와 기동력, 군중 제어를 함께 가지고 있습니다. 적의 공격을 받아내면서 아군에게 교전 기회를 만들어낼 수 있습니다."

        }

    },


    Lux: {

        counters: [
            "Fizz",
            "Zed",
            "Naafiri"
        ],

        countering: [
            "Xerath",
            "Vel'Koz",
            "Brand"
        ],

        advantage: {

            en:
                "Lux has strong range and crowd control. She can control areas before fights and punish enemies who enter her ability range.",

            ko:
                "럭스는 뛰어난 사거리와 군중 제어 능력을 가지고 있습니다. 교전 전에 지역을 통제하고 스킬 사거리 안으로 들어오는 적을 압박할 수 있습니다."

        }

    },


    Malphite: {

        counters: [
            "Gwen",
            "Mordekaiser",
            "Vayne"
        ],

        countering: [
            "Yasuo",
            "Tryndamere",
            "Yone"
        ],

        advantage: {

            en:
                "Malphite can absorb physical damage while threatening powerful team-fight engages. His ultimate can dramatically change the position of multiple enemies.",

            ko:
                "말파이트는 물리 피해를 견디면서 강력한 한타 이니시에이팅을 할 수 있습니다. 궁극기로 여러 적의 위치를 한순간에 바꿀 수 있습니다."

        }

    },


    Yasuo: {

        counters: [
            "Malzahar",
            "Anivia",
            "Pantheon"
        ],

        countering: [
            "Xerath",
            "Vel'Koz",
            "Azir"
        ],

        advantage: {

            en:
                "Yasuo has exceptional mobility when there are targets available for his dash. Wind Wall can also block many important ranged abilities.",

            ko:
                "야스오는 돌진할 대상이 많을 때 뛰어난 기동력을 보여줍니다. 바람 장막으로 많은 원거리 챔피언의 핵심 스킬을 막을 수 있습니다."

        }

    },


    Yone: {

        counters: [
            "Renekton",
            "Pantheon",
            "Malphite"
        ],

        countering: [
            "Azir",
            "Xerath",
            "Vel'Koz"
        ],

        advantage: {

            en:
                "Yone combines sustained damage with strong engage. His mixed damage and Spirit Unbound allow him to threaten opponents without immediately committing his body.",

            ko:
                "요네는 지속 피해와 강력한 이니시에이팅을 함께 사용할 수 있습니다. 혼합 피해와 영혼해방을 이용해 자신의 본체를 즉시 위험에 노출하지 않고 적을 압박할 수 있습니다."

        }

    },


    Zed: {

        counters: [
            "Lissandra",
            "Malzahar",
            "Anivia"
        ],

        countering: [
            "Xerath",
            "Vel'Koz",
            "Lux"
        ],

        advantage: {

            en:
                "Zed threatens the enemy backline through burst damage and multiple shadow positions. His shadows give him several attack angles and repositioning options.",

            ko:
                "제드는 폭발적인 피해와 그림자를 이용해 적의 후방을 위협합니다. 여러 그림자를 통해 다양한 공격 각도와 위치 변경 수단을 만들 수 있습니다."

        }

    }

};


/* =========================================
   AUTOMATIC COMPLETE DATABASE
========================================= */

function generateChampionAnalysis(champion) {

    const tags =
        champion.tags || [];

    const name =
        champion.name;

    let counters = [];
    let countering = [];


    const counterPools = {

        Assassin: [
            "Malzahar",
            "Lissandra",
            "Galio"
        ],

        Mage: [
            "Fizz",
            "Zed",
            "Naafiri"
        ],

        Marksman: [
            "Draven",
            "Caitlyn",
            "Samira"
        ],

        Tank: [
            "Gwen",
            "Fiora",
            "Vayne"
        ],

        Fighter: [
            "Vayne",
            "Quinn",
            "Kayle"
        ],

        Support: [
            "Blitzcrank",
            "Nautilus",
            "Thresh"
        ]

    };


    const counteringPools = {

        Assassin: [
            "Xerath",
            "Vel'Koz",
            "Lux"
        ],

        Mage: [
            "Yasuo",
            "Fizz",
            "Kassadin"
        ],

        Marksman: [
            "Kog'Maw",
            "Sivir",
            "Aphelios"
        ],

        Tank: [
            "Sion",
            "Ornn",
            "Malphite"
        ],

        Fighter: [
            "Sion",
            "Ornn",
            "Malphite"
        ],

        Support: [
            "Jinx",
            "Kog'Maw",
            "Aphelios"
        ]

    };


    for (const tag of tags) {

        if (counterPools[tag]) {

            counters =
                counterPools[tag]
                    .filter(
                        championName =>
                            championName !== name
                    )
                    .slice(0, 3);

            break;

        }

    }


    for (const tag of tags) {

        if (counteringPools[tag]) {

            countering =
                counteringPools[tag]
                    .filter(
                        championName =>
                            championName !== name
                    )
                    .slice(0, 3);

            break;

        }

    }


    let advantageEn =
        `${name} has a distinct gameplay identity built around its champion kit. `;

    let advantageKo =
        `${name}은 고유한 스킬 구성과 플레이스타일을 바탕으로 전투에서 강점을 만들어내는 챔피언입니다. `;


    if (tags.includes("Assassin")) {

        advantageEn +=
            "Its mobility and burst potential allow it to punish vulnerable targets and threaten the enemy backline.";

        advantageKo +=
            "높은 기동력과 순간 피해를 이용해 취약한 적을 처치하고 적의 후방을 위협할 수 있습니다.";

    }

    else if (tags.includes("Mage")) {

        advantageEn +=
            "Its ability-based damage and range allow it to control areas, punish positioning mistakes, and influence fights from a distance.";

        advantageKo +=
            "스킬 기반 피해와 사거리를 이용해 지역을 통제하고 상대의 위치 실수를 공격하며 원거리에서 교전에 영향을 줄 수 있습니다.";

    }

    else if (tags.includes("Marksman")) {

        advantageEn +=
            "Its ranged damage allows it to continuously pressure opponents while maintaining distance during fights.";

        advantageKo +=
            "원거리 공격을 통해 거리를 유지하면서 지속적으로 적에게 피해를 줄 수 있습니다.";

    }

    else if (tags.includes("Tank")) {

        advantageEn +=
            "Its durability allows it to absorb pressure while creating opportunities through crowd control and frontline presence.";

        advantageKo +=
            "높은 내구도를 바탕으로 적의 공격을 받아내면서 군중 제어와 전방 압박으로 아군에게 기회를 만들어낼 수 있습니다.";

    }

    else if (tags.includes("Fighter")) {

        advantageEn +=
            "Its combination of durability and sustained damage makes it effective in extended fights and close-range skirmishes.";

        advantageKo +=
            "내구도와 지속 피해를 함께 활용할 수 있어 장기적인 교전과 근거리 싸움에서 강점을 보입니다.";

    }

    else if (tags.includes("Support")) {

        advantageEn +=
            "Its utility can influence fights through crowd control, protection, and setup for teammates.";

        advantageKo +=
            "군중 제어, 보호, 아군 보조 능력을 통해 교전의 흐름을 바꾸고 팀원에게 유리한 상황을 만들어낼 수 있습니다.";

    }

    else {

        advantageEn +=
            "Its abilities allow it to create pressure when its strengths are used at the right time.";

        advantageKo +=
            "스킬의 강점을 적절한 타이밍에 활용하면 교전에서 강한 압박을 만들어낼 수 있습니다.";

    }


    return {

        counters,

        countering,

        advantage: {

            en: advantageEn,

            ko: advantageKo

        }

    };

}


/* =========================================
   BUILD COMPLETE DATABASE
========================================= */

function buildCompleteMatchupDatabase() {

    Object.values(
        englishChampions
    ).forEach(champion => {

        if (matchupData[champion.id]) {
            return;
        }

        matchupData[champion.id] =
            generateChampionAnalysis(
                champion
            );

    });

}


/* =========================================
   LOAD DATA
========================================= */

async function loadChampions() {

    if (!championList) return;

    championList.innerHTML = `
        <p class="loading">
            Loading champions...
        </p>
    `;


    try {

        const [
            englishResponse,
            koreanResponse
        ] = await Promise.all([

            fetch(EN_URL),
            fetch(KO_URL)

        ]);


        if (
            !englishResponse.ok ||
            !koreanResponse.ok
        ) {

            throw new Error(
                "Champion data failed."
            );

        }


        const englishData =
            await englishResponse.json();

        const koreanData =
            await koreanResponse.json();


        englishChampions =
            englishData.data;

        koreanChampions =
            koreanData.data;

        champions =
            englishChampions;


        buildCompleteMatchupDatabase();

        displayChampions();


    } catch (error) {

        console.error(error);

        championList.innerHTML = `

            <p class="error">

                Failed to load champion data.

                <br>

                챔피언 데이터를 불러오지 못했습니다.

            </p>

        `;

    }

}


/* =========================================
   LANGUAGE SWITCH
========================================= */

function setLanguage(language) {

    currentLanguage =
        language;


    document
        .querySelectorAll("[data-en]")
        .forEach(element => {

            if (language === "ko") {

                element.textContent =
                    element.dataset.ko;

            } else {

                element.textContent =
                    element.dataset.en;

            }

        });


    if (language === "ko") {

        if (languageText) {

            languageText.textContent =
                "KOR";

        }

        if (searchInput) {

            searchInput.placeholder =
                "챔피언 검색...";

        }

        champions =
            koreanChampions;

    }

    else {

        if (languageText) {

            languageText.textContent =
                "ENG";

        }

        if (searchInput) {

            searchInput.placeholder =
                "Search champion...";

        }

        champions =
            englishChampions;

    }


    if (searchInput) {

        displayChampions(
            searchInput.value
        );

    }

    else {

        displayChampions();

    }


    document.documentElement.lang =
        language === "ko"
            ? "ko"
            : "en";

}


/* =========================================
   LANGUAGE BUTTON
========================================= */

if (languageButton) {

    languageButton.addEventListener(
        "click",
        () => {

            if (
                currentLanguage === "en"
            ) {

                setLanguage("ko");

            }

            else {

                setLanguage("en");

            }

        }
    );

}


/* =========================================
   DISPLAY CHAMPIONS
========================================= */

function displayChampions(search = "") {

    if (!championList) return;

    championList.innerHTML = "";


    const searchText =
        search
            .toLowerCase()
            .trim();


    const filtered =
        Object.values(champions)
            .filter(champion => {

                return (

                    champion.name
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    champion.id
                        .toLowerCase()
                        .includes(searchText)

                );

            });


    if (filtered.length === 0) {

        championList.innerHTML = `

            <p class="error">

                ${
                    currentLanguage === "ko"
                        ? "챔피언을 찾을 수 없습니다."
                        : "No champion found."
                }

            </p>

        `;

        return;

    }


    filtered.forEach(champion => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "champion-card";


        const icon =
            IMAGE_URL +
            champion.image.full;


        card.innerHTML = `

            <img
                class="champion-icon"
                src="${icon}"
                alt="${champion.name}"
            >

            <div class="champion-info">

                <div class="champion-name">
                    ${champion.name}
                </div>

                <div class="champion-role">
                    ${champion.tags.join(" / ")}
                </div>

            </div>

        `;


        card.addEventListener(
            "click",
            () => showChampion(champion)
        );


        championList.appendChild(card);

    });

}


/* =========================================
   CREATE COUNTER LIST
========================================= */

function createCounterList(
    names,
    label
) {

    if (
        !names ||
        names.length === 0
    ) {

        return `

            <div class="counter-item">

                <strong>

                    ${
                        currentLanguage === "ko"
                            ? "데이터 없음"
                            : "No data"
                    }

                </strong>

            </div>

        `;

    }


    return names
        .map(name => {

            const champion =
                Object.values(
                    englishChampions
                ).find(
                    c => c.name === name
                );


            let displayName =
                name;


            if (
                currentLanguage === "ko" &&
                champion &&
                koreanChampions[
                    champion.id
                ]
            ) {

                displayName =
                    koreanChampions[
                        champion.id
                    ].name;

            }


            return `

                <div
                    class="counter-item"
                    data-champion="${name}"
                >

                    <strong>
                        ${displayName}
                    </strong>

                    <span>
                        ${label}
                    </span>

                </div>

            `;

        })
        .join("");

}


/* =========================================
   SHOW CHAMPION
========================================= */

async function showChampion(champion) {

    const englishChampion =
        englishChampions[
            champion.id
        ];

    const koreanChampion =
        koreanChampions[
            champion.id
        ];


    if (
        !englishChampion ||
        !koreanChampion
    ) {

        return;

    }


    const icon =
        IMAGE_URL +
        englishChampion.image.full;


    const data =
        matchupData[
            champion.id
        ] ||
        generateChampionAnalysis(
            englishChampion
        );


    const isKorean =
        currentLanguage === "ko";


    const counters =
        data.counters || [];


    const countering =
        data.countering || [];


    const advantage =
        data.advantage[
            isKorean
                ? "ko"
                : "en"
        ];


    const displayChampion =
        isKorean
            ? koreanChampion.name
            : englishChampion.name;


    const secondaryChampion =
        isKorean
            ? englishChampion.name
            : koreanChampion.name;


    /* =========================================
       SHORT DESCRIPTION
    ========================================= */

    const shortDescription =
        isKorean
            ? koreanChampion.blurb
            : englishChampion.blurb;


    /* =========================================
       MATCHUP HTML
    ========================================= */

    matchupContent.innerHTML = `

        <div class="champion-header">

            <img
                class="large-champion-icon"
                src="${icon}"
                alt="${displayChampion}"
            >

            <div>

                <h2 class="matchup-title">
                    ${displayChampion}
                </h2>

                <p class="champion-subtitle">
                    ${secondaryChampion}
                </p>

                <div class="description-container">

                    <p
                        class="champion-description"
                        id="championDescription"
                    >${shortDescription}</p>

                    <button
                        class="description-toggle"
                        id="descriptionToggle"
                        type="button"
                    >${isKorean ? "더 보기" : "SEE MORE"}</button>

                </div>

            </div>

        </div>


        <div class="matchup-grid">


            <!-- COUNTERS -->

            <div class="matchup-box">

                <div class="counter-header">

                    <h3>

                        🟥

                        ${
                            isKorean
                                ? "카운터"
                                : "Counters"
                        }

                    </h3>

                </div>


                <div class="counter-list">

                    ${
                        createCounterList(
                            counters,
                            isKorean
                                ? "카운터"
                                : "COUNTER"
                        )
                    }

                </div>

            </div>


            <!-- COUNTERING -->

            <div class="matchup-box">

                <div class="counter-header">

                    <h3>

                        🟩

                        ${
                            isKorean
                                ? "카운터하는 챔피언"
                                : "Countering"
                        }

                    </h3>

                </div>


                <div class="counter-list">

                    ${
                        createCounterList(
                            countering,
                            isKorean
                                ? "상대하기 좋음"
                                : "COUNTERING"
                        )
                    }

                </div>

            </div>

        </div>


        <!-- ADVANTAGE -->

        <div class="advantage-box">

            <h3>

                ${
                    isKorean
                        ? "⚡ 챔피언 장점"
                        : "⚡ Champion Advantages"
                }

            </h3>

            <p>
                ${advantage}
            </p>

        </div>

    `;


    /* =========================================
       OPEN MATCHUP
    ========================================= */

    matchup.classList.remove(
        "hidden"
    );


    /* =========================================
       SEE MORE / SEE LESS
    ========================================= */

    const descriptionElement =
        document.getElementById(
            "championDescription"
        );


    const descriptionToggle =
        document.getElementById(
            "descriptionToggle"
        );


    if (
        !descriptionElement ||
        !descriptionToggle
    ) {

        return;

    }


    descriptionToggle.addEventListener(
        "click",
        async () => {


            /* =================================
               COLLAPSE
            ================================= */

            if (
                descriptionElement.classList.contains(
                    "expanded"
                )
            ) {

                descriptionElement.classList.remove(
                    "expanded"
                );


                descriptionElement.textContent =
                    shortDescription;


                descriptionToggle.textContent =
                    isKorean
                        ? "더 보기"
                        : "SEE MORE";


                descriptionToggle.classList.remove(
                    "expanded"
                );


                return;

            }


            /* =================================
               LOADING
            ================================= */

            descriptionToggle.textContent =
                isKorean
                    ? "불러오는 중..."
                    : "LOADING...";


            descriptionToggle.disabled =
                true;


            try {

                const language =
                    isKorean
                        ? "ko_KR"
                        : "en_US";


                const loreURL =
                    `https://ddragon.leagueoflegends.com/cdn/${DATA_VERSION}/data/${language}/champion/${champion.id}.json`;


                const response =
                    await fetch(
                        loreURL
                    );


                if (!response.ok) {

                    throw new Error(
                        "Failed to load champion lore."
                    );

                }


                const result =
                    await response.json();


                const fullChampion =
                    result.data[
                        champion.id
                    ];


                if (
                    !fullChampion ||
                    !fullChampion.lore
                ) {

                    throw new Error(
                        "Champion lore unavailable."
                    );

                }


                /* =================================
                   SHOW FULL LORE
                ================================= */

                descriptionElement.textContent =
                    fullChampion.lore;


                descriptionElement.classList.add(
                    "expanded"
                );


                descriptionToggle.textContent =
                    isKorean
                        ? "접기"
                        : "SEE LESS";


                descriptionToggle.classList.add(
                    "expanded"
                );


            }

            catch (error) {

                console.error(
                    "Lore loading error:",
                    error
                );


                descriptionToggle.textContent =
                    isKorean
                        ? "불러오기 실패"
                        : "FAILED TO LOAD";

            }

            finally {

                descriptionToggle.disabled =
                    false;

            }

        }
    );

}


/* =========================================
   SEARCH
========================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            displayChampions(
                event.target.value
            );

        }
    );

}


/* =========================================
   CLOSE
========================================= */

if (closeMatchup) {

    closeMatchup.addEventListener(
        "click",
        () => {

            matchup.classList.add(
                "hidden"
            );

        }
    );

}


/* =========================================
   ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            matchup.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================
   START
========================================= */

loadChampions();