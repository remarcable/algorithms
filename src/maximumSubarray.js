export function completeSearchV1(arr) {
    // O(n^3)
    if (arr.length === 0) {
        return 0;
    }

    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        // O(n^3)
        for (let j = i; j < arr.length; j++) {
            // O(n^2)
            let sum = 0;
            for (let k = i; k <= j; k++) {
                // O(n)
                sum += arr[k];
            }

            if (sum > max) {
                max = sum;
            }
        }
    }

    return max;
}

export function completeSearchV2(arr) {
    // O(n^2)
    if (arr.length === 0) {
        return 0;
    }

    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        // O(n^2)
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            // O(n)
            sum += arr[j];

            if (sum > max) {
                max = sum;
            }
        }
    }

    return max;
}

function lmax(arr) {
    let result = 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        result = Math.max(sum, result);
    }


    return result;
}

function rmax(arr) {
    let result = 0;
    let sum = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        sum += arr[i];
        result = Math.max(sum, result);
    }


    return result;
}

export function divideAndConquer(arr) {
    if (arr.length === 0) {
        return 0;
    }

    if (arr.length === 1) {
        return Math.max(0, arr[0]);
    }

    const firstHalf = arr.slice(0, arr.length / 2);
    const secondHalf = arr.slice(arr.length / 2);


    return Math.max(
        divideAndConquer(firstHalf),
        divideAndConquer(secondHalf),
        rmax(firstHalf) + lmax(secondHalf),
    );
}

export function scanline(arr) {
    let maximumSum = 0;
    let currentMaxSum = 0;
    let lastSum = 0;
    for (let i = 0; i < arr.length; i++) {
        lastSum = currentMaxSum;
        currentMaxSum += arr[i];
        if (currentMaxSum < lastSum) {
            currentMaxSum = 0;
        }
        if (currentMaxSum > maximumSum) {
            maximumSum = currentMaxSum;
        }
    }

    return maximumSum;
}
