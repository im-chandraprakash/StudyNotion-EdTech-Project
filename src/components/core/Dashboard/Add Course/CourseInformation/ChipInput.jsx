import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

function ChipInput({
    name,
    lable,
    register,
    setValue,
    getValue,
    errors,
    placeholder,
}) {
    const { editCourse, course } = useSelector((state) => state.course);
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if (editCourse) {
            setChips(course?.tag);
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0,
        });
    }, []);

    useEffect(() => {
        setValue(name, chips);
    }, [chips]);

    const handleAddChipInput = (event) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();

            const chipValue = event.target.value.trim();

            if (chipValue && !chips.includes(chipValue)) {
                const newChipInputList = [...chips, chipValue];
                setChips(newChipInputList);
                event.target.value = "";
            }
        }
    };

    const handleDeleteInputTag = (chipIndex) => {
        const chipList = chips.filter((_, index) => index !== chipIndex);
        setChips(chipList);
    };

    return (
        <div>
            <label htmlFor={name} className="lable-style">
                {lable} <sup className="text-pink-100 text-[12px]">*</sup>
            </label>
            <div className="flex gap-2 items-center mb-2">
                {chips?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="px-2 py-1 rounded-xl bg-yellow-300 text-white flex gap-2 items-center text-sm justify-center"
                        >
                            <span>{item}</span>
                            <RxCross1
                                onClick={() => handleDeleteInputTag(index)}
                            />
                        </div>
                    );
                })}
            </div>
            <input
                id={name}
                type="text"
                name={name}
                placeholder={placeholder}
                className="form-style"
                onKeyDown={(event) => handleAddChipInput(event)}
            />

            <div className="mt-1">
                {errors[name] && (
                    <span className="text-pink-200 text-[13px] mt-10 ml-2">
                        {lable} is Required
                    </span>
                )}
            </div>
        </div>
    );
}

export default ChipInput;
