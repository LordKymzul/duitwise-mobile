import { PortfolioData, BankPortfolio } from "../../entities/portfolio-entity";
import { getAllPortfolioData, getSinglePortfolio } from "../data_source/remote/portfolio-api-service";

export const getAllPortfolioDataRepo = async (): Promise<PortfolioData> => {
    try {
        const portfolioData = await getAllPortfolioData();
        return portfolioData;
    } catch (error) {
        throw error;
    }
};

export const getSinglePortfolioRepo = async (bankName: string): Promise<BankPortfolio> => {
    try {
        const portfolioData = await getSinglePortfolio(bankName);
        return portfolioData;
    } catch (error) {
        throw error;
    }
}
