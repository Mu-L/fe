const en_US = {
  title: 'Alert Rules',
  search_placeholder: 'Search by name or tags',
  prod: 'Type',
  severity: 'Severity',
  notify_groups: 'Notify Groups',
  basic_configs: 'Basic Settings',
  name: 'Name',
  name_severities_appendtags: 'Name & Severity & Tags',
  append_tags: 'Tags',
  append_tags_msg: 'Invalid tag format, please check!',
  append_tags_msg1: 'Tag length should be less than or equal to 64 bits',
  append_tags_msg2: 'Tag format should be key=value. And the key starts with a letter or underscore, and is composed of letters, numbers and underscores.',
  append_tags_placeholder: 'Tag format is key=value, use Enter or Space to separate',
  group_id: 'Business Group',
  note: 'Note',
  append_tags_note_tip:
    'Support configuration variables, such as {{$labels.ident}}. If the monitoring data is `mem_active{ident="dev-backup-01"}`, it will eventually be replaced with dev-backup-01',
  rule_configs: 'Rule Configuration',
  inhibit: 'Inhibit',
  inhibit_tip: 'Only the alert events generated by the curves with the same metricName and labels will be suppressed, 1>2>3',
  interval: 'Execution Interval',
  duration: 'Execution Duration',
  severity_label: 'Severity',
  prom_eval_interval: 'Execution Interval (s)',
  prom_for_duration: 'Execution Duration (s)',
  effective_configs: 'Effective Configuration',
  enable_status: 'Enable Now',
  effective_time: 'Effective Time',
  effective_time_start: 'Start Time',
  effective_time_start_msg: 'Start Time is required',
  effective_time_end: 'End Time',
  effective_time_end_msg: 'End Time is required',
  effective_time_week_msg: 'Please select effective week',
  enable_in_bg: 'Enable in buisness group',
  enable_in_bg_tip: 'Determine the ownership relationship based on the ident in the alert event',
  notify_configs: 'Notify Configuration',
  notify_channels: 'Channels',
  notify_channels_doc: 'Document',
  notify_channels_tpl: 'Channels Template',
  notify_channels_tpl_tip: 'If empty, use the default template',
  notify_recovered: 'Recovered',
  notify_recovered_tip: 'Send notification when the alert is recovered',
  recover_duration: 'Recover Duration (s)',
  recover_duration_tip: 'Continue {{num}} seconds without triggering the threshold again to send the recovery notification',
  notify_repeat_step: 'Repeat Interval (mins)',
  notify_repeat_step_tip: 'If the alert continues to be unrecovered, the member of the alert receiving group will be reminded again after {{num}} minutes',
  notify_max_number: 'Max Send Times',
  notify_max_number_tip: 'The maximum number of times the alert is sent to the alert receiving group',
  notify_flashduty_configured: 'Global Flashduty push is configured',
  callbacks: 'Callbacks',
  annotations: 'Annotations',
  annotationsOptions: {
    plan_link: 'Plan Link',
    dashboard_link: 'Dashboard Link',
    desc: 'Description',
  },
  extra_config: {
    default_tpl: 'Default Template',
  },
  invalid_datasource_tip_1: 'Datasources',
  invalid_datasource_tip_2: 'are not configured with cluster of alert engine',
  invalid_datasource_reload: 'Reload',
  host: {
    query: {
      title: 'Queries',
      key: {
        all_hosts: 'All Hosts',
        datasource_ids: 'Datasource',
        group_ids: 'Group',
        tags: 'Tags',
        hosts: 'Host idents',
      },
      preview: 'Preview',
    },
    trigger: {
      title: 'Triggers',
      key: {
        target_miss: 'Target Miss',
        pct_target_miss: 'Pct Target Miss',
        offset: 'Offset',
      },
      than: 'than',
      pct_target_miss_text: 's, The proportion of lost connection exceeds',
      second: 's',
      millisecond: 'ms',
    },
    prom_eval_interval_tip: 'promql 执行频率，每隔 {{num}} 秒查询时序库，查到的结果重新命名写回时序库',
    prom_for_duration_tip:
      '通常持续时长大于执行频率，在持续时长内按照执行频率多次执行PromQL查询，每次都触发才生成告警；如果持续时长置为0，表示只要有一次PromQL查询触发阈值，就生成告警',
  },
  metric: {
    query: {
      title: 'Queries',
    },
    prom_eval_interval_tip: 'PromQL query is executed every {{num}} seconds to query the time-series database',
    prom_for_duration_tip:
      'Usually the duration is greater than the execution frequency. During the duration, PromQL query is executed multiple times according to the execution frequency, and an alert is generated only if it is triggered every time. If the duration is set to 0, an alert is generated as long as the threshold is triggered once during the PromQL query.',
  },
  batch: {
    not_select: 'Please select some rules first',
    delete: 'Delete Alert Rules',
    delete_confirm: 'Are you sure to delete the selected rules?',
    delete_success: 'Delete successfully',
    import: {
      title: 'Import Alert Rules',
      name: 'Alert rule',
      result: 'Result',
      errmsg: 'Error message',
    },
    export: {
      title: 'Export Alert Rules',
      copy: 'Copy JSON content to clipboard',
    },
    update: {
      title: 'Update Alert Rules',
      name: 'Update Alert Rules',
      field: 'Field',
      changeto: 'Change to',
      enable_in_bg_tip: 'Determine the ownership relationship based on the ident in the alert event',
      callback_cover: {
        mode: 'Mode',
        cover: 'Cover',
        callback_add: 'Add',
        callback_del: 'Delete',
      },
      effective_time_msg: 'Effective time is required',
      effective_time_add: 'Add effective time',
      options: {
        datasource_ids: 'Datasource',
        severity: 'Severity',
        prom_eval_interval: 'Execution Interval',
        prom_for_duration: 'Execution Duration',
        disabled: 'Enable',
        effective_time: 'Effective Time',
        enable_in_bg: 'Enable in buisness group',
        append_tags: 'Tags',
        notify_channels: 'Channels',
        notify_groups: 'Notify Groups',
        notify_recovered: 'Recovered',
        notify_repeat_step: 'Repeat Interval',
        recover_duration: 'Recover Duration',
        notify_max_number: 'Max Send Times',
        callbacks: 'Callbacks',
        note: 'Note',
        runbook_url: 'Runbook URL',
        service_cal_ids: 'Service Calendar',
      },
    },
  },
  brain_result_btn: 'Training Result',
  testTip: `
  Rule validity check：<br />
  1. Check channels and groups
  `,
  default_filter: {
    title: 'Preset filters',
    all: 'All rules',
  },
  ruleConfigPromVersion: 'Version',
  ruleConfigPromVersionV2: {
    query: {
      title: 'Query',
    },
  },
};
export default en_US;
