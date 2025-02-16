"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faMagnifyingGlass,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { toastSuccess } from "@/helpers/toast";
import { getUsers } from "@/actions/business";
import { BUSINESS_USER } from "@/types/business";
import MultiSelect from "@/components/FormElements/ReactSelectMultiSelect";
import Select from "@/components/FormElements/ReactSelect";
import Users from "@/components/Business/Users";

const BusinessUsers = ({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) => {
  const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  const [users, setUsers] = useState<BUSINESS_USER[]>([]);
  const [businessId, setBusinessId] = useState<string>("");

  useEffect(() => {
    async function getData() {
      const bId = (await params).businessId;
      setBusinessId(bId);
      const { data } = await getUsers(bId);
      setUsers(data);
    }
    getData();
  }, []);

  const handleDelete = (userId: string | undefined) => {
    setShowDeletePrompt(true);
    if (userId) {
      setSelected(userId);
    }
  };

  const onConfirmDelete = () => {
    if (selected) {
      onDeleteCancel();
      toastSuccess(`User is deleted successfully`);
    }
  };

  const onDeleteCancel = () => {
    setShowDeletePrompt(false);
    setSelected("");
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string,
  ) => {
    toastSuccess(`User status update successfully`);
    console.log(e.target.value ? e.target.value.toUpperCase() : "OFF", userId);
  };

  return (
    <DefaultLayout>
      <div className="mb-4 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="flex justify-between pb-5">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
              type="text"
              className="min-w-75 rounded-md border border-stroke px-5 py-2 pl-12 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
              placeholder="Search..."
              value=""
            />
          </div>
          <div className="flex items-center font-medium">
            <Select />

            <MultiSelect />
            <button
              onClick={() => handleDelete("33")}
              className="ml-2 rounded bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
            >
              <FontAwesomeIcon icon={faFilter} />
            </button>
            <Link
              href={`/business/${businessId}/user/add`}
              className="ml-2 rounded bg-secondary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
            >
              <FontAwesomeIcon icon={faCirclePlus} />
            </Link>
          </div>
        </div>
      </div>
      <Users
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        users={users}
        businessId={businessId}
      />
      <div className="mt-4 rounded-sm border border-stroke bg-white px-5 py-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 sm:py-6 xl:pb-1">
        <div className="flex justify-between pb-4">
          <Pagination />
          <div className="ml-auto flex items-center font-medium">
            <select className="w-20 bg-transparent pl-2">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <p className="pl-2 text-black dark:text-white">Entries Per Page</p>
          </div>
        </div>
      </div>
      <Modal modalIsOpen={showDeletePrompt}>
        <span className="mx-auto inline-block">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.1"
              width="60"
              height="60"
              rx="30"
              fill="#DC2626"
            ></rect>
            <path
              d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
              stroke="#DC2626"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <h3 className="mt-5.5 pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
          Are you sure?
        </h3>
        <p className="mb-10">
          Would you like to delete the subscriber? Once deleted the data cannot
          be recovered.
        </p>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onDeleteCancel}
              className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              Cancel
            </button>
          </div>
          <div className="w-full px-3 2xsm:w-1/2">
            <button
              onClick={onConfirmDelete}
              className="block w-full rounded border border-meta-1 bg-meta-1 p-3 text-center font-medium text-white transition hover:bg-opacity-90"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default BusinessUsers;
