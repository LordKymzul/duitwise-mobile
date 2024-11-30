import { AxiosRequestConfig } from "axios";
import axios from "axios";
import { PATHS } from "src/core/constant/Paths";
import { BankPortfolio, PortfolioData } from "src/features/portfolio/entities/portfolio-entity";

export const getAllPortfolioData = async (): Promise<PortfolioData> => {
    try {
        const options: AxiosRequestConfig = {
            method: "GET",
            url: PATHS.BASE_URL + "/portfolios",
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log('options', options.url);
        const response = await axios.get(PATHS.BASE_URL + "/portfolios", options);
        if (response.status === 200) {
            return response.data.data as PortfolioData;
        }
        throw new Error("Failed to fetch portfolio data with status code: " + response.status);
    } catch (e) {
        throw new Error("Failed to fetch portfolio data");
    }
};

export const getSinglePortfolio = async (bankName: string): Promise<BankPortfolio> => {
    try {
        const options: AxiosRequestConfig = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.get(PATHS.BASE_URL + `/portfolios/${bankName}`, options);
        if (response.status === 200) {
            return response.data.data as BankPortfolio;
        }
        throw new Error("Failed to fetch portfolio data with status code: " + response.status);
    } catch (e) {
        throw new Error("Failed to fetch portfolio data");
    }
}
