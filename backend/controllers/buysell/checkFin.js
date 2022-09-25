const { currentPortfolioValue } = require("../portfolio/utilsPort")

const checkFin = async (userData, totalSpend) => {

    if (userData.cash < totalSpend) {
        response = {
            message: "Not Enough Money"
        }
        return response


    } else {

        

        const updatedCash = userData.cash - totalSpend
        const updatedPortfolio = userData.portfolio + totalSpend
        const updateUserData = {
            cash: updatedCash,
            portfolio: updatedPortfolio
        }
        return updateUserData
    }
}

module.exports = checkFin