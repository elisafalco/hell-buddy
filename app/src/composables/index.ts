import { LS_ID, LS_USERNAME, LS_COLOR, LS_PROGRAM, LS_BUDDYS } from '../constants';
import { BuddyType } from '../types';

/**
 * getId
 * @returns {string | null}
 */
export const getId = (): string | null => {
  return window.localStorage.getItem(LS_ID) || '';
}

/**
 * setId
 */
export const setId = () => {
  if (!getId()) {
    window.localStorage.setItem(LS_ID, String(Date.now()));
  }
}

/**
 * setUsername
 * @param {string} username 
 */
export const setUsername = (username: string) => {
  if (username) {
    window.localStorage.setItem(LS_USERNAME, username);
  }
}

/**
 * getUsername
 * @returns {string | null}
 */
export const getUsername = (): string | null => {
  return window.localStorage.getItem(LS_USERNAME);
}

/**
 * setColor
 * @param {string} color 
 */
export const setColor = (color: string) => {
  if (color) {
    window.localStorage.setItem(LS_COLOR, color);
  }
}

/**
 * getColor
 * @returns {string | null}
 */
export const getColor = (): string | null => {
  return window.localStorage.getItem(LS_COLOR);
}

/**
 * setProgram
 * @param {string[]} program 
 */
export const setProgram = (program: string[]) => {
  window.localStorage.setItem(LS_PROGRAM, JSON.stringify(program));
}

/**
 * getProgram
 * @returns {string[] | null}
 */
export const getProgram = (): string[] | null => {
  return JSON.parse(window.localStorage.getItem(LS_PROGRAM) || '[]');
}

/**
 * addBuddy
 * @param {string} newBuddy 
 */
export const addBuddy = (newBuddy: string) => {
  const newBuddyNormalize: BuddyType = JSON.parse(newBuddy);
  newBuddyNormalize.scanTS = Date.now();
  
  const buddys = getBuddys();
  // If buddy id is already in storage, remove it before adding it
  const existingBuddyIndex = buddys.findIndex(buddyItem => buddyItem.id === newBuddyNormalize.id);
  if (existingBuddyIndex >= 0) {
    buddys.splice(existingBuddyIndex, 1);
  }

  buddys.push(newBuddyNormalize);
  window.localStorage.setItem(LS_BUDDYS, JSON.stringify(buddys));
}

/**
 * deleteBuddy
 * @param {string} id 
 * @returns {BuddyType[]}
 */
export const deleteBuddy = (id: string): BuddyType[] => {

  const buddys = getBuddys();
  // If buddy id is already in storage, remove it before adding it
  const existingBuddyIndex = buddys.findIndex(buddyItem => buddyItem.id === id);
  if (existingBuddyIndex >= 0) {
    buddys.splice(existingBuddyIndex, 1);
  }

  window.localStorage.setItem(LS_BUDDYS, JSON.stringify(buddys));

  return buddys;
}

/**
 * getBuddys
 * @returns {BuddyType[]}
 */
export const getBuddys = (): BuddyType[] => {
  return JSON.parse(window.localStorage.getItem(LS_BUDDYS) || '[]');
}