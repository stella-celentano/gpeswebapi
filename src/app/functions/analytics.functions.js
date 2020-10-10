const constants = require('./analytics.consts')
const estadosBr = require('./analytics.estados-br')

/**Função que adiciona “ga:” na frente das métricas, dimensões e filtros passados para o Google Analytics. */
function parseValue(value) {
    let cleanValue = value

    if (!cleanValue.startsWith('ga:')) {
        cleanValue = `ga:${cleanValue}`
    }

    return cleanValue
}

/**Função que separa o valores pela vírgula, transformando-os em array. */
function splitValues(values) {
    return values.split(',')
}

/**Função que transforma as métricas, dimensões e filtros em array. */
function setArrayValues(values) {
    const result = []

    for (let i = 0; i < values.length; i++) {
        let value = parseValue(values[i])
        result.push(value)
    }

    return result
}

/**Função que chama splitValues e setArrayValues e retorna o resultado para o controller. */
function getDataValues(values) {
    let result = splitValues(values)
    result = setArrayValues(result)
    return result
}

/**Função que retorna a métrica transformada. */
function returnValue(value, dimension) {
    if (dimension == 'ga:date') {
        return returnDate(value)
    } else if (dimension == 'ga:region') {
        return returnState(value)
    } else if (dimension == 'ga:userType') {
        return returnUserType(value)
    } else if (dimension == 'ga:eventAction') {
        return returnEventAction(value)
    } else if (dimension == 'ga:city') {
        return returnCity(value)
    } else {
        return value
    }
}

/**Função que retorna a cidade. */
function returnCity(value) {
    if (value == '(not set)') {
        return 'Não definido'
    } else {
        return value
    }
}

/**Função que retorna uma data. */
function returnDate(value) {
    let year, month, day, date

    year = value.substring(0, 4)
    month = value.substring(4, 6)
    day = value.substring(6, 8)
    date = `${day}/${month}/${year}`

    return date

}

/**Função que retorna o tipo de usuário. */
function returnUserType(value) {
    switch (value) {
        case 'New Visitor':
            return constants.DIMENSION_USERTYPE_NEWVISITOR
            break
        case 'Returning Visitor':
            return constants.DIMENSION_USERTYPE_RETURNINGVISITOR
            break
        default:
            return null
    }
}

/**Função que retorna qual é o evento da ação. */
function returnEventAction(value) {
    switch (value) {
        case 'make_donation':
            return constants.DIMENSION_EVENT_ACTION_DONATION
            break
        case 'navigate_to_donation':
            return constants.DIMENSION_EVENT_ACTION_VIEWS_DONATION
            break
        default:
            return null
    }
}

/**Função que transforma um array em objeto. */
function rowsToObject(rows, dimension) {
    const result = []
    if (rows != undefined) {
        for (let r = 0; r < rows.length; r++) {
            result.push({
                name: returnValue(rows[r][0], dimension),
                value: rows[r][1]
            })
        }
    } else {
        result.push({
            name: 'Não há dados para serem exibidos'
        })
    }

    return result
}

/**Função que retorna o título da métrica. */
function setTitleMetric(metric) {
    switch (metric[0]) {
        case 'ga:users':
            return constants.METRIC_USERS
            break
        case 'ga:newUsers':
            return constants.METRIC_NEW_USERS
            break
        case 'ga:sessions':
            return constants.METRIC_SESSIONS
            break
        case 'ga:sessionsPerUser':
            return constants.METRIC_SESSIONS_PER_USER
            break
        case 'ga:pageviews':
            return constants.METRIC_PAGEVIEWS
            break
        case 'ga:avgSessionDuration':
            return constants.METRIC_AVG_SESSION_DURATION
            break
        default:
            return null
    }
}

/**Função que retorna a tooltip da métrica. */
function setTooltip(metric) {
    switch (metric[0]) {
        case 'ga:users':
            return constants.TOOLTIP_USERS
            break
        case 'ga:newUsers':
            return constants.TOOLTIP_NEW_USERS
            break
        case 'ga:sessions':
            return constants.TOOLTIP_SESSIONS
            break
        case 'ga:sessionsPerUser':
            return constants.TOOLTIP_SESSIONS_PER_USER
            break
        case 'ga:pageviews':
            return constants.TOOLTIP_PAGEVIEWS
            break
        case 'ga:avgSessionDuration':
            return constants.TOOLTIP_AVG_SESSION_DURATION
            break
        default:
            return null
    }
}

/**Função que retorna os estados brasileiros. */
function returnState(value) {
    switch (value) {
        case 'State of Acre':
            return estadosBr.Acre
            break
        case 'State of Alagoas':
            return estadosBr.Alagoas
            break
        case 'State of Amapa':
            return estadosBr.Amapa
            break
        case 'State of Amazonas':
            return estadosBr.Amazonas
            break
        case 'State of Bahia':
            return estadosBr.Bahia
            break
        case 'State of Ceara':
            return estadosBr.Ceara
            break
        case 'State of Distrito Federal':
            return estadosBr.Distrito_Federal
            break
        case 'State of Espirito Santo':
            return estadosBr.Espirito_Santo
            break
        case 'State of Goias':
            return estadosBr.Goias
            break
        case 'State of Maranhao':
            return estadosBr.Maranhao
            break
        case 'State of Mato Grosso':
            return estadosBr.Mato_Grosso
            break
        case 'State of Mato Grosso do Sul':
            return estadosBr.Mato_Grosso_do_Sul
            break
        case 'State of Minas Gerais':
            return estadosBr.Minas_Gerais
            break
        case 'State of Para':
            return estadosBr.Para
            break
        case 'State of Paraiba':
            return estadosBr.Paraiba
            break
        case 'State of Parana':
            return estadosBr.Parana
            break
        case 'State of Pernambuco':
            return estadosBr.Pernambuco
            break
        case 'State of Piaui':
            return estadosBr.Piaui
            break
        case 'State of Rio de Janeiro':
            return estadosBr.Rio_de_Janeiro
            break
        case 'State of Rio Grande do Norte':
            return estadosBr.Rio_Grande_do_Norte
            break
        case 'State of Rio Grande do Sul':
            return estadosBr.Rio_Grande_do_Sul
            break
        case 'State of Rondonia':
            return estadosBr.Rondonia
            break
        case 'State of Roraima':
            return estadosBr.Roraima
            break
        case 'State of Santa Catarina':
            return estadosBr.Santa_Catarina
            break
        case 'State of Sao Paulo':
            return estadosBr.Sao_Paulo
            break
        case 'State of Sergipe':
            return estadosBr.Sergipe
            break
        case 'State of Tocantins':
            return estadosBr.Tocantins
            break
        default:
            return 'Sem informação'
    }
}

module.exports = { getDataValues, rowsToObject, setTitleMetric, setTooltip } 