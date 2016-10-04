function processReportType(type, test) {
    return test ? true : toggleReportType(type);
}

function processReportParameters(type, parameters, test) {
    return test ? true : updateReportParametersFunctions[type](parameters);
}

function formSetEditReport(idReport, test) {
    var report = {
        'type': ReportPlugin.defaultReportType,
        'format': ReportPlugin.defaultReportFormat,
        'description': '',
        'period': ReportPlugin.defaultPeriod,
        'hour': ReportPlugin.defaultHour,
        'reports': []
    };

    if (idReport > 0) {
        report = ReportPlugin.reportList[idReport];
        $('#report_submit').val(ReportPlugin.updateReportString);
    }
    else {
        $('#report_submit').val(ReportPlugin.createReportString);
    }

    // разрываем зависимость с помощью processReportType(),
    // просто возвращающей true и ничего не делающей, в случае test=true
    processReportType(report.type, test);
    // toggleReportType(report.type);

    $('#report_description').html(report.description);
    $('#report_segment').find('option[value=' + report.idsegment + ']').prop('selected', 'selected');
    $('#report_type').find('option[value=' + report.type + ']').prop('selected', 'selected');
    $('#report_period').find('option[value=' + report.period + ']').prop('selected', 'selected');
    $('#report_hour').val(report.hour);
    $('[name=report_format].' + report.type + ' option[value=' + report.format + ']').prop('selected', 'selected');

    $('[name=reportsList] input').prop('checked', false);

    var key;
    for (key in report.reports) {
        $('.' + report.type + ' [report-unique-id=' + report.reports[key] + ']').prop('checked', 'checked');
    }

    // разрываем зависимость с помощью processReportParameters(),
    // просто возвращающей true и ничего не делающей, в случае test=true
    processReportParameters(report.type, report.parameters, test);
    // updateReportParametersFunctions[report.type](report.parameters);

    $('#report_idreport').val(idReport);
}

// тест
function assert(idReport) {
    formSetEditReport(idReport, true);
}

// запуск теста
assert(1);