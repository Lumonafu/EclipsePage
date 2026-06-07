const light = document.getElementById("light");
const shadow = document.getElementById("shadow");
const parallax = document.getElementById("replaysParallax");

const container =
    document.getElementById("replaysContainer");

const search =
    document.getElementById("search");



window.addEventListener("mousemove", (e) => {

    light.style.left = e.clientX + "px";
    light.style.top = e.clientY + "px";

    shadow.style.left = e.clientX + "px";
    shadow.style.top = e.clientY + "px";

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const offsetX = (e.clientX - centerX) / 40;
    const offsetY = (e.clientY - centerY) / 40;

    parallax.style.transform =
        `translate(
            calc(-50% + ${offsetX}px),
            calc(-50% + ${offsetY}px)
        )
        scale(1.2)`;
});



function renderReplays(data){

    container.innerHTML = "";

    Object.entries(data).forEach(([seasonName, season]) => {

        const seasonEl =
            document.createElement("details");

        seasonEl.className =
            "folder season";

        seasonEl.dataset.name =
            seasonName;

        seasonEl.open = true;

        seasonEl.innerHTML = `
            <summary>
                <img
                    class="folder-icon"
                    src="img/icons/season.png">
                ${seasonName}
            </summary>
        `;

        const seasonContent =
            document.createElement("div");

        seasonContent.className =
            "folder-content";



        Object.entries(season).forEach(([dateName, date]) => {

            const dateEl =
                document.createElement("details");

            dateEl.className =
                "folder date";

            dateEl.dataset.name =
                dateName;

            dateEl.innerHTML = `
                <summary>
                    <img
                        class="folder-icon"
                        src="img/icons/date.gif">
                    ${dateName}
                </summary>
            `;

            const dateContent =
                document.createElement("div");

            dateContent.className =
                "folder-content";



            Object.entries(date).forEach(([teamName, team]) => {
                const TEAM_ICONS = {

                    "Equipo Rojo":
                        "img/icons/red_wool.png",

                    "Equipo Azul":
                        "img/icons/blue_wool.png",

                    "Equipo Verde":
                        "img/icons/green_wool.png",

                    "Equipo Amarillo":
                        "img/icons/yellow_wool.png",

                    "Equipo Negro":
                        "img/icons/black_wool.png",

                    "Equipo Blanco":
                        "img/icons/white_wool.png",

                    "Equipo Rosa":
                        "img/icons/pink_wool.png",

                    "Equipo Celeste":
                        "img/icons/light_blue_wool.png",

                    "Equipo Naranja":
                        "img/icons/orange_wool.png",

                    "Equipo Morado":
                        "img/icons/purple_wool.png"
                };
                const teamEl =
                    document.createElement("details");

                teamEl.className =
                    "folder team";

                teamEl.dataset.name =
                    teamName;
                const teamIcon =
                    TEAM_ICONS[teamName]
                    || "img/icons/team.png";
                teamEl.innerHTML = `
                    <summary>
                        <img
                            class="folder-icon"
                            src="${teamIcon}">
                        ${teamName}
                    </summary>
                `;

                const teamContent =
                    document.createElement("div");

                teamContent.className =
                    "folder-content";



                Object.entries(team).forEach(([playerName, replays]) => {

                    const playerEl =
                        document.createElement("details");

                    playerEl.className =
                        "folder player";

                    playerEl.dataset.name =
                        playerName;

                    playerEl.innerHTML = `
                        <summary>
                            <img
                                class="folder-icon"
                                src="img/icons/player.png">
                            ${playerName}
                        </summary>
                    `;

                    const playerContent =
                        document.createElement("div");

                    playerContent.className =
                        "folder-content";



                    replays.forEach(replay => {

                        const replayEl =
                            document.createElement("a");

                        replayEl.className =
                            "replay-file";

                        replayEl.dataset.name =
                            replay.name;

                        replayEl.href =
                            replay.url;

                        replayEl.target =
                            "_blank";

                        replayEl.textContent =
                            replay.name;

                        playerContent.appendChild(
                            replayEl
                        );
                    });

                    playerEl.appendChild(
                        playerContent
                    );

                    teamContent.appendChild(
                        playerEl
                    );
                });

                teamEl.appendChild(
                    teamContent
                );

                dateContent.appendChild(
                    teamEl
                );
            });

            dateEl.appendChild(
                dateContent
            );

            seasonContent.appendChild(
                dateEl
            );
        });

        seasonEl.appendChild(
            seasonContent
        );

        container.appendChild(
            seasonEl
        );
    });
}



function showAll(node){

    node.style.display = "";

    node.querySelectorAll(".folder")
        .forEach(folder => {

            folder.style.display = "";
        });

    node.querySelectorAll(".replay-file")
        .forEach(file => {

            file.style.display = "";
        });
}



function processNode(node, query){

    const ownName =
        (node.dataset.name || "")
        .toLowerCase();

    const selfMatch =
        ownName.includes(query);

    if(selfMatch){

        showAll(node);

        return true;
    }

    let matched = false;



    const childFolders =
        node.querySelectorAll(
            ":scope > .folder-content > .folder"
        );

    childFolders.forEach(child => {

        const childVisible =
            processNode(
                child,
                query
            );

        child.style.display =
            childVisible
                ? ""
                : "none";

        if(childVisible){


            matched = true;
        }
    });



    const files =
        node.querySelectorAll(
            ":scope > .folder-content > .replay-file"
        );

    files.forEach(file => {

        const fileMatch =
            (
                file.dataset.name ||
                file.textContent
            )
            .toLowerCase()
            .includes(query);

        file.style.display =
            fileMatch
                ? ""
                : "none";

        if(fileMatch){

            matched = true;
        }
    });

    return matched;
}



function filterTree(){

    const query =
        search.value
            .trim()
            .toLowerCase();

    const seasons =
        document.querySelectorAll(
            ".season"
        );



    if(query === ""){

        document
            .querySelectorAll(
                ".folder"
            )
            .forEach(folder => {

                folder.style.display = "";
            });

        document
            .querySelectorAll(
                ".replay-file"
            )
            .forEach(file => {

                file.style.display = "";
            });

        return;
    }



    seasons.forEach(season => {

        const visible =
            processNode(
                season,
                query
            );

        season.style.display =
            visible
                ? ""
                : "none";

    });
}



renderReplays(REPLAYS);

search.addEventListener(
    "input",
    filterTree
);

