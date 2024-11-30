
import { create } from "zustand";
import { getAllPortfolioDataRepo, getSinglePortfolioRepo } from "../../infrasturctures/repositories/portfolio-repo";
import { BankPortfolio, portfolioData } from "src/core/constant/Data";
type PortfolioStore = {

    selectedPortfolio: BankPortfolio | null;
    setSelectedPortfolio: ({ bankName }: { bankName: string | null }) => Promise<void>;
    portfolios: BankPortfolio[] | null;
    setPortfolios: () => Promise<void>;
}


export const usePortfolioStore = create<PortfolioStore>((set) => ({

    selectedPortfolio: null,
    setSelectedPortfolio: async ({ bankName }: { bankName: string | null }) => {
        try {
            // if (bankName) {
            //     const portfolio = await getSinglePortfolioRepo(bankName);
            //     set({ selectedPortfolio: portfolio })
            // } else {
            //     set({ selectedPortfolio: null })
            //     const portfolios = await getAllPortfolioDataRepo();
            //     set({ portfolios });
            // }
            if (bankName) {
                set({ selectedPortfolio: portfolioData.portfolio.find((portfolio) => portfolio.bankName === bankName) })
            } else {
                set({ selectedPortfolio: null })
            }
        } catch (error) {
            throw error;
        }
    },
    portfolios: null,
    setPortfolios: async () => {
        try {
            const portfolios = portfolioData.portfolio;
            set({ portfolios });
        } catch (error) {
            throw error;
        }
    }
}))
