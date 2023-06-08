const constants = {
  domainUrl: "https://www.amazon.com",
  numberOfItemsToExtract: 3,
  selectors: {
    searchInput: "#twotabsearchtextbox",
    submitButton: 'input[type="submit"]',
    resultsContainer: "div.s-search-results",
    resultItems: 'div[data-component-type="s-search-result"]',
    itemName: 'div[data-component-type="s-search-result"] .s-title-instructions-style',
    itemPrice: 'div[data-component-type="s-search-result"] .a-price .a-offscreen',
    itemLink: 'div[data-component-type="s-search-result"] a',
  },
};

export default constants;
