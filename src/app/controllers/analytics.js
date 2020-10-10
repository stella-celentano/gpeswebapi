const { getDataWithDimensionsAndMetrics, getDataWithMetrics, getDataWithDimensionsAndMetricsAndFilter } = require('./../libraries/gAnalytics_v3')
const { getDataValues } = require('./../functions/analytics.functions')
const { backOff } = require("exponential-backoff")

class Analytics {

    /**Endpoint que busca as métricas no Google Analytics baseado nas métricas, dimensões, filtros e datas enviadas na requisição e retorna em resposta para servir o app. */
    getData(req, res) {

        let { dimensions, metrics, filters, sort, startDate, endDate } = req.query

        if (dimensions !== undefined) {
            dimensions = getDataValues(dimensions)
        }

        if (filters !== undefined) {
            filters = getDataValues(filters)
        }

        if (!endDate) {
            endDate = new Date().toISOString().slice(0, 10)
        }

        metrics = getDataValues(metrics)

        if (dimensions !== undefined && filters === undefined) {
            try {
                backOff(() => Promise.all(getDataWithDimensionsAndMetrics(metrics, dimensions, startDate, endDate))
                    .then((result) => {
                        res.status(200).json({ message: "Dados recuperados com sucesso", data: result })
                    })
                )
            } catch (e) {
                console.log(e)
            }
        } else if (dimensions !== undefined && filters !== undefined) {
            try {
                backOff(() => Promise.all(getDataWithDimensionsAndMetricsAndFilter(metrics, dimensions, filters, sort, startDate, endDate))
                    .then((result) => {
                        res.status(200).json({ message: "Dados recuperados com sucesso", data: result })
                    })
                )
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                backOff(() => Promise.all(getDataWithMetrics(metrics, startDate, endDate))
                    .then((result) => {
                        res.status(200).json({ message: "Dados recuperados com sucesso", data: result })
                    })
                )
            } catch (e) {
                console.log(e)
            }
        }
    }

}

module.exports = new Analytics()