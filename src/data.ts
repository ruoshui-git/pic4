import { writable } from "svelte/store";
/**
 * To be replaced by a server call
 */
export function getLocations() {
    if (locations) {
        return locations;
    } else {
        // get data from server
        locations = [
            'US',
            'CA',
            'CN',
        ];
        return locations;
    }
}

// cache for getLocations
let locations: undefined | string[] = undefined;

export interface Person {
    id: number;
    name: string;
    name_pinyin: string;
    initials: string;
    location: string;
}

// export enum Location {
//     US = 'United States',
//     CN = 'China',
//     CA = 'Canada',
// }

let personCounter = 0;

export function makePerson (name: string, name_pinyin: string, initials: string, location: string): Person {
    return {id: personCounter++, name, name_pinyin, initials, location };
}





export const people = writable([
    makePerson('毛若水', 'maoruoshui', 'mrs', 'US'),
    makePerson('龚宏良', 'gonghongliang', 'ghl', 'US'),
    makePerson('雷义川', 'leiyichuan', 'lyc', 'CA'),
    makePerson('李侠', 'lixia', 'lx', 'CN'),
]);

