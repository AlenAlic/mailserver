const alert_options = {
  itemClass: "notification",
  permanent: false,
  duration: 300,
  visibility: 5000,
  position: "top-full",
  closeButtonClass: "close"
};

const alert_types = {
  info: {
    itemClass: "alert",
    iconClass: "alert_icon mdi mdi-information"
  },
  error: {
    itemClass: "alert--error",
    iconClass: "alert_icon mdi mdi-alert-circle"
  },
  warning: {
    itemClass: "alert--warning",
    iconClass: "alert_icon mdi mdi-alert"
  },
  success: {
    itemClass: "alert--success",
    iconClass: "alert_icon mdi mdi-checkbox-marked-circle"
  }
};

export { alert_options, alert_types };
