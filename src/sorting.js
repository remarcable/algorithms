function swap(arr, i, j) {
    const currentI = arr[i];
    arr[i] = arr[j];
    arr[j] = currentI;

    return arr;
}

export function bubbleSort(arr) {
    const array = [...arr];
    for (let i = array.length; i > 1; i--) {
        for (let j = 0; j < i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
            }
        }
    }

    return array;
}

export function insertionSort(arr) {
    const array = [...arr];
    for (let i = 1; i < array.length; i++) {
        let toBeSorted = array[i];
        let j = i;
        while (j >= 1 && array[j - 1] > toBeSorted) {
            array[j] = array[j - 1];
            j = j - 1;
        }
        array[j] = toBeSorted;
    }

    return array;
}

export function mergeSort(arr) {
    if (arr.length === 1 || arr.length === 0) return arr;

    const mid = Math.floor(arr.length / 2);
    const firstHalf = arr.slice(0, mid);
    const secondHalf = arr.slice(mid);

    return merge(
        mergeSort(firstHalf),
        mergeSort(secondHalf),
    );
}

export function merge(a, b) {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < a.length || j < b.length) {
        if (a[i] < b[j] || (i < a.length && j >= b.length)) {
            result.push(a[i]);
            i++;
        } else {
            result.push(b[j]);
            j++;
        }
    }

    return result;
}

function randomNumberInRange(lower, upper) {
    upper = upper + 1;
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

export function quickSort(a) {
    if (a.length === 1 || a.length === 0) {
        return a;
    }

    const pivot = randomNumberInRange(0, a.length - 1);
    const smaller = [];
    const greater = [];
    for (let i = 0; i < a.length; i++) {
        if (i !== pivot) {
            if (a[i] > a[pivot]) {
                greater.push(a[i]);
            } else {
                smaller.push(a[i]);
            }
        }
    }

    return [
        ...quickSort(smaller),
        a[pivot],
        ...quickSort(greater),
    ];
}
