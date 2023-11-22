import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function RequirementField({
    name,
    lable,
    register,
    errors,
    getValue,
    setValue,
    placeholder,
    editCourse,
}) {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const { course } = useSelector((state) => state.course);

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList?.splice(index, 1);
        setRequirementList(updatedRequirementList);
    };

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.instructions);
        }
        register(name, {
            required: true,
            validata: (value) => value.length > 0,
        });
    }, []);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList]);

    return (
        <div>
            <div>
                <label htmlFor={name} className="lable-style">
                    <p>
                        {lable}{" "}
                        <sup className="text-pink-100 text-[12px]">*</sup>
                    </p>
                </label>
                <input
                    id={name}
                    type="text"
                    placeholder={placeholder}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style"
                />
            </div>
            <button
                type="button"
                onClick={() => {
                    setRequirementList([...requirementList, requirement]);
                    setRequirement("");
                }}
                className="text-yellow-50 font-semibold text-[17px] mt-2"
            >
                Add
            </button>
            <ul className="mt-3">
                {requirementList?.length > 0 &&
                    requirementList?.map((item, index) => {
                        return (
                            <li
                                className="flex gap-2 text-richblack-300 items-center"
                                key={index}
                            >
                                <span className="text-white">{item}</span>
                                <button
                                    className="text-richblack-300"
                                    type="button"
                                    onClick={() =>
                                        handleRemoveRequirement(index)
                                    }
                                >
                                    clear
                                </button>
                            </li>
                        );
                    })}
            </ul>
            <div className="-mt-4">
                {errors[name] && (
                    <span className="text-pink-200 text-[13px] ml-2">
                        {lable} is required
                    </span>
                )}
            </div>
        </div>
    );
}

export default RequirementField;
