
import EditInfoProfileForm from "../../../../components/user/forms/EditInfoProfileForm";

export default async function EditarInfoPage() {

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white  lg:gap-8 ">
        <EditInfoProfileForm />
      </div>
    </div>
  )
}