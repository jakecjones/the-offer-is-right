function getPriceEstimation(value) {
    if (value > 30000 && value < 60000) {
      return "$$";
    }
    if (value > 60000) {
      return "$$$";
    }
    return "$";
}
export default getPriceEstimation