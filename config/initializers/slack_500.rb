require 'slack_500'

Slack500.setup do |config|

    # report pretext of slack message
    config.pretext = 'FATAL ERROR'

    # report title of slack message
    config.title = 'Rendering 5xx with exception.'

    # color of slack message
    config.color = '#FF0000'

    # footer text of slack message
    config.footer = 'via Sail 5xx Report.'

    # WebHook URL
    # see https://slack.com/services/new/incoming-webhook
    config.webhook_url = 'https://hooks.slack.com/services/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'

end
