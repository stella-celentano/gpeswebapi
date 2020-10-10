/**Config dotenv */
require('dotenv').config()

/**Require functions */
const { rowsToObject, setTitleMetric, setTooltip } = require('../functions/analytics.functions')

/**Config Consts */
const clientEmail = process.env.GA_CLIENT_EMAIL
const privateKey = process.env.GA_PRIVATE_KEY.replace(new RegExp("\\\\n", "\g"), "\n")
const scopes = ['https://www.googleapis.com/auth/analytics.readonly']

/**Config Google Analytics */
const { google } = require('googleapis')
const analytics = google.analytics('v3')
const viewId = process.env.GA_VIEW_ID
const jwt = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes
})

/**Função assíncrona que busca as métricas no Google Analytics utilizando apenas métricas. */
async function getMetricWithMetric(metric, startDate, endDate) {
    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](
        Math.trunc(1000 * Math.random())
    )

    const result = await analytics.data.ga.get({
        auth: jwt,
        ids: `ga:${viewId}`,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': metric
    })

    const res = {}

    res[`${metric}`] = {
        title: setTitleMetric([metric]),
        type: result.data.columnHeaders[0].dataType,
        value: result.data.totalsForAllResults[metric],
        tooltip: setTooltip([metric]),
        start: startDate,
        end: endDate,
        series: rowsToObject(result.data.rows)
    }

    return res
}

/**Função assincrona que busca as métricas no Google Analytics utilizando métricas e dimensões. */
async function getMetricWithDimensionAndMetric(dimension, metric, startDate, endDate) {
    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](
        Math.trunc(1000 * Math.random())
    )

    const result = await analytics.data.ga.get({
        auth: jwt,
        ids: `ga:${viewId}`,
        'dimensions': dimension,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': metric,
    })

    const res = {}

    res[`${dimension} & ${metric}`] = {
        title: setTitleMetric([metric]),
        type: result.data.columnHeaders[0].dataType,
        value: result.data.totalsForAllResults[metric],
        tooltip: setTooltip([metric]),
        start: startDate,
        end: endDate,
        name: setTitleMetric([metric]),
        series: rowsToObject(result.data.rows, dimension)
    }

    return res
}

/**Função assíncrona que busca as métricas no Google Analytics utilizando métricas, dimensões e filtros. */
async function getMetricWithDimensionAndMetricAndFilter(dimension, metric, filter, sort, startDate, endDate) {
    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](
        Math.trunc(1000 * Math.random())
    )

    const result = await analytics.data.ga.get({
        auth: jwt,
        ids: `ga:${viewId}`,
        'dimensions': dimension,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': metric,
        'filters': filter,
        'sort': sort
    })

    const res = {}

    res[`${dimension} & ${metric} & ${filter}`] = {
        title: setTitleMetric([metric]),
        type: result.data.columnHeaders[0].dataType,
        value: result.data.totalsForAllResults[metric],
        tooltip: setTooltip([metric]),
        start: startDate,
        end: endDate,
        name: setTitleMetric([metric]),
        series: rowsToObject(result.data.rows, dimension)
    }

    return res
}

/**Função que lê todas as métricas informadas pelo usuário e recupera os dados no Google Analytics, utilizando a função getMetricWithMetric. */
function getDataWithMetrics(metrics, startDate, endDate) {
    const results = []

    for (let m = 0; m < metrics.length; m++) {
        const metric = metrics[m]
        results.push(getMetricWithMetric(metric, startDate, endDate))
    }

    return results
}

/**Função que lê todas as dimensões e métricas informadas pelo usuário e recupera os dados no Google Analytics, utilizando a função getMetricWithDimensionAndMetric. */
function getDataWithDimensionsAndMetrics(metrics, dimensions, startDate, endDate) {
    const results = []

    for (let d = 0; d < dimensions.length; d++) {
        const dimension = dimensions[d]
        for (let m = 0; m < metrics.length; m++) {
            const metric = metrics[m]
            results.push(getMetricWithDimensionAndMetric(dimension, metric, startDate, endDate))
        }
    }

    return results
}

/**Função que lê todas as dimensões e métricas informadas pelo usuário e recupera os dados no Google Analytics, utilizando a função getMetricWithDimensionAndMetricAndFilter. */
function getDataWithDimensionsAndMetricsAndFilter(metrics, dimensions, filters, sort, startDate, endDate) {
    const results = []

    for (let d = 0; d < dimensions.length; d++) {
        const dimension = dimensions[d]
        for (let m = 0; m < metrics.length; m++) {
            const metric = metrics[m]
            results.push(getMetricWithDimensionAndMetricAndFilter(dimension, metric, filters, sort, startDate, endDate))
        }
    }

    return results
}

module.exports = { getDataWithDimensionsAndMetrics, getDataWithMetrics, getDataWithDimensionsAndMetricsAndFilter }