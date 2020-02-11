import * as fs from "fs";

const exampleFolder = "env/examples";
const envFolder = "env";

fs.readdir(exampleFolder, {}, (error, files: Array<any>) => {
    let warn = false;

    files.forEach(file => {
        try {
            if (!fs.existsSync(`${envFolder}/${file}`)) {
                const data = fs.readFileSync(`${exampleFolder}/${file}`, "utf8");
                fs.writeFileSync(
                    `${envFolder}/${file}`,
                    data.replace(
                        "%AUTHORIZATION_SECRET%",
                        Math.random()
                            .toString(36)
                            .substring(2)
                    )
                );

                warn = true;
            }
        } catch (e) {
            throw new Error("Could not write configuration files");
        }
    });

    if (warn) {
        throw new Error(
            "Please, configure the app in the files within the /env folder"
        );
    }
});
