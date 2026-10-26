"use client";

import { createContext, useContext } from "react";
import type { ServiceNavigationCategory } from "@/lib/service-types";

const CatalogNavigation = createContext<ServiceNavigationCategory[]>([]);
export function ServiceNavigationProvider({ categories, children }: { categories: ServiceNavigationCategory[]; children: React.ReactNode }) {
  return <CatalogNavigation.Provider value={categories}>{children}</CatalogNavigation.Provider>;
}
export function useServiceNavigation() {
  return useContext(CatalogNavigation);
}
