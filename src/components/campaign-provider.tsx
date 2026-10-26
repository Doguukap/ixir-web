"use client";

import { createContext, useContext } from "react";
import type { CampaignSummary } from "@/lib/campaign-types";

const CampaignContext = createContext<CampaignSummary[]>([]);
export function CampaignProvider({ campaigns, children }: { campaigns: CampaignSummary[]; children: React.ReactNode }) {
  return <CampaignContext.Provider value={campaigns}>{children}</CampaignContext.Provider>;
}
export const useCampaigns = () => useContext(CampaignContext);
