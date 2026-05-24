import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import fs from "fs";
import path from "path";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as "ar" | "en")) {
        locale = routing.defaultLocale;
    }

    const messagesPath = path.join(process.cwd(), "messages", `${locale}.json`);
    const raw = fs.readFileSync(messagesPath, "utf-8");
    const messages = JSON.parse(raw);

    return {
        locale,
        messages,
    };
});
