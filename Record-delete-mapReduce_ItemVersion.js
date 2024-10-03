/**
 * @NApiVersion 2.x
 * @NScriptType MapreduceScript
 */
define(['N/log', 'N/search', 'N/record'], function (log, search, record) {

    function getInputData(context) {
        log.debug('GetInput Stage ');

        return search.create({
            type: 'enter type',
            filter: [],
            columns: [
                'internalid'
            ]
        });

    }
    function map(context) {
        var searchResult = JSON.parse(context.value)

        context.write({
            key: searchResult.id,
            value: searchResult.id
        })

    }

    function reduce(context)
    {

        var recordId = context.key

        record.delete({
            type:'enter your type',
            id:recordId
        })

        log.debug("Record id deleted Successfully",recordId)
    }

    function summarize(summary)
    {
        log.debug("Summarize Stage Triggered");

        summary.output.iterator().each(function (key, value) {
            log.debug("Deleted Record ID", key);
            return true;
        });

        log.audit({
            title: "Execution complete",
            details: "Total records processed: " 
        });

    }
    return {
        getInputData:getInputData,
        map:map,
        reduce:reduce,
        summarize:summarize

    }
})