// modules/database/utils/safe-query.js

/*
|--------------------------------------------------------------------------
| Forbidden SQL Keywords
|--------------------------------------------------------------------------
|
| Bloquea queries peligrosas.
|
*/

const forbiddenKeywords = [

    "DROP",

    "DELETE",

    "TRUNCATE",

    "ALTER",

    "UPDATE",

    "GRANT",

    "REVOKE",

    "CREATE",

    "REPLACE",
];

/*
|--------------------------------------------------------------------------
| Safe Query Validator
|--------------------------------------------------------------------------
*/

function safeQuery(query) {

    if (!query) {

        return false;
    }

    const normalized =
        query
            .trim()
            .toUpperCase();

    /*
    |--------------------------------------------------------------------------
    | Block Dangerous Keywords
    |--------------------------------------------------------------------------
    */

    const hasForbiddenKeyword =
        forbiddenKeywords.some(
            (keyword) =>
                normalized.includes(keyword)
        );

    if (hasForbiddenKeyword) {

        return false;
    }

    /*
    |--------------------------------------------------------------------------
    | Allow Only SELECT/WITH
    |--------------------------------------------------------------------------
    */

    const allowed =
        normalized.startsWith("SELECT") ||

        normalized.startsWith("WITH");

    return allowed;
}

module.exports =
    safeQuery;