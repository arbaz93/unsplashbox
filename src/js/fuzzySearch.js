import Fuse from 'fuse.js';

// Fuse.js Fuzzy Search

export default function searchCurrentCollections(collections, query) {

    let documents = [...collections]
    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.4,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
            "description",
        ]
    };

    const fuse = new Fuse(documents, fuseOptions);
    // Change the pattern
    const searchPattern = query;
    console.log(fuse.search(searchPattern))
    return fuse.search(searchPattern);
};
// END Code for searching