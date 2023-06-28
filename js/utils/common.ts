/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */

import { format } from "date-fns";
export const loader = fn => {
    if (document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};
export const wait = (delay = 0) => new Promise(resolve => setTimeout(resolve, delay));

export const removeSkeleton = el => {
    // eslint-disable-next-line promise/param-names
    new Promise(res => {
        res(el.getAttribute("data-skeleton"));
    }).then((value: any) => {
        if (document.getElementById(value)) {
            document.getElementById(value).remove();
        }
    });
};

export const getBgColorByString = item => {
    if (item.color === "green") {
        return "bg-green-500";
    } else if (item.color === "orange") {
        return "bg-orange-500";
    } else if (item.color === "red") {
        return "bg-red-500";
    }
};

export function debounce(func, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, delay);
    };
}

export const groupParamsByKey = params =>
    [...params.entries()].reduce((acc, tuple) => {
        const [key, val] = tuple;
        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            if (Array.isArray(acc[key])) {
                acc[key] = [...acc[key], val];
            } else {
                acc[key] = [acc[key], val];
            }
        } else {
            acc[key] = val;
        }

        return acc;
    }, {});

export const generateRandomNumberInRange = (min = 0, max = 100) => {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
};

export const isObject = variable => {
    if (typeof variable === "object" && !Array.isArray(variable) && variable !== null) {
        return true;
    } else {
        return false;
    }
};
export const isObjectEmpty = obj => {
    return Object.keys(obj).length === 0;
};
export const getWordingByCount = (count: number, wording: Array<string>) => {
    return count === 1
        ? " " + wording[0]
        : count > 1 && count < 5
            ? " " + wording[1]
            : count >= 5
                ? " " + wording[2]
                : "";
};
export const omit = (obj: Record<string, any>, keysToOmit: string[]) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (!keysToOmit.includes(key)) {
            acc[key] = value;
        }
        return acc;
    }, {});
}

export const formatDate = (date: string, dateFormat: string) => {
    return format(new Date(date), dateFormat);
};
