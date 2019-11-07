import { DateTime } from "luxon";

const UtilitiesHandler = {
  install(Vue) {
    /**
     * Check if a user is signed in.
     * @param methodOptions
     * @returns Object or null
     */
    Vue.prototype.$util = {
      getFormattedDate: function(date_string) {
        const date = DateTime.fromISO(date_string)
          .toLocal()
          .toFormat("d LLLL yyyy");
        return `${date}`;
      },
      getFormattedDateTime: function(date_string) {
        const date = DateTime.fromISO(date_string)
          .toLocal()
          .toFormat("d LLLL yyyy HH:mm");
        return `${date}`;
      },
      isEmail: function(email) {
        // eslint-disable-next-line no-useless-escape
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      getScreenSize: function() {
        return window.innerWidth;
      },
      isSmallScreen: function() {
        return this.getScreenSize() <= 1199;
      }
    };
  }
};

export default UtilitiesHandler;
