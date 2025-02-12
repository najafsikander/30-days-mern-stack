import SectionCard from "../../components/SectionCard";
import { useUser } from "../../hooks/useUser";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { useSingleUser } from "../../tanstack-queries/users";
import FormField from "../../components/FormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, editProfileSchema } from "../../utils/types";
import { LockClosedIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { updateSingleUser } from "../../services-url/users";

const ProfilePage: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isReadOnly, setIsReadyOnly] = useState<boolean>(true);
  const { status, data, error, isFetching,refetch } = useSingleUser(
    user ? user.id : ""
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: data || undefined,
  });

  const handleLogout = ():void => {
    logout();
    navigate("/auth/login");
  };

  const toggleReadyOnlyMode = ():void => {
    setIsReadyOnly((value) => !value);
  };
  
  const goToChangePassPage = ():void => {
    navigate('/profile/changePass');
  }

  const editUser = async (data: FormData):Promise<void> => {
    try {
        const request = {
            user: data
        };
        const response = await fetch(updateSingleUser(user!.id), {
            method: "PUT",
            headers: {
                'Authorization':'Bearer '+user?.token,
                'content-type': 'application/json'
            },
            body:JSON.stringify(request)
        });

        console.log('Response: ' + response);
        const result = await response.json();
        if (!response.ok) throw result.error;
        console.log('result: ' + result);
        alert('Data updated successfully');
        refetch();
    } catch (err) {
        console.warn('Error caught while editing user: ', err);
        alert(err);
    }
  };
  useEffect(() => {
    console.log("Data is changing: ", data);
    if (data) {
      console.log("Resetting form with data:", data);
      reset(data); // This updates form fields when data is fetched
    }
  }, [data, reset]);

  //Validation renders
  if (!user) return <h1 className="text-white">User is not logged in</h1>;
  if (isFetching && status === "pending")
    return <h1 className="text-white">Loading profile</h1>;
  if (error)
    return (
      <h1 className="text-white">
        Error occured while fetching profile details
      </h1>
    );
  if (!data) return <h1 className="text-white">No data</h1>;

  return (
    <>
      <SectionCard header="Profile">
        <section className="w-full flex flex-row-reverse">
          <button
            title="Change Password"
            type="button"
            onClick={goToChangePassPage}
            className="bg-white border-2 mr-4 border-slate-700 rounded-[60px] p-1 shadow-2xl cursor-pointer hover:bg-slate-700"
          >
            <LockClosedIcon
              title="Change Password"
              className="size-7 text-slate-700 hover:text-white"
            />
          </button>
          <button
            title="Edit Profile"
            type="button"
            onClick={toggleReadyOnlyMode}
            className="bg-white border-2 mr-2 border-slate-700 rounded-[60px] p-1 shadow-2xl cursor-pointer hover:bg-slate-700"
          >
            <PencilSquareIcon
              title="Edit Profile"
              className="size-7 text-slate-700 hover:text-white"
            />
          </button>
        </section>
        <div className="w-full flex flex-row justify-center">
          <div className="flex flex-col">
            <div className="w-full flex justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                alt="profile picture"
                className="w-28 border-2 border-slate-800 rounded-[80px] m-2 shadow-lg"
              />
            </div>
            <form
              onSubmit={handleSubmit((formData) => {
                console.log("Submitting form:", formData);
                editUser(formData);
              })}
            >
              <FormField
                type="text"
                placeholder="First Name"
                name="firstName"
                readonly={isReadOnly}
                register={register}
                error={errors.firstName}
              />
              <FormField
                type="text"
                placeholder="Last Name"
                name="lastName"
                readonly={isReadOnly}
                register={register}
                error={errors.lastName}
              />
              <FormField
                type="email"
                placeholder="Email"
                name="email"
                readonly={isReadOnly}
                register={register}
                error={errors.email}
              />
              {!isReadOnly && <Button type="button" label="Submit" />}
            </form>

            <br />
            {user && <Button label="Logout" onClick={handleLogout} />}
          </div>
        </div>
      </SectionCard>
    </>
  );
};

export default ProfilePage;
