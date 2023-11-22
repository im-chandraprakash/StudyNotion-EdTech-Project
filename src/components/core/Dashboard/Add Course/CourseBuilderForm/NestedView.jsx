import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { IoMdArrowDropdown, IoMdAdd } from "react-icons/io";
import { useState } from "react";
import ConfirmationModel from "../../../../common/ConfirmationModel";
import {
    deleteSectionAPI,
    deleteSubSectionAPI,
} from "../../../../../services/operations/courseDetailAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import SubSectionModal from "./SubSectionModal";

function NestedView({ handleChangeEditSectionName }) {
    const [addSubSectionModal, setAddSubSectionModal] = useState();
    const [editSubSectionModal, setEditSubSectionModal] = useState();
    const [viewSubSectionModal, setViewSubSectionModal] = useState();

    const { course } = useSelector((state) => state.course);
    const [confirmationModel, setConfirmationModal] = useState(null);
    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    // console.log("section course ", course);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSectionAPI(token, {
            courseId: course?._id,
            sectionId: sectionId,
        });

        if (result) {
            dispatch(setCourse(result));
            setConfirmationModal(null);
        }
    };
    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSectionAPI(token, {
            subSectionId,
            sectionId: sectionId,
        });

        if (result) {
            const updatedData = course?.courseContent.map((section) =>
                section._id === result._id ? result : section
            );

            const updatedCourseDetail = {
                ...course,
                courseContent: updatedData,
            };

            dispatch(setCourse(updatedCourseDetail));
            console.log("result", result);
            setConfirmationModal(null);
        }
    };
    const handleEditSubSection = (data) => {
        setEditSubSectionModal(data);
    };

    return (
        <div className="w-full">
            {course?.courseContent?.length > 0 && (
                <div className="bg-richblack-700 text-richblack-100 p-6 mt-8  rounded-lg">
                    <div className="flex flex-col gap-2">
                        {course?.courseContent?.map((section, index) => {
                            return (
                                <details
                                    key={index}
                                    className="cursor-pointer"
                                    open
                                >
                                    <summary className="flex justify-between text-[22px] border-b-[2px] border-richblack-500 p-1">
                                        <div className=" w-full flex items-center gap-3">
                                            <RxDropdownMenu size={25} />
                                            <p className="text-richblack-50 text-[16px] font-bold ">
                                                {section?.sectionName}
                                            </p>
                                        </div>

                                        <div className="text-ricblack-500 flex gap-2 items-center ">
                                            <button
                                                onClick={() => {
                                                    handleChangeEditSectionName(
                                                        section._id,
                                                        section.sectionName
                                                    );
                                                }}
                                            >
                                                <MdEdit />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Delete this Section?",
                                                        text2: "All the lectures in this section will be deleted",
                                                        btn1Handler: () => {
                                                            handleDeleteSection(
                                                                section._id
                                                            );
                                                        },
                                                        btn2Handler: () => {
                                                            setConfirmationModal(
                                                                null
                                                            );
                                                        },
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                    });
                                                }}
                                            >
                                                <RiDeleteBinLine />
                                            </button>

                                            <span>|</span>

                                            <IoMdArrowDropdown
                                                className={`text-xl text-richblack-300`}
                                            />
                                        </div>
                                    </summary>

                                    <div className="flex justify-center items-center flex-col">
                                        {section?.subSection?.map(
                                            (data, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="w-[88%] flex justify-between text-[22px] border-b-[2px] border-richblack-500 p-3 pb-4 font-bold "
                                                        onClick={(event) =>
                                                            setViewSubSectionModal(
                                                                data
                                                            )
                                                        }
                                                    >
                                                        <div className=" w-full flex items-center gap-3">
                                                            <RxDropdownMenu
                                                                size={25}
                                                            />
                                                            <p className=" text-richblack-50 text-[17px] font-bold">
                                                                {data?.title}
                                                            </p>
                                                        </div>

                                                        <div className="text-ricblack-500 flex gap-2 items-center ">
                                                            <button
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    event.stopPropagation();
                                                                    handleEditSubSection(
                                                                        {
                                                                            ...data,
                                                                            sectionId:
                                                                                section._id,
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <MdEdit />
                                                            </button>

                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    setConfirmationModal(
                                                                        {
                                                                            text1: "Delete this SubSection?",
                                                                            text2: "selected Subsection will get Deleted",
                                                                            btn1Handler:
                                                                                () => {
                                                                                    handleDeleteSubSection(
                                                                                        data?._id,
                                                                                        section._id
                                                                                    );
                                                                                },
                                                                            btn2Handler:
                                                                                () => {
                                                                                    setConfirmationModal(
                                                                                        null
                                                                                    );
                                                                                },
                                                                            btn1Text:
                                                                                "Delete",
                                                                            btn2Text:
                                                                                "Cancel",
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            className="flex items-center gap-1 text-yellow-50 text-[15px] m-2 ml-5"
                                            onClick={() => {
                                                setAddSubSectionModal(section);
                                            }}
                                        >
                                            <div>
                                                <IoMdAdd className="text-[23px] font-extrabold" />
                                            </div>
                                            <span>Add Lecture</span>
                                        </button>
                                    </div>
                                </details>
                            );
                        })}
                    </div>

                    {confirmationModel && (
                        <ConfirmationModel modalData={confirmationModel} />
                    )}
                </div>
            )}

            {addSubSectionModal && (
                <SubSectionModal
                    modalData={addSubSectionModal}
                    setModalData={setAddSubSectionModal}
                    add={"true"}
                />
            )}

            {editSubSectionModal && (
                <SubSectionModal
                    modalData={editSubSectionModal}
                    setModalData={setEditSubSectionModal}
                    edit={"true"}
                />
            )}

            {viewSubSectionModal && (
                <SubSectionModal
                    modalData={viewSubSectionModal}
                    setModalData={setViewSubSectionModal}
                    view={"true"}
                />
            )}
        </div>
    );
}

export default NestedView;
