"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "../ProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateMe } from "@/lib/api/clientApi";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import toast from "react-hot-toast";

const EditProfile = () => {
  const router = useRouter();
  const fieldId = useId();
  const user = useAuthStore((state) => state.user);

  interface OrderFormValues {
    username: string;
  }

  const initialValues: OrderFormValues = {
    username: user?.username || "",
  };

  const handleSubmit = async (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>,
  ) => {
    try {
      if (!user) {
        toast.error("User not found");
        return;
      }
      await updateMe({
        email: user.email,
        username: values.username,
      });
      toast.success("Profile updated successfully!");
      actions.resetForm();
      router.push("/profile");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const Schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "It`s too little")
      .max(50, "It`s too big"),
  });

  const handleClose = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user?.avatar || "/NoImage.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Schema}
        >
          <Form className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor={`${fieldId}-username`}>Username:</label>
              <Field
                name="username"
                id={`${fieldId}-username`}
                type="text"
                className={css.input}
              />
              <ErrorMessage name="username" component="span" />
            </div>

            <p>Email: {user?.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default EditProfile;
