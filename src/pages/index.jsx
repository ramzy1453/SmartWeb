import { useState } from "react";
import ApplicationCard from "../components/ApplicationCard";
import SearchInput from "../components/SearchInput";
import { searchItems } from "../utils/functions";
import { applications } from "../utils/applications";
import t, { T } from "../components/translate";
import { useLang } from "../utils/lang_context";

// i want a page un middle there is the title then you choose the page you want to go to
export default function Home() {
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredApps = searchItems(
    applications.map((a) => ({ ...a, name: T(a.name) })),
    search,
    ["name", "description"]
  );

  return (
    <div className="py-8">
      <h1 className="text-4xl mb-10">{t("main.title")}</h1>
      <div>
        <h1 className="text-2xl">{t("main.choose")}</h1>
        <div className="my-10">
          <SearchInput search={search} onSearchChange={onSearchChange} />
        </div>

        {filteredApps.length === 0 && (
          <div className="h-48 flex px-4">
            <h1 className="text-2xl">{t("main.no-results")}</h1>
          </div>
        )}
        {filteredApps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredApps.map((data, key) => (
              <ApplicationCard key={key} data={data} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
