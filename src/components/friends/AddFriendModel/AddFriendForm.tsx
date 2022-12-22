import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Formik } from "formik";

import { trpc } from "../../../utils/trpc";
import Input from "../../shared/Input";
import DateInput from "../../shared/DateInput";

interface values {
  name?: string;
  phoneNumber?: string;
  email?: string;
  lastContacted?: number;
}

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const AddFriendForm = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const utils = trpc.useContext();
  const mutation = trpc.friends.addFriend.useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess(_input) {
      utils.friends.getAll.invalidate();
      setShowModal(false);
    },
  });

  const validateValues = ({ name, phoneNumber, email }: values) => {
    const errors: values = {};

    if (!name) {
      errors.name = "Required";
    }

    if (email && !emailRegex.test(email)) {
      errors.email = "Invalid email address";
    }

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = "Invalid phone number";
    }

    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          phoneNumber: "",
          email: "",
          lastContacted: Date.now(),
        }}
        validate={validateValues}
        onSubmit={async (
          { name, email, phoneNumber, lastContacted },
          { setSubmitting }
        ) => {
          // TODO:
          setSubmitting(true);

          console.log(lastContacted);
          console.log(new Date(lastContacted));

          await mutation.mutate({
            name: name,
            email: email === "" ? undefined : email,
            phoneNumber: phoneNumber === "" ? undefined : phoneNumber,
            lastContacted: lastContacted ? new Date(lastContacted) : undefined,
          });

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Input
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder={"John Smith"}
              label={"Full Name"}
              errors={errors.name}
              touched={touched.name}
            />

            <Input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder={"john@smith.com"}
              label={"Email"}
              errors={errors.email}
              touched={touched.email}
            />

            <Input
              type="tel"
              name="phoneNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
              placeholder={"+447123123123"}
              label={"Phone Number"}
              errors={errors.phoneNumber}
              touched={touched.phoneNumber}
            />

            <DateInput
              name="lastContacted"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastContacted}
              label={"Last Contacted"}
              errors={errors.lastContacted}
              touched={touched.lastContacted}
            />

            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="mr-1 mb-1 rounded bg-orange-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-orange-600"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddFriendForm;
