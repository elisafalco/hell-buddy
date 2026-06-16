import { STAGES } from "@/constants";
import QRCode from "qrcode";
import JSONCrush from 'jsoncrush'

/**
 * getISODateFromTimestamp
 * @param {string} timestamp
 * @returns {string}
 */
export const getISODateFromTimestamp = (timestamp: string) => {
  return new Date(parseInt(timestamp, 10) * 1000).toISOString() || undefined;
}

/**
 * getLocaleStringFromTimestamp
 * @param {number} timestamp 
 * @returns {string}
 */
export const getLocaleStringFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
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
  const myData = JSON.stringify({id: id, username: username, color: color, program: program});
  const compressedData = JSONCrush.crush(myData)
  QRCode.toDataURL(compressedData, function (err, url) {
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
  return slug.replaceAll('-', ' ');
}

/**
 * getStageClass
 * @param {string} stageArg
 * @returns {string}
 */
export const getStageClass = (stageArg: string): string => {
  const stageObj = STAGES.find((STAGE) => STAGE.label === stageArg);
  if (stageObj) {
    return stageObj.slug;
  }
  return '';
};