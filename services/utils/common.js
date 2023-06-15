export const validArray = (array = []) => {
  return Array.isArray(array) && array?.length > 0;
};

/**
 * @TO_DETECT_MOBILE
 * @Android -
 * @iPhone -
 * @iPad -
 * @Desktop_Laptop -
 */

export const detectDevice = (navigator) => {
  let device = "";
  let isMobile = false;

  let str = navigator.userAgent;
  if (str.indexOf("iPhone") > -1 && navigator.maxTouchPoints) {
    device = "iPhone";
    isMobile = true;
  } else if (str.indexOf("iPad") > -1 && navigator.maxTouchPoints) {
    isMobile = true;
    device = "iPad";
  } else if (str.indexOf("Android") > -1 && navigator.maxTouchPoints) {
    isMobile = true;
    device = "Android";
  } else if (str.indexOf("Linux") > -1 && !navigator.maxTouchPoints) {
    isMobile = false;
    device = navigator?.platform || navigator?.userAgentData?.platform;
  } else {
    isMobile = false;
    device = navigator?.platform || navigator?.userAgentData?.platform;
  }

  return { device, isMobile };
};

/**
 * @TO_DETECT_BROWSER
 * @Chrome - Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
 * @Firefox - "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0"
 * @Edge - Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43
 * @Opera - Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0
 * @Safari - Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15
 * @Brave - Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
 */

export const detectBrowser = (navigator) => {
  let browserName = "";
  let str = navigator.userAgent;

  if (str.indexOf("Edg") > -1) {
    browserName = "Edge";
  } else if (str.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (str.indexOf("OPR") > -1) {
    browserName = "Opera";
  } else if (str.indexOf("Mac") > -1 && str.indexOf("Safari") > -1) {
    browserName = "Safari";
  } else if (str.indexOf("Chrome") > -1 && navigator?.brave !== undefined) {
    browserName = "Brave";
  } else if (str.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else {
    browserName = "Unknown";
  }

  return browserName;
};
