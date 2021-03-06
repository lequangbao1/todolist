import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../actions";
// icons
import { MdCancel } from "react-icons/md";
import { BiWindows, BiErrorCircle } from "react-icons/bi";

const TaskForm = () => {
  const [error, setError] = useState("");

  const { isDisplayForm, taskEditing, isDarkMode } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const getValue = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    if (name === "priority") {
      value = parseInt(value, 10);
    }

    dispatch(actions.editTask({ ...taskEditing, [name]: value }));
  };

  const clearForm = () =>
    dispatch(
      actions.editTask({
        ...taskEditing,
        name: "",
        priority: 1,
        status: false,
      })
    );

  const onToggleForm = () => dispatch(actions.toggleForm());
  const onCloseForm = () => dispatch(actions.closeForm());
  const onCompletelyCloseForm = () => {
    dispatch(
      actions.editTask({
        id: "",
        name: "",
        priority: 1,
        status: false,
      })
    );
    onCloseForm();
  };
  const onSaveTask = () => {
    if (!taskEditing.name) {
      setError("Please fill in the task");
      setTimeout(() => setError(""), 5000);
      return;
    }
    dispatch(actions.saveTask({ ...taskEditing }));
    clearForm();
  };

  return (
    <div
      className={`flex flex-col w-full h-full mb-10 md:w-2/5 md:order-2 shadow-lg  ${
        isDisplayForm ? "border border-black-100" : "max-h-4"
      }  `}
    >
      <div
        className={`flex items-center justify-between py-2 px-4 ${
          isDarkMode ? "bg-gray-800" : "bg-black-100"
        }`}
      >
        <h1 className="font-semibold text-white flex items-center">
          <BiWindows
            className="mr-2 cursor-pointer text-white text-xl hover:text-green-500 transition-all"
            onClick={onToggleForm}
          />
          <span>{`${taskEditing.id === "" ? "New Task" : "Edit Task"}`}</span>
        </h1>
        <button
          className="flex items-center justify-center text-white hover:text-red-600 transition-all"
          onClick={onCompletelyCloseForm}
        >
          <MdCancel className="text-2xl" />
        </button>
      </div>

      {isDisplayForm ? (
        <>
          <label
            className={`block px-4 py-2 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : ""
            } `}
          >
            <span className="font-semibold">Task :</span>
            <input
              type="text"
              className={`mt-1 form-input block w-full text-xs font-medium border-black-100 focus:border-black-100 focus:shadow-none focus:ring-0 ${
                isDarkMode ? "bg-gray-600 text-gray-200" : ""
              }`}
              placeholder="Task content"
              value={taskEditing.name}
              name="name"
              onChange={getValue}
            />
          </label>
          <label
            className={`flex items-center px-4 py-2 ${
              isDarkMode ? "bg-gray-800 text-gray-200" : ""
            }`}
          >
            <span className="w-full font-semibold">Level Priority :</span>
            <select
              className={`mt-1 form-select w-full focus:ring-transparent text-xs text-black-100 border-black-100 focus:border-black-100 focus:shadow-none focus:ring-0 font-medium ${
                isDarkMode ? "bg-gray-600 text-gray-200" : ""
              }`}
              value={taskEditing.priority}
              name="priority"
              onChange={getValue}
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </label>
          {error && (
            <div className="flex items-center justify-center text-red-600 text-xs font-medium">
              <BiErrorCircle className="mr-2" />
              <span className="">{error}</span>
            </div>
          )}
          <div
            className={`mt-auto flex items-center justify-center py-4  ${
              isDarkMode ? "bg-gray-800 text-gray-200" : ""
            } `}
          >
            <button
              className={`py-2 rounded max-w-max px-6  ${
                isDarkMode ? "bg-green-700" : "bg-green-500"
              } uppercase text-sm font-semibold mr-4 active:opacity-50 transition-all`}
              onClick={onSaveTask}
            >
              {`${taskEditing.id === "" ? "Create" : "Edit"}`}
            </button>
            <button
              className={`py-2 rounded max-w-max px-6 ${
                isDarkMode ? "bg-red-700" : "bg-red-500"
              } uppercase text-sm font-semibold active:opacity-50 transition-all`}
              onClick={clearForm}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TaskForm;
