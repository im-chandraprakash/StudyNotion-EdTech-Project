import React from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useState } from "react";

Chart.register(...registerables);

function InstructorChart({ courses }) {
    const [currChart, setCurrChart] = useState("students");
    const generateRandomColors = (number) => {
        let colors = [];

        for (let i = 0; i < number; i++) {
            let color = `rgb(${Math.floor(Math.random() * 256)} , ${Math.floor(
                Math.random() * 256
            )} , ${Math.floor(Math.random() * 256)})`;

            colors.push(color);
        }

        return colors;
    };

    // create student data for chart displaying

    const chartDataForStudents = {
        labels: courses?.map((course) => course.courseName),
        datasets: [
            {
                data: courses?.map((course) => course.totalStudentsEnrolled),
                backgroundColor: generateRandomColors(courses?.length),
            },
        ],
    };
    //create income data for chart displaying

    const chartDataForIncome = {
        labels: courses?.map((course) => course.courseName),
        datasets: [
            {
                data: courses?.map((course) => course.totalAmountGenerated),
                backgroundColor: generateRandomColors(courses?.length),
            },
        ],
    };

    const options = {};
    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Visualize</p>
            <div className="space-x-4 font-semibold">
                {/* Button to switch to the "students" chart */}
                <button
                    onClick={() => setCurrChart("students")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                        currChart === "students"
                            ? "bg-richblack-700 text-yellow-50"
                            : "text-yellow-400"
                    }`}
                >
                    Students
                </button>
                {/* Button to switch to the "income" chart */}
                <button
                    onClick={() => setCurrChart("income")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                        currChart === "income"
                            ? "bg-richblack-700 text-yellow-50"
                            : "text-yellow-400"
                    }`}
                >
                    Income
                </button>
            </div>
            <div className="relative mx-auto aspect-square h-full w-full">
                {/* Render the Pie chart based on the selected chart */}
                <Pie
                    data={
                        currChart === "students"
                            ? chartDataForStudents
                            : chartDataForIncome
                    }
                    options={options}
                />
            </div>
        </div>
    );
}

export default InstructorChart;
