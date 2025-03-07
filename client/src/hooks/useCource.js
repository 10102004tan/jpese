"use strict";

// get all course
export const getAllCourse = async () => {
    const response = await fetch("/api/minna-no-nihongo/n4");
    const data = await response.json();
    return data;
}

