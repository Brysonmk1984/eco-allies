const lowercaseUnderscore = function(ally){
    return ally.replace(/\s+/g, '_').toLowerCase();
};
const lowercaseDash = function(ally){
    return ally.replace(/\s+/g, '-').toLowerCase();
};


export { lowercaseUnderscore, lowercaseDash };