import QRCode from "qrcode";

/**
 * getISODateFromTimestamp
 * @param {string} timestamp
 * @returns {string}
 */
export const getISODateFromTimestamp = (timestamp) => {
  return new Date(parseInt(timestamp, 10) * 1000).toISOString() || undefined;
}

/**
 * getLocaleStringFromTimestamp
 * @param {number} timestamp 
 * @returns {string}
 */
export const getLocaleStringFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  // return date.toLocaleString()
  return `${date.getDate()}/${(date.getMonth()+1).toString().padStart(2, "0")} à ${date.getHours()}h${date.getMinutes()}`
}

/**
 * generateQRCode
 * @param {string} id 
 * @param {string} username 
 * @param {string} color
 * @param {string[]} program 
 * @returns {string}
 */
export const generateQRCode = (id: string, username: string, color: string, program: string[]): string => {
  let generatedCode = '';
  const myData = {id: id, username: username, color: color, program: program};
  QRCode.toDataURL(JSON.stringify(myData), function (err, url) {
    if(!err) {
      generatedCode =  url;
    } 
    // else { console.log(err) }
  });
  
  return generatedCode;
}

/**
 * unslugify
 * @param {string} slug 
 * @returns {string}
 */
export const unslugify = (slug: string): string => {
  return slug.replace('-', ' ');
}