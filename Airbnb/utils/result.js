function createResult(error, data) {
    if (data) {
        return createResultSuccess(data)
    } else {
        return createErrorResult(error)
    }
}

function createResultSuccess(data) {
    return {
        "status": "Success",
        "data": data
    }
}

function createErrorResult(error) {
    return {
        "status": "Error",
        "error": error
    }
}

module.exports = { createResult, createResultSuccess, createErrorResult }


/*



*/ 