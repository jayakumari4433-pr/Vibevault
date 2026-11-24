import { readCatalog } from "@/lib/catalog";
import { PageHeader } from "@/components/admin/ui";
import { CatalogManager } from "@/components/admin/CatalogManager";

export const dynamic = "force-dynamic";

export default function AdminCatalogPage() {
  const catalog = readCatalog();
  return (
    <div>
      <PageHeader
        title="Catalog"
        sub="Add categories, subcategories and products. Changes show on the storefront instantly."
      />
      <CatalogManager catalog={catalog} />
    </div>
  );
}
