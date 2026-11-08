import { createFileRoute } from "@tanstack/react-router";
import { CustomTemplate } from "@/layouts/custom";

// The scaffold's Quanta stylesheet is heavy (~75 kB gzip); only this internal route needs it.
import appCss from "../styles.css?url";

interface AppSearch {
  preview: boolean;
}

export const Route = createFileRoute("/app")({
  head: () => ({ links: [{ rel: "stylesheet", href: appCss }] }),
  validateSearch: (search: Record<string, unknown>): AppSearch => ({
    preview: search.preview === "1" || search.preview === true,
  }),
  component: AppRoute,
});

function AppRoute() {
  const { preview } = Route.useSearch();
  return <CustomTemplate previewMode={preview} />;
}
