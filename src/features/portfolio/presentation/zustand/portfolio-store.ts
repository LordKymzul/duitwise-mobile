
import { create } from "zustand";
import { portfolioData, BankPortfolio } from "src/core/constant/Data";

type PortfolioStore = {
    portfolio: BankPortfolio[];
    setPortfolio: (portfolio: BankPortfolio[]) => void;
    selectedPortfolio: BankPortfolio | null;
    setSelectedPortfolio: (portfolio: BankPortfolio | null) => void;
}


export const usePortfolioStore = create<PortfolioStore>((set) => ({
    portfolio: portfolioData.portfolio,
    setPortfolio: (portfolio) => set({ portfolio }),
    selectedPortfolio: null,
    setSelectedPortfolio: (portfolio) => {
        set({ selectedPortfolio: portfolio })
    }
}))